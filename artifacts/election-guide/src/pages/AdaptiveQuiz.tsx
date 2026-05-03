import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/ui/page-header';
import { Brain, Play, Award, Zap, Timer, CheckCircle, ChevronRight, RefreshCcw, Trophy, Target } from 'lucide-react';

type Difficulty = 'Beginner' | 'Intermediate' | 'Expert';

interface Question {
  id: number;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questionBank: Question[] = [
  // Beginner
  {
    id: 1,
    difficulty: 'Beginner',
    question: "What is the minimum age to register as a voter in India?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"],
    correctAnswer: 1
  },
  {
    id: 2,
    difficulty: 'Beginner',
    question: "What does 'EPIC' stand for in the context of Voter ID?",
    options: ["Election Public Identification Card", "Electoral Photo Identity Card", "Every Person Identity Card", "Election Panel Information Code"],
    correctAnswer: 1
  },
  {
    id: 3,
    difficulty: 'Beginner',
    question: "Which form is used for fresh registration of a new voter?",
    options: ["Form 6", "Form 7", "Form 8", "Form 12"],
    correctAnswer: 0
  },
  {
    id: 4,
    difficulty: 'Beginner',
    question: "Who is the current head of the Election Commission of India?",
    options: ["President", "Chief Election Commissioner", "Prime Minister", "Chief Justice"],
    correctAnswer: 1
  },
  {
    id: 5,
    difficulty: 'Beginner',
    question: "What does NOTA stand for?",
    options: ["No One To Accept", "None Of The Above", "Next Option To Approve", "Neutral Opinion To Act"],
    correctAnswer: 1
  },
  // Intermediate
  {
    id: 6,
    difficulty: 'Intermediate',
    question: "Who appoints the Chief Election Commissioner of India?",
    options: ["Prime Minister", "Parliament", "President of India", "Chief Justice of India"],
    correctAnswer: 2
  },
  {
    id: 7,
    difficulty: 'Intermediate',
    question: "What is the tenure of the Chief Election Commissioner?",
    options: ["5 years", "6 years or until age of 65", "Life term", "3 years"],
    correctAnswer: 1
  },
  {
    id: 8,
    difficulty: 'Intermediate',
    question: "Which companies manufacture EVMs in India?",
    options: ["TATA & Reliance", "BEL & ECIL", "ISRO & DRDO", "BHEL & GAIL"],
    correctAnswer: 1
  },
  {
    id: 9,
    difficulty: 'Intermediate',
    question: "What is the security deposit for a General Category candidate in Lok Sabha elections?",
    options: ["₹10,000", "₹15,000", "₹25,000", "₹50,000"],
    correctAnswer: 2
  },
  {
    id: 10,
    difficulty: 'Intermediate',
    question: "When does the Model Code of Conduct come into effect?",
    options: ["On polling day", "1 week before polling", "Immediately after election schedule announcement", "When results are declared"],
    correctAnswer: 2
  },
  // Expert
  {
    id: 11,
    difficulty: 'Expert',
    question: "Which Article of the Indian Constitution grants powers to the Election Commission?",
    options: ["Article 320", "Article 324", "Article 356", "Article 370"],
    correctAnswer: 1
  },
  {
    id: 12,
    difficulty: 'Expert',
    question: "What is the chemical composition of the Indelible Ink used in Indian elections?",
    options: ["Copper Sulfate", "Silver Nitrate", "Sodium Chloride", "Potassium Permanganate"],
    correctAnswer: 1
  },
  {
    id: 13,
    difficulty: 'Expert',
    question: "Who was the first Chief Election Commissioner of Independent India?",
    options: ["T.N. Seshan", "Sukumar Sen", "K.V.K. Sundaram", "S.P. Sen Verma"],
    correctAnswer: 1
  },
  {
    id: 14,
    difficulty: 'Expert',
    question: "Which section of the RP Act 1951 prohibits election campaign 48 hours before polling ends?",
    options: ["Section 123", "Section 126", "Section 144", "Section 151"],
    correctAnswer: 1
  },
  {
    id: 15,
    difficulty: 'Expert',
    question: "In which year were EVMs first used in India on an experimental basis?",
    options: ["1982", "1990", "1998", "2004"],
    correctAnswer: 0
  }
];

/**
 * @component AdaptiveQuiz
 * @description An interactive, tiered assessment tool for civic proficiency.
 * Uses a difficulty-based question bank to challenge users according to their knowledge level.
 * 
 * Features:
 * - Three tiers of difficulty: Beginner, Intermediate, Expert
 * - Real-time progress tracking with accessible indicators
 * - Visual feedback for correct/incorrect answers
 * - High-impact, mobile-responsive result summary
 */
