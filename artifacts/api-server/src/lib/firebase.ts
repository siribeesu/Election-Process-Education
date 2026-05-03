/**
 * Firebase initialization with in-memory fallback.
 * Uses GOOGLE_APPLICATION_CREDENTIALS if set, otherwise falls back to RAM storage.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

// ─── In-Memory Store ─────────────────────────────────────────────────────────

const _store: Record<string, Record<string, Record<string, unknown>>> = {};

function _getCol(p: string) {
  if (!_store[p]) _store[p] = {};
  return _store[p];
}

function _makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const FieldValue = {
  serverTimestamp: () => new Date().toISOString(),
};

class MemDocRef {
  constructor(private colPath: string, public id: string) {}
  async get(): Promise<MemDocSnap> {
    return new MemDocSnap(this.colPath, this.id, _getCol(this.colPath)[this.id]);
  }
  async delete(): Promise<void> {
    delete _getCol(this.colPath)[this.id];
  }
  collection(sub: string): MemColRef {
    return new MemColRef(`${this.colPath}/${this.id}/${sub}`);
  }
}

class MemDocSnap {
  exists: boolean;
  id: string;
  ref: MemDocRef;
  constructor(colPath: string, id: string, private _data?: Record<string, unknown>) {
    this.id = id;
    this.exists = _data !== undefined;
    this.ref = new MemDocRef(colPath, id);
  }
  data() { return this._data; }
}

class MemColRef {
  constructor(private colPath: string) {}
  orderBy(_f: string) { return this; }
  doc(id: string) { return new MemDocRef(this.colPath, id); }
  async get() {
    const col = _getCol(this.colPath);
    return {
      docs: Object.entries(col).map(([id, d]) =>
        new MemDocSnap(this.colPath, id, d as Record<string, unknown>),
      ),
    };
  }
  async add(data: Record<string, unknown>): Promise<MemDocRef> {
    const col = _getCol(this.colPath);
    const id = _makeId();
    col[id] = { ...data };
    return new MemDocRef(this.colPath, id);
  }
}

class MemFirestore {
  collection(col: string) { return new MemColRef(col); }
}

// ─── Initialise ──────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any = null;

const _ready: Promise<void> = (async () => {
  let credsPath = process.env["GOOGLE_APPLICATION_CREDENTIALS"];

  // Resolve relative paths from the current working directory
  if (credsPath && !path.isAbsolute(credsPath)) {
    credsPath = path.resolve(process.cwd(), credsPath);
    process.env["GOOGLE_APPLICATION_CREDENTIALS"] = credsPath;
  }

  try {
    const { initializeApp, getApps } = await import("firebase-admin/app");
    const { getFirestore } = await import("firebase-admin/firestore");
    const { applicationDefault } = await import("firebase-admin/app");

    if (!getApps().length) {
      // In GCP environment (Cloud Run), applicationDefault() works without GOOGLE_APPLICATION_CREDENTIALS
      initializeApp({ credential: applicationDefault() });
    }
    _db = getFirestore();
    console.info("[firebase] Connected to Firebase Firestore ✓");
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[firebase] Failed to connect — using in-memory storage.\n  Reason:", msg);
    _db = new MemFirestore();
  }
})();

export async function getDb() {
  await _ready;
  return _db;
}
