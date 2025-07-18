import { Router } from "express";
import passport from "passport";
import { jwtUtil } from "../utils";

const googleAuthRouter = Router();

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Start Google OAuth login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google for authentication
 */
// to authenticate google requests
googleAuthRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

googleAuthRouter.get('/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res): void => {
        const user = req.user;
        if (!user) {
            res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwtUtil.generateToken({ data: user as object, expiresIn: '1d' });

        res.json({ token, user });
    }
);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Returns JWT token and user info on successful authentication
 *       401:
 *         description: Authentication failed
 */

export default googleAuthRouter;