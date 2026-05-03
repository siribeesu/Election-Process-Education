import { Router, type IRouter } from "express";

const router: IRouter = Router();

const ballotDataByState: Record<string, {
  electionDate: string;
  candidates: Array<{ name: string; party: string; office: string; website: string | null }>;
  measures: Array<{ title: string; description: string; type: string }>;
}> = {
  MH: {
    electionDate: "Phased Elections 2024",
    candidates: [
      { name: "Rajesh Kulkarni", party: "Regional Party A", office: "Member of Parliament (Lok Sabha)", website: "https://affidavit.eci.gov.in" },
      { name: "Priya Deshmukh", party: "National Party B", office: "Member of Parliament (Lok Sabha)", website: "https://affidavit.eci.gov.in" },
      { name: "Anil Shinde", party: "Independent", office: "Member of Parliament (Lok Sabha)", website: null },
    ],
    measures: [
      { title: "Coastal Road Project", description: "Expansion of the Mumbai coastal road for improved connectivity", type: "Infrastructure Focus" },
      { title: "Metro Line 3", description: "Completion of the underground metro corridor", type: "Public Transport Focus" },
    ],
  },
  DL: {
    electionDate: "May 25, 2024",
    candidates: [
      { name: "Sanjay Sharma", party: "National Party A", office: "Member of Parliament (Lok Sabha)", website: "https://affidavit.eci.gov.in" },
      { name: "Anita Kumari", party: "Regional Party C", office: "Member of Parliament (Lok Sabha)", website: "https://affidavit.eci.gov.in" },
    ],
    measures: [
      { title: "Clean Yamuna Initiative", description: "Environmental project to revitalize the Yamuna river", type: "Environmental Focus" },
      { title: "Mohalla Clinics Expansion", description: "Increasing the number of primary healthcare centers", type: "Healthcare Focus" },
    ],
  },
  UP: {
    electionDate: "Phased: April-June 2024",
    candidates: [
      { name: "Amit Yadav", party: "Regional Party D", office: "Member of Parliament (Lok Sabha)", website: "https://affidavit.eci.gov.in" },
      { name: "Sita Singh", party: "National Party A", office: "Member of Parliament (Lok Sabha)", website: "https://affidavit.eci.gov.in" },
    ],
    measures: [
      { title: "Expressway Network", description: "Linking rural areas with industrial hubs via new expressways", type: "Infrastructure Focus" },
      { title: "Ganga Clean-up", description: "Namami Gange mission progress in Varanasi and Kanpur", type: "Environmental Focus" },
    ],
  },
  WB: {
    electionDate: "Phased: April-June 2024",
    candidates: [
      { name: "Subrata Banerjee", party: "Regional Party E", office: "Member of Parliament (Lok Sabha)", website: "https://affidavit.eci.gov.in" },
      { name: "Mousumi Das", party: "National Party A", office: "Member of Parliament (Lok Sabha)", website: "https://affidavit.eci.gov.in" },
    ],
    measures: [
      { title: "Smart City Kolkata", description: "Urban renewal and IT hub expansion", type: "Urban Development" },
    ],
  },
  GJ: {
    electionDate: "May 7, 2024",
    candidates: [
      { name: "Harsh Patel", party: "National Party A", office: "Member of Parliament (Lok Sabha)", website: "https://affidavit.eci.gov.in" },
      { name: "Meera Shah", party: "National Party B", office: "Member of Parliament (Lok Sabha)", website: "https://affidavit.eci.gov.in" },
    ],
    measures: [
      { title: "GIFT City Phase II", description: "Expansion of the international finance hub", type: "Economic Focus" },
    ],
  },
  TS: {
    electionDate: "May 13, 2024",
    candidates: [
      { name: "Venkatesh Rao", party: "Regional Party F", office: "Member of Parliament (Lok Sabha)", website: "https://affidavit.eci.gov.in" },
      { name: "K. Lakshmi", party: "National Party A", office: "Member of Parliament (Lok Sabha)", website: "https://affidavit.eci.gov.in" },
    ],
    measures: [
      { title: "IT Corridor Extension", description: "Extending the Hitech city infrastructure", type: "Economic Focus" },
    ],
  },
  DEFAULT: {
    electionDate: "Check ECI Calendar 2024",
    candidates: [
      { name: "Candidate A", party: "Independent", office: "Lok Sabha Representative", website: "https://affidavit.eci.gov.in" },
      { name: "Candidate B", party: "National Party", office: "Lok Sabha Representative", website: "https://affidavit.eci.gov.in" },
    ],
    measures: [
      { title: "Constituency Development", description: "Local development initiatives proposed for your area", type: "Local Focus" },
    ],
  },
};

router.get("/election/ballot-info", (req, res) => {
  const state = (req.query.state as string)?.toUpperCase();
  if (!state) {
    res.status(400).json({ error: "state query parameter is required" });
    return;
  }
  const data = ballotDataByState[state] || { ...ballotDataByState["DEFAULT"], state };
  res.json({ state, ...data });
});

export default router;
