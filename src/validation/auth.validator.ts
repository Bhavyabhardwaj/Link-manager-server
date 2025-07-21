import {z} from "zod";

export const signin = z.object({
    username: z.string().min(3).max(20).trim(), // remove whitespace from both ends
    password: z.string().min(6).max(32),
})

export const signup = signin.extend({
    email: z.string().email(),
})

export const forgotPassword = z.object({
    email: z.string().email("Please provide a valid email address"),
});

export const resetPassword = z.object({
    token: z.string().min(1, "Reset token is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters").max(32, "Password must be at most 32 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters").max(32, "Password must be at most 32 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type SigninInput = z.infer<typeof signin>;
export type SignupInput = z.infer<typeof signup>;
export type ForgotPasswordInput = z.infer<typeof forgotPassword>;
export type ResetPasswordInput = z.infer<typeof resetPassword>;