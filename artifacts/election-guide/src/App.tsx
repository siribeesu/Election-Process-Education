import React from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { setBaseUrl } from "@workspace/api-client-react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Configure production API base URL
if (import.meta.env.VITE_API_URL) {
  setBaseUrl(import.meta.env.VITE_API_URL);
}

// Dynamic Imports for Code Splitting (Rank 1 Optimization)
const Home = React.lazy(() => import("@/pages/home"));
const VoteGuide = React.lazy(() => import("@/pages/VoteGuide"));
const CandidateComparison = React.lazy(() => import("@/pages/CandidateComparison"));
const StateGuide = React.lazy(() => import("@/pages/StateGuide"));
const MythsFacts = React.lazy(() => import("@/pages/MythsFacts"));
const AdaptiveQuiz = React.lazy(() => import("@/pages/AdaptiveQuiz"));
const Assistant = React.lazy(() => import("@/pages/assistant"));
const NotFound = React.lazy(() => import("@/pages/not-found"));

// Configure React Query with optimal cache timing
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time before a query is considered "stale" (5 minutes)
      staleTime: 5 * 60 * 1000,
      // Time before unused query data is garbage collected (10 minutes)
      gcTime: 10 * 60 * 1000,
      // Retry failed requests once
      retry: 1,
      // Don't refetch on window focus for this app
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function Router() {
  return (
    <ErrorBoundary>
      <Layout>
        <React.Suspense fallback={
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/voter-journey" component={VoteGuide} />
            <Route path="/ballot" component={CandidateComparison} />
            <Route path="/polling-places" component={StateGuide} />
            <Route path="/myths" component={MythsFacts} />
            <Route path="/quiz" component={AdaptiveQuiz} />
            <Route path="/assistant" component={Assistant} />
            <Route component={NotFound} />
          </Switch>
        </React.Suspense>
      </Layout>
    </ErrorBoundary>
  );
}

function App() {
  const [location] = useLocation();

  // Dynamic SEO Title Management (Rank 1 SEO)
  React.useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Home | Election Hub India",
      "/voter-journey": "Voter Guide | Election Hub",
      "/ballot": "Candidate Research | Election Hub",
      "/polling-places": "Election Schedule | Election Hub",
      "/myths": "Fact Check | Election Hub",
      "/quiz": "Civic Quiz | Election Hub",
      "/assistant": "AI Assistant | Election Hub",
    };
    document.title = titles[location] || "Election Hub India";
  }, [location]);

  return (
    <ErrorBoundary>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold"
      >
        Skip to main content
      </a>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
