import { Router } from "express";
import { publicController } from "../controllers";
import { rateLimiters } from "../middlewares";

const publicRouter = Router();

/**
 * @swagger
 * /api/public/u/{username}:
 *   get:
 *     summary: Get public profile by username
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the public profile
 *     responses:
 *       200:
 *         description: Public profile fetched successfully
 *       404:
 *         description: Profile not found
 */
publicRouter.get("/u/:username", rateLimiters.publicPageLimiter, publicController.getProfile);

export default publicRouter;