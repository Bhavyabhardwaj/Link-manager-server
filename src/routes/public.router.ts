import { Router } from "express";
import { publicController } from "../controllers";
import { rateLimiters } from "../middlewares";

const publicRouter = Router();

publicRouter.get("/u/:username", rateLimiters.publicPageLimiter, publicController.getProfile);

export default publicRouter;