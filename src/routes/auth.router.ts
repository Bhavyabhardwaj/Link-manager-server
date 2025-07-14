import { Router } from "express";
import { authController } from "../controllers";
import { rateLimiters } from "../middlewares";

const authRouter = Router();

/** 
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: User signed in successfully
 */
authRouter.post("/signin", , rateLimiters.loginLimiter, authController.handleSignIn);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: secret123
 *               email:
 *                 type: string
 *                 example: 6qo8d@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 */
authRouter.post("/signup",  rateLimiters.signupLimiter, authController.handleSignUp);

export default authRouter;
