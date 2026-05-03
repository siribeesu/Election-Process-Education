import { Navbar } from "./Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col outline-none">
        {children}
      </main>
      <footer className="border-t py-8 mt-auto bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>A nonpartisan digital civic guide.</p>
          <p className="mt-2">Not affiliated with any government agency. Information provided for educational purposes.</p>
        </div>
      </footer>
    </div>
  );
}
