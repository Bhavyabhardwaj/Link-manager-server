import { Router } from "express";
import passport from "passport";
import { jwtUtil } from "../utils";

const githubAuthRouter = Router();

githubAuthRouter.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

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