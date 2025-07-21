import prisma from "../config/db";
import { BadRequestError, NotFoundError } from "../errors";
import { bcryptUtil, jwtUtil, emailUtil } from "../utils";
import { authValidation } from "../validation";
import crypto from "crypto";


export const signIn = async({username, password}: authValidation.SigninInput)=> {

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });
    if (!user) {
        throw new NotFoundError("User not found");
    }
    
    const isPasswordValid = await bcryptUtil.verifyPassword(password, user.password);

    if (!isPasswordValid) {
        throw new BadRequestError("Invalid username or password");
    }

    // Remove password from user object before returning
    const { password: _, ...userWithoutPassword } = user;
    
    // jwt need data and expiresIn
    const payload = {
        data: {
            id: user.id,
            user: userWithoutPassword
        },
        expiresIn: "1d"
    }
    
    const token = jwtUtil.generateToken(payload);
    return {
        user: userWithoutPassword,
        token
    };
}

export const signUp = async({username, password, email}: authValidation.SignupInput) => {
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where:{
            username
        }
    })

    if (existingUser) {
        throw new BadRequestError("User already exists");
    }
    
    const hashedPassword = await bcryptUtil.generateHashPassword(password);

    const newUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            email,
        }
    });

    const payload = {
        data: {
            id: newUser.id,
            username: newUser.username
        },
        expiresIn: "1d"
    }

    const token = jwtUtil.generateToken(payload)

    return {   
        user: {
            id: newUser.id,
            username: newUser.username,
            token
        }
    }
}

export const forgotPassword = async ({ email }: authValidation.ForgotPasswordInput) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        // For security, don't reveal if email exists
        return {
            message: "If an account with that email exists, we sent a password reset link."
        };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Save reset token to database
    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetPasswordToken: resetToken,
            resetPasswordExpires
        }
    });

    // Send password reset email
    try {
        await emailUtil.sendPasswordResetEmail(email, resetToken);
    } catch (error) {
        // Reset the token if email fails
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: null,
                resetPasswordExpires: null
            }
        });
        throw new BadRequestError("Failed to send password reset email. Please try again.");
    }

    return {
        message: "If an account with that email exists, we sent a password reset link."
    };
};

export const resetPassword = async ({ token, newPassword }: authValidation.ResetPasswordInput) => {
    const user = await prisma.user.findFirst({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: {
                gt: new Date() // Token must not be expired
            }
        }
    });

    if (!user) {
        throw new BadRequestError("Invalid or expired reset token");
    }

    // Hash new password
    const hashedPassword = await bcryptUtil.generateHashPassword(newPassword);

    // Update password and clear reset token
    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null
        }
    });

    return {
        message: "Password has been reset successfully. You can now sign in with your new password."
    };
};
