import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AdaptiveQuiz from "./AdaptiveQuiz";

describe("AdaptiveQuiz Component", () => {
  it("renders the initial difficulty selection screen", () => {
    render(<AdaptiveQuiz />);
    expect(screen.getByText("Citizen Proficiency Quiz")).toBeInTheDocument();
    expect(screen.getByText("Beginner")).toBeInTheDocument();
  });

  it("starts the quiz when a difficulty is selected", () => {
    render(<AdaptiveQuiz />);
    const startButtons = screen.getAllByText("Start Quiz");
    fireEvent.click(startButtons[0]);
    
    expect(screen.getByText(/Question 1 of/i)).toBeInTheDocument();
  });

  it("handles correct answer selection", () => {
    render(<AdaptiveQuiz />);
    fireEvent.click(screen.getAllByText("Start Quiz")[0]);

    // Beginner Q1: "What is the minimum age to register as a voter in India?"
    const correctAnswer = screen.getByText("18 Years");
    fireEvent.click(correctAnswer);

    expect(screen.getByText("Next Question")).toBeInTheDocument();
  });

  it("allows resetting the quiz", () => {
    render(<AdaptiveQuiz />);
    fireEvent.click(screen.getAllByText("Start Quiz")[0]);
    
    const exitButton = screen.getByText("Exit Quiz");
    fireEvent.click(exitButton);

    expect(screen.getByText("Citizen Proficiency Quiz")).toBeInTheDocument();
  });
});
