import { Strategy as githubStrategy } from 'passport-github2';
import passport from 'passport';
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
                    user = await prisma.user.create({
                        data: {
                            githubId: profile.id,
                            name: profile.displayName,
                            email: profile.emails?.[0].value,
                            username: profile.username,
                            password: '',
                        },
                    });
                }
                
                return done(null, user);
            } catch (error) {
                console.error('Error in GitHub strategy:', error);
                return done(error, null);
            }
        }
    )
);
