import { Router, type IRouter } from "express";

const router: IRouter = Router();

const myths = [
  {
    id: 1,
    myth: "Electronic Voting Machines (EVMs) can be hacked using Bluetooth or Wi-Fi.",
    fact: "EVMs are standalone machines with no internet, Bluetooth, or Wi-Fi connectivity. They are strictly offline and tamper-proof through multiple administrative and technical safeguards.",
    category: "EVM Security",
    source: "https://www.eci.gov.in/evm-vvpat",
  },
  {
    id: 2,
    myth: "If NOTA (None of the Above) gets the most votes, the election is cancelled.",
    fact: "Currently, NOTA votes are only for expressing dissent. Even if NOTA gets the highest votes, the candidate with the next highest votes is declared the winner.",
    category: "NOTA",
    source: "https://www.eci.gov.in/files/file/11551-nota-faq/",
  },
  {
    id: 3,
    myth: "You cannot vote if you don't have your physical Voter ID (EPIC) card.",
    fact: "You can vote as long as your name is in the Electoral Roll. You can use any of the 12 alternative photo IDs approved by the ECI, such as Aadhaar Card, PAN Card, or Passport.",
    category: "Voter ID",
    source: "https://voters.eci.gov.in/",
  },
  {
    id: 4,
    myth: "NRIs can vote online from their country of residence.",
    fact: "Overseas Indian electors must be physically present at their designated polling station in India to cast their vote. Online or postal voting for NRIs is not yet implemented.",
    category: "NRI Voting",
    source: "https://voters.eci.gov.in/nri",
  },
  {
    id: 5,
    myth: "The indelible ink on the finger can be easily removed to vote twice.",
    fact: "The ink contains silver nitrate which reacts with the skin and becomes impossible to wash off for several days. It is a foolproof method to prevent multiple voting.",
    category: "Election Security",
    source: "https://www.eci.gov.in/",
  },
  {
    id: 6,
    myth: "Private sector employees don't get leave to vote.",
    fact: "Under Section 135B of the RP Act, 1951, every person employed in any business or trade is entitled to a paid holiday on the day of the poll. Employers can face penalties for violations.",
    category: "Voting Rights",
    source: "https://www.eci.gov.in/",
  },
];

router.get("/election/myths", (_req, res) => {
  res.json(myths);
});

export default router;
