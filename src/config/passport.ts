import passport from 'passport';
import { Strategy as githubStrategy } from 'passport-github2';
import prisma from './db';
import dotenv from 'dotenv';
dotenv.config();

passport.use(
    new githubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
            callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/api/oauth/github/callback',
        },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
            try {
                let user = await prisma.user.findUnique({
                    where: { githubId: profile.id },
                });
                if (!user) {
                    // Fallback email if not provided by GitHub
                    const email = profile.emails?.[0]?.value || `${profile.username || 'githubuser'}@noemail.github`;
                    user = await prisma.user.create({
                        data: {
                            githubId: profile.id,
                            name: profile.displayName,
                            email: email,
                            username: profile.username,
                            password: '',
                        },
                    });
                }
                
                return done(null, user);
            } catch (error: any) {
                return done(error, null);
            }
        }
    )
);
