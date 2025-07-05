import { Router } from "express";
import { authController } from "../controllers";

const authRouter = Router();

authRouter.post("/signin", authController.handleSignIn);

authRouter.post("/signup", authController.handleSignUp);

export default authRouter;