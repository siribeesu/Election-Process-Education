import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/ui/page-header';
import { Scale, User, FileText, AlertCircle, Shield, Briefcase, GraduationCap, IndianRupee } from 'lucide-react';

const comparisonFactors = [
  {
    title: "Criminal Affidavits",
    description: "Candidates are required to disclose all pending criminal cases and convictions. Transparency on this is a legal mandate by the Supreme Court.",
    icon: Shield,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/10"
  },
  {
    title: "Asset Disclosure",
    description: "Detailed list of movable and immovable assets for the candidate and their spouse. Helps track growth of wealth over time.",
    icon: IndianRupee,
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-900/10"
  },
  {
    title: "Educational Background",
    description: "Verified educational qualifications as per the last degree obtained. Important for understanding the academic profile of your representative.",
    icon: GraduationCap,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/10"
  },
  {
    title: "Past Performance",
    description: "Attendance in Parliament/Assembly, number of questions asked, and utilization of MPLAD/MLALAD funds.",
    icon: Briefcase,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/10"
  }
];

export default function CandidateComparison() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto space-y-12 py-8">
        <PageHeader 
          title="Compare Candidates Wisely"
          description="A guide on how to evaluate and compare candidates using official ECI data and public records."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {comparisonFactors.map((factor, index) => (
            <div 
              key={index}
              className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${factor.bg} flex items-center justify-center mb-6 transition-transform group-hover:rotate-6`}>
                <factor.icon className={`w-7 h-7 ${factor.color}`} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{factor.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {factor.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-800/50 dark:bg-zinc-200/50 rounded-full blur-[100px] -mr-48 -mt-48" />
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">Where to find real-time candidate data?</h2>
              <p className="text-zinc-400 dark:text-zinc-600 font-medium">Official data is released by the ECI only after the final list of contesting candidates is published (usually 2 weeks before polling).</p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <a href="https://affidavit.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-2 p-6 rounded-2xl bg-zinc-800 dark:bg-zinc-200 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors">
                <FileText className="w-6 h-6 opacity-70" />
                <span className="font-bold">ECI Affidavits</span>
                <span className="text-[10px] opacity-60 uppercase tracking-widest">Official Source</span>
              </a>
              <a href="https://www.myneta.info/" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-2 p-6 rounded-2xl bg-zinc-800 dark:bg-zinc-200 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors">
                <User className="w-6 h-6 opacity-70" />
                <span className="font-bold">MyNeta (ADR)</span>
                <span className="text-[10px] opacity-60 uppercase tracking-widest">Analysis</span>
              </a>
              <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-2 p-6 rounded-2xl bg-zinc-800 dark:bg-zinc-200 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors">
                <AlertCircle className="w-6 h-6 opacity-70" />
                <span className="font-bold">KYC App</span>
                <span className="text-[10px] opacity-60 uppercase tracking-widest">Mobile App</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 py-8">
          <Scale className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
          <p className="text-zinc-500 text-sm max-w-lg italic">
            "An informed voter is the strongest pillar of democracy. Use official sources to verify candidate claims before casting your valuable vote."
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
