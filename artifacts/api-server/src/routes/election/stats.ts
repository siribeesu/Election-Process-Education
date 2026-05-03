import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/election/stats", (_req, res) => {
  res.json({
    registeredVoters: 968800000,
    voterTurnout2019: 67.4,
    voterTurnoutState: 75.0,
    totalStates: 28,
    totalUnionTerritories: 8,
    mythsBusted: 12,
  });
});

export default router;
