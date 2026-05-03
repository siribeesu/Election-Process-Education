import React from 'react';
import { PageContainer } from '@/components/layout';
import { PageHeader } from '@/components/ui';
import { FAQSection } from '@/components/ui';

const mythsFacts = [
  {
    question: "Is it possible to vote without a Voter ID card?",
    answer: "Yes. While a Voter ID (EPIC) is preferred, you can vote if your name is on the electoral roll by showing any of the 12 government-approved photo IDs, including Aadhaar Card, PAN Card, Passport, Driving License, or MNREGA Job Card."
  },
  {
    question: "Can Electronic Voting Machines (EVMs) be hacked via Bluetooth or Wi-Fi?",
    answer: "No. Indian EVMs are standalone machines. They are not connected to any network, including the internet, Bluetooth, or Wi-Fi. They do not have any communication hardware, making remote hacking impossible."
  },
  {
    question: "Does a high number of NOTA (None of the Above) votes lead to a re-election?",
    answer: "No. In the current Indian electoral system, NOTA is a symbolic right to reject. Even if NOTA receives the highest number of votes, the candidate with the next highest vote count is declared the winner."
  },
  {
    question: "Can NRIs cast their vote online or through an embassy?",
    answer: "Currently, Overseas (NRI) voters must be physically present at their registered polling station in India on the day of polling to cast their vote. Online or proxy voting for NRIs is not yet implemented."
  },
  {
    question: "If I have a Voter ID card, is my vote guaranteed?",
    answer: "Not necessarily. Having a physical Voter ID card is not enough; your name MUST be present in the current Electoral Roll of your constituency. Always verify your name on the 'Voter Service Portal' before election day."
  },
  {
    question: "Can a person contest elections from multiple seats?",
    answer: "A candidate can contest from a maximum of two constituencies in a single general election (Lok Sabha or State Assembly). However, if they win both, they must resign from one within a specified period."
  },
  {
    question: "What is the purpose of the VVPAT machine?",
    answer: "The Voter Verifiable Paper Audit Trail (VVPAT) allows voters to verify that their vote was cast correctly. It prints a slip showing the candidate's name and symbol for 7 seconds before dropping into a sealed box."
  },
  {
    question: "Can someone else vote on my behalf if I am unwell?",
    answer: "No. Proxy voting is only available to 'Service Voters' (Armed Forces personnel). For others, the 'one person, one vote' rule is strictly enforced through physical presence and indelible ink."
  }
];

export default function MythsFacts() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <PageHeader 
          title="Myths & Facts"
          description="Common misconceptions and factual clarifications about the Indian election process."
        />
        
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <div className="space-y-6">
            <p className="text-zinc-600 dark:text-zinc-400">
              Ensuring accurate information is crucial for a healthy democracy. Here are some common myths debunked with facts from the Election Commission of India.
            </p>
            <FAQSection items={mythsFacts} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