export default function AdaptiveQuiz() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const filteredQuestions = selectedDifficulty 
    ? questionBank.filter(q => q.difficulty === selectedDifficulty)
    : [];

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === filteredQuestions[currentQuestionIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setSelectedDifficulty(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
  };

  if (showResults) {
    return (
      <PageContainer>
        <div className="max-w-2xl mx-auto py-12 text-center space-y-8">
          <div className="inline-flex p-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 animate-bounce">
            <Trophy className="w-16 h-16" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">Quiz Completed!</h2>
            <p className="text-zinc-500 font-medium">Level: {selectedDifficulty}</p>
          </div>
          
          <div className="bg-zinc-100 dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-200 dark:border-zinc-800">
            <span className="text-6xl font-black text-zinc-900 dark:text-zinc-100">
              {score} / {filteredQuestions.length}
            </span>
            <p className="text-sm font-bold text-zinc-500 mt-4 uppercase tracking-widest">Your Final Score</p>
          </div>

          <button 
            onClick={resetQuiz}
            aria-label="Return to difficulty selection"
            className="px-12 py-5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
          >
            <RefreshCcw className="w-6 h-6" />
            Try Another Level
          </button>
        </div>
      </PageContainer>
    );
  }

  if (selectedDifficulty) {
    const q = filteredQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;

    return (
      <PageContainer>
        <div className="max-w-3xl mx-auto py-8 space-y-8">
          <div className="flex items-center justify-between">
            <button onClick={resetQuiz} className="text-zinc-500 font-bold flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-100">
              <ChevronRight className="w-5 h-5 rotate-180" />
              Exit Quiz
            </button>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full" aria-label={`Current Difficulty: ${selectedDifficulty}`}>
              <Target className="w-4 h-4 text-zinc-500" />
              <span className="text-sm font-bold">{selectedDifficulty}</span>
            </div>
          </div>

          <div 
            className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Quiz progress"
          >
            <div 
              className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-4" aria-live="assertive">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Question {currentQuestionIndex + 1} of {filteredQuestions.length}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                {q.question}
              </h2>
            </div>

            <div className="grid gap-3">
              {q.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === q.correctAnswer;
                const showCorrect = selectedOption !== null && isCorrect;
                const showWrong = isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleOptionSelect(idx)}
                    aria-label={`Option ${idx + 1}: ${option}`}
                    aria-pressed={isSelected}
                    className={`p-6 text-left rounded-2xl border-2 transition-all font-bold ${
                      isSelected ? 'scale-[1.02]' : 'hover:border-zinc-300 dark:hover:border-zinc-700'
                    } ${
                      showCorrect ? 'bg-green-50 border-green-500 text-green-900 dark:bg-green-900/20 dark:text-green-400' :
                      showWrong ? 'bg-red-50 border-red-500 text-red-900 dark:bg-red-900/20 dark:text-red-400' :
                      isSelected ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800' :
                      'border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <button 
                onClick={nextQuestion}
                className="w-full py-5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-black text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {currentQuestionIndex === filteredQuestions.length - 1 ? 'Finish' : 'Next Question'}
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto space-y-12 py-8">
        <PageHeader 
          title="Citizen Proficiency Quiz"
          description="Test your understanding of India's democratic machinery. Choose your level to begin."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {(['Beginner', 'Intermediate', 'Expert'] as Difficulty[]).map((diff, idx) => {
            const icons = [Zap, Target, Brain];
            const Icon = icons[idx];
            const colors = ['text-blue-500', 'text-amber-500', 'text-red-500'];
            const bgs = ['bg-blue-50 dark:bg-blue-900/10', 'bg-amber-50 dark:bg-amber-900/10', 'bg-red-50 dark:bg-red-900/10'];

            return (
              <div 
                key={diff}
                className="group p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${bgs[idx]} flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform`}>
                    <Icon className={`w-7 h-7 ${colors[idx]}`} />
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-2">{diff}</h3>
                  <p className="text-zinc-500 font-medium text-sm leading-relaxed mb-8">
                    {idx === 0 ? "Perfect for first-time voters and general awareness." :
                     idx === 1 ? "Deep dive into electoral processes and procedures." :
                     "For legal scholars and election policy experts."}
                  </p>
                </div>
                <button 
                  onClick={() => handleDifficultySelect(diff)}
                  aria-label={`Start ${diff} level quiz`}
                  className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl font-black hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all flex items-center justify-center gap-2"
                >
                  Start Quiz
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="p-10 rounded-[3rem] bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3">
            <h4 className="text-3xl font-black">Global Leaderboard</h4>
            <p className="opacity-70 font-medium">Compete with citizens nationwide and earn the 'Elite Voter' badge.</p>
          </div>
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-14 h-14 rounded-full border-4 border-zinc-900 dark:border-zinc-100 bg-zinc-800 dark:bg-zinc-200" />
            ))}
            <div className="w-14 h-14 rounded-full border-4 border-zinc-900 dark:border-zinc-100 bg-zinc-700 dark:bg-zinc-300 flex items-center justify-center text-xs font-black">+8k</div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
