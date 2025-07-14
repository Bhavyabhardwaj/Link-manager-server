import { Router } from "express";
import passport from "passport";
import { jwtUtil } from "../utils";

const googleAuthRouter = Router();

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

export default googleAuthRouter;