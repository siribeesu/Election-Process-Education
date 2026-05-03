import { Router, type IRouter } from "express";
import healthRouter from "./health";
import geminiRouter from "./gemini/index";
import mythsRouter from "./election/myths";
import pollingPlacesRouter from "./election/polling-places";
import voterJourneyRouter from "./election/voter-journey";
import ballotInfoRouter from "./election/ballot-info";
import statsRouter from "./election/stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(geminiRouter);
router.use(mythsRouter);
router.use(pollingPlacesRouter);
router.use(voterJourneyRouter);
router.use(ballotInfoRouter);
router.use(statsRouter);

export default router;
