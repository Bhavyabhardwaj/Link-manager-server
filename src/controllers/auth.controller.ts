import { Response, Request, NextFunction } from "express";
import { authService } from "../services";
import { signIn } from "../services/auth.service";
import { authValidation } from "../validation";

export const handleSignIn = async(req: Request, res: Response, next: NextFunction) => {
    const {username, password}: authValidation.SigninInput = req.body;

    try {
        const {token, user} = await authService.signIn({username, password});
        res.status(200).json({
            status: "success",
            message: "Sign in successful",
            user,
            token
        });
    } catch (error) {
        next(error);
    }
}