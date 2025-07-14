import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./db";
import dotenv from "dotenv";
dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/api/oauth/google/callback",
        },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
            try {
                let user = await prisma.user.findUnique({
                    where: { googleId: profile.id },
                });
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails?.[0]?.value,
                            username: profile.emails?.[0]?.value.split('@')[0] || "",
                            password: "",
                        },
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
)