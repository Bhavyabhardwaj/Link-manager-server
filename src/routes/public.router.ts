import { Router } from "express";
import { publicController } from "../controllers";

const publicRouter = Router();

publicRouter.get("/u/:username", publicController.getProfile);

export default publicRouter;