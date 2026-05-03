import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the module COMPLETELY without importing it initially
vi.mock("@workspace/api-client-react", () => ({
  useGetVoterJourney: vi.fn(),
  getGetVoterJourneyQueryKey: vi.fn().mockReturnValue(['test-key']),
}));

import VoterJourney from "./voter-journey";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("VoterJourney Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    const { useGetVoterJourney } = await import("@workspace/api-client-react");
    (useGetVoterJourney as any).mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<VoterJourney />, { wrapper });
    
    // Check for animate-pulse class or skeleton-like divs
    const pulseDivs = screen.getAllByText("", { selector: ".animate-pulse" });
    expect(pulseDivs.length).toBeGreaterThan(0);
  });

  it("renders voter journey steps when data is loaded", async () => {
    const { useGetVoterJourney } = await import("@workspace/api-client-react");
    const mockSteps = {
      state: "MH",
      steps: [
        {
          id: 1,
          title: "Register to Vote",
          description: "Complete Form 6",
          status: "pending",
          deadline: null,
          link: null,
          linkText: null
        },
      ],
    };

    (useGetVoterJourney as any).mockReturnValue({
      isLoading: false,
      data: mockSteps,
    });

    render(<VoterJourney />, { wrapper });

    expect(screen.getByText("Register to Vote")).toBeInTheDocument();
    expect(screen.getByText("Complete Form 6")).toBeInTheDocument();
  });
});
