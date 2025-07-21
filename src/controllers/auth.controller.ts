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

export const handleSignUp = async(req: Request, res: Response, next: NextFunction) => {
    const {username, password, email}: authValidation.SignupInput = req.body;

    try {
        const user = await authService.signUp({username, password, email});
        res.status(201).json({
            status: "success",
            message: "Sign up successful",
            user,
        });
    } catch (error) {
        next(error);
        
    }
}


export const verifyToken = async (req: Request, res: Response) => {
    res.status(200).json({
        success : true,
        message : "Verified user"
    });
}

export const forgotPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email }: authValidation.ForgotPasswordInput = req.body;
        const result = await authService.forgotPassword({ email });
        
        res.status(200).json({
            status: "success",
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
}

export const resetPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { token, newPassword, confirmPassword }: authValidation.ResetPasswordInput = req.body;
        const result = await authService.resetPassword({ token, newPassword, confirmPassword });
        
        res.status(200).json({
            status: "success",
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
}