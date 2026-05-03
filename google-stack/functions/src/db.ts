import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

export const firestore = admin.firestore();

export const collections = {
  conversations: firestore.collection("conversations"),
};

export interface Conversation {
  id?: string;
  title: string;
  createdAt: admin.firestore.Timestamp;
}

export interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  createdAt: admin.firestore.Timestamp;
}
