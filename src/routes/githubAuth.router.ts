import { Router } from "express";
import passport from "passport";
import { jwtUtil } from "../utils";

const githubAuthRouter = Router();

/**
 * @swagger
 * /api/auth/github:
 *   get:
 *     summary: Start GitHub OAuth login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to GitHub for authentication
 */
githubAuthRouter.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

/**
 * @swagger
 * /api/auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Returns JWT token and user info on successful authentication
 *       401:
 *         description: Authentication failed
 */
githubAuthRouter.get('/github/callback',
    passport.authenticate('github', { session: false }),
    (req, res): void => {
        const user = req.user;
        if (!user) {
            res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwtUtil.generateToken({ data: user as object, expiresIn: '1d' });

        res.json({ token, user });
    }

);

export default githubAuthRouter;