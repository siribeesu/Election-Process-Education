import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/ui/page-header';
import { CheckCircle2, Search, ArrowRight, UserCheck, CreditCard, ShieldCheck } from 'lucide-react';

const votingSteps = [
  {
    title: "Voter Registration (Form 6)",
    description: "If you are 18+ and not registered, fill Form 6 on the Voter Service Portal (voters.eci.gov.in) or use the Voter Helpline App. Ensure your name is on the Electoral Roll.",
    icon: Search
  },
  {
    title: "Verify Your Details",
    description: "Search your name in the Electoral Roll using your EPIC number or personal details. If your name isn't there, you cannot vote even if you have a physical ID card.",
    icon: UserCheck
  },
  {
    title: "Locate Your Polling Station",
    description: "Find your specific polling booth and booth number. You can find this on your 'Voter Information Slip' or via the ECI portal/SMS service.",
    icon: Search
  },
  {
    title: "Identification on Polling Day",
    description: "Visit your booth with your Voter ID (EPIC). If you don't have it, carry one of 12 alternatives like Aadhaar, Passport, PAN Card, or Driving License.",
    icon: CreditCard
  },
  {
    title: "The Three-Officer Process",
    description: "1st Officer checks name & ID. 2nd Officer marks finger with ink and takes signature. 3rd Officer checks the ink and enables the voting machine.",
    icon: ShieldCheck
  },
  {
    title: "Casting & Verifying the Vote",
    description: "Press the blue button next to your candidate's symbol on the EVM. Hear the 'Beep' and verify the slip in the VVPAT window for 7 seconds.",
    icon: CheckCircle2
  }
];

export default function VoteGuide() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto space-y-12 py-8">
        <PageHeader 
          title="Step-by-Step Voting Guide"
          description="A comprehensive walkthrough of the Indian electoral process, from registration to the polling booth."
        />
        
        <div className="relative">
          {/* Vertical Line for Desktop */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-zinc-200 dark:bg-zinc-800 hidden md:block" />
          
          <div className="space-y-8">
            {votingSteps.map((step, index) => (
              <div 
                key={index}
                className="relative flex flex-col md:flex-row gap-6 group"
              >
                {/* Step Number Circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-100 flex items-center justify-center text-lg font-black text-zinc-900 dark:text-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-transform group-hover:scale-110">
                  {index + 1}
                </div>
                
                <div className="flex-grow bg-white dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group-hover:border-zinc-400 dark:group-hover:border-zinc-600">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{step.title}</h3>
                    <step.icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800/20 dark:bg-zinc-200/50 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110" />
          
          <div className="space-y-3 relative z-10">
            <h3 className="text-3xl font-black tracking-tight">Ready to exercise your right?</h3>
            <p className="text-zinc-400 dark:text-zinc-600 font-medium">Join 900+ million voters in the world's largest democracy.</p>
          </div>
          
          <button className="relative z-10 px-10 py-5 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white rounded-2xl font-black text-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all flex items-center gap-3 active:scale-95 shadow-xl">
            Check Your Status
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Toll-Free Helpline</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">For any election-related queries or complaints.</p>
            <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">1950</span>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Voter Portal</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Official ECI portal for registration and services.</p>
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100 hover:underline">
              voters.eci.gov.in
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
