import { Router } from "express";
import { rateLimiters } from "../middlewares";
import { redirectController } from "../controllers";


const redirectRouter = Router();

redirectRouter.get('/:slug', rateLimiters.clickLimiter, redirectController.redirectToOriginalUrl)

redirectRouter.get('/:slug/info', rateLimiters.publicPageLimiter, redirectController.getLinkInfo)

export default redirectRouter;