import { Router } from "express";
import { authController } from "../controllers";
import { rateLimiters, validateBody } from "../middlewares";
import { authValidation } from "../validation";

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
authRouter.post("/signin", validateBody(authValidation.signin), rateLimiters.loginLimiter, authController.handleSignIn);

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
authRouter.post("/signup", validateBody(authValidation.signup), rateLimiters.signupLimiter, authController.handleSignUp);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent (if account exists)
 *       400:
 *         description: Invalid email format
 */
authRouter.post("/forgot-password", validateBody(authValidation.forgotPassword), rateLimiters.loginLimiter, authController.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password using token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: Password reset token from email
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 32
 *                 example: newSecretPassword123
 *               confirmPassword:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 32
 *                 example: newSecretPassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token, or passwords don't match
 */
authRouter.post("/reset-password", validateBody(authValidation.resetPassword), rateLimiters.loginLimiter, authController.resetPassword);

export default authRouter;
