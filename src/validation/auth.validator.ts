import {z} from "zod";

export const signin = z.object({
    username: z.string().min(3).max(20).trim(), // remove whitespace from both ends
    password: z.string().min(6).max(32),
})

export const signup = signin.extend({
    email: z.string().email(),
})

export type SigninInput = z.infer<typeof signin>;
export type SignupInput = z.infer<typeof signup>;