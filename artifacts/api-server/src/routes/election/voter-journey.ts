import { Router, type IRouter } from "express";

const router: IRouter = Router();

function getVoterJourneyForState(state: string) {
  const stateData: Record<string, { nextElectionDate: string; regDeadline: string; rollCheckDeadline: string; idRequirements: string }> = {
    MH: { nextElectionDate: "Phase 1: April 19, Phase 2: April 26", regDeadline: "Ongoing (NVSP Portal)", rollCheckDeadline: "Check before voting phase", idRequirements: "EPIC Card or 12 alternative documents" },
    DL: { nextElectionDate: "May 25", regDeadline: "Ongoing (NVSP Portal)", rollCheckDeadline: "Check 15 days before polling", idRequirements: "EPIC Card or 12 alternative documents" },
    KA: { nextElectionDate: "Phase 1: April 26, Phase 2: May 7", regDeadline: "Ongoing (NVSP Portal)", rollCheckDeadline: "Check via Voter Helpline App", idRequirements: "EPIC Card or 12 alternative documents" },
    TN: { nextElectionDate: "April 19", regDeadline: "Ongoing (NVSP Portal)", rollCheckDeadline: "Check via NVSP Portal", idRequirements: "EPIC Card or 12 alternative documents" },
    UP: { nextElectionDate: "Phased: April 19 to June 1", regDeadline: "Ongoing (NVSP Portal)", rollCheckDeadline: "Phase-wise checking advised", idRequirements: "EPIC Card or 12 alternative documents" },
    WB: { nextElectionDate: "Phased: April 19 to June 1", regDeadline: "Ongoing (NVSP Portal)", rollCheckDeadline: "Phase-wise checking advised", idRequirements: "EPIC Card or 12 alternative documents" },
    BR: { nextElectionDate: "Phased: April 19 to June 1", regDeadline: "Ongoing (NVSP Portal)", rollCheckDeadline: "Check via Voter Helpline App", idRequirements: "EPIC Card or 12 alternative documents" },
    GJ: { nextElectionDate: "May 7", regDeadline: "Ongoing (NVSP Portal)", rollCheckDeadline: "Check 10 days before polling", idRequirements: "EPIC Card or 12 alternative documents" },
    TS: { nextElectionDate: "May 13", regDeadline: "Ongoing (NVSP Portal)", rollCheckDeadline: "Check via CEO Telangana website", idRequirements: "EPIC Card or 12 alternative documents" },
    AP: { nextElectionDate: "May 13", regDeadline: "Ongoing (NVSP Portal)", rollCheckDeadline: "Check via CEO Andhra website", idRequirements: "EPIC Card or 12 alternative documents" },
    RJ: { nextElectionDate: "Phase 1: April 19, Phase 2: April 26", regDeadline: "Ongoing (NVSP Portal)", rollCheckDeadline: "Check via NVSP Portal", idRequirements: "EPIC Card or 12 alternative documents" },
    DEFAULT: { nextElectionDate: "Check ECI Phased Schedule", regDeadline: "Ongoing via NVSP Portal", rollCheckDeadline: "Check via Voter Helpline App", idRequirements: "EPIC Card or 12 alternative documents (Aadhaar, PAN, etc.)" },
  };

  const info = stateData[state.toUpperCase()] || stateData["DEFAULT"];

  return {
    state: state.toUpperCase() || "India",
    nextElectionDate: info.nextElectionDate,
    steps: [
      {
        id: 1,
        title: "Check Voter Registration",
        description: `Ensure your name is in the Electoral Roll for ${state || "your constituency"}. Use the National Voters' Service Portal (NVSP) or Voter Helpline App.`,
        deadline: info.regDeadline,
        status: "upcoming",
        link: "https://voters.eci.gov.in/",
        linkText: "Check Registration / Enroll Now",
      },
      {
        id: 2,
        title: "Know Your Candidates (KYC)",
        description: "Research the candidates in your constituency. Review their educational background, assets, and criminal records (if any) via the KYC app or ECI website.",
        deadline: null,
        status: "upcoming",
        link: "https://affidavit.eci.gov.in/",
        linkText: "Know Your Candidates",
      },
      {
        id: 3,
        title: "Locate Your Polling Station",
        description: `Find your designated polling station. You can check this on the Voter Helpline app or by sending an SMS with your EPIC number.`,
        deadline: null,
        status: "upcoming",
        link: "https://electoralsearch.eci.gov.in/pollingstation",
        linkText: "Find Polling Station",
      },
      {
        id: 4,
        title: "Voter Information Slip",
        description: `Ensure you have received your Voter Information Slip. This slip, along with an official photo ID, is essential for a smooth voting experience.`,
        deadline: "Before Voting Day",
        status: "upcoming",
        link: "https://voters.eci.gov.in/",
        linkText: "Download e-EPIC",
      },
      {
        id: 5,
        title: "Voting Day (EVM & VVPAT)",
        description: `Visit your polling station on ${info.nextElectionDate}. Cast your vote using the Electronic Voting Machine (EVM) and verify your choice on the VVPAT screen.`,
        deadline: info.nextElectionDate,
        status: "upcoming",
        link: "https://www.eci.gov.in/voter-education",
        linkText: "How to Use EVM/VVPAT",
      },
      {
        id: 6,
        title: "Results (Counting Day)",
        description: "Votes are counted on the designated counting day. Results for all constituencies are announced simultaneously on the ECI website.",
        deadline: null,
        status: "future",
        link: "https://results.eci.gov.in/",
        linkText: "Track Live Results",
      },
    ],
  };
}

router.get("/election/voter-journey", (req, res) => {
  const state = (req.query.state as string) || "MH";
  res.json(getVoterJourneyForState(state));
});

export default router;
