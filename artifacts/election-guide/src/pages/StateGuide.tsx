import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/ui/page-header';
import { Link } from 'wouter';
import { ChevronRight, Info } from 'lucide-react';

const upcomingElections = [
  {
    state: "Haryana",
    date: "October 2024",
    status: "Upcoming",
    details: "Legislative Assembly Elections - 90 Constituencies"
  },
  {
    state: "Maharashtra",
    date: "October/November 2024",
    status: "Upcoming",
    details: "Legislative Assembly Elections - 288 Constituencies"
  },
  {
    state: "Jharkhand",
    date: "November/December 2024",
    status: "Upcoming",
    details: "Legislative Assembly Elections - 81 Constituencies"
  },
  {
    state: "Delhi",
    date: "February 2025",
    status: "Upcoming",
    details: "Legislative Assembly Elections - 70 Constituencies"
  },
  {
    state: "Bihar",
    date: "October/November 2025",
    status: "Upcoming",
    details: "Legislative Assembly Elections - 243 Constituencies"
  },
  {
    state: "Tamil Nadu",
    date: "April/May 2026",
    status: "Upcoming",
    details: "Legislative Assembly Elections - 234 Constituencies"
  },
  {
    state: "West Bengal",
    date: "April/May 2026",
    status: "Upcoming",
    details: "Legislative Assembly Elections - 294 Constituencies"
  },
  {
    state: "Kerala",
    date: "April/May 2026",
    status: "Upcoming",
    details: "Legislative Assembly Elections - 140 Constituencies"
  }
];

export default function StateGuide() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <PageHeader 
          title="State-wise Election Guide"
          description="Detailed schedule and information about upcoming Legislative Assembly elections across Indian states."
        />

        <div className="grid gap-4">
          {upcomingElections.map((election) => (
            <div 
              key={election.state}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-md group"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{election.state}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      election.status === 'Upcoming' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {election.status}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">{election.details}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                      Expected: {election.date}
                    </span>
                  </div>
                </div>
                <Link 
                  to={`/states/${election.state.toLowerCase().replace(' ', '-')}`}
                  className="p-2.5 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900 transition-all shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-xl p-6 flex gap-4">
          <Info className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">Official Verification</h4>
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              The dates mentioned above are based on the expiration of the current assembly terms. Official notifications and exact polling dates are exclusively announced by the Election Commission of India (ECI) approximately 6-8 weeks prior to the election.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
