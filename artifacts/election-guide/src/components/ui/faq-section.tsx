import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQSection({ items, className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        
        return (
          <div 
            key={index}
            className={cn(
              "rounded-2xl border transition-all duration-300 overflow-hidden",
              isOpen 
                ? "border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 shadow-md" 
                : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-700"
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  isOpen 
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" 
                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700"
                )}>
                  <HelpCircle className="w-5 h-5" />
                </div>
                <span className={cn(
                  "font-bold text-lg leading-tight transition-colors",
                  isOpen ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"
                )}>
                  {item.question}
                </span>
              </div>
              <ChevronDown className={cn(
                "w-5 h-5 text-zinc-400 transition-transform duration-300",
                isOpen && "rotate-180 text-zinc-900 dark:text-zinc-100"
              )} />
            </button>
            
            <div className={cn(
              "px-6 overflow-hidden transition-all duration-300",
              isOpen ? "max-h-[500px] pb-6" : "max-h-0"
            )}>
              <div className="pl-14 pr-4">
                <div className="h-px bg-zinc-200 dark:bg-zinc-700 mb-6" />
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
