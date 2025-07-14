import passport from 'passport';
import { Strategy as githubStrategy } from 'passport-github2';
import prisma from './db';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

async function getGithubPrimaryEmail(accessToken: string): Promise<string | null> {
    const res = await fetch('https://api.github.com/user/emails', {
        headers: {
            'Authorization': `token ${accessToken}`,
            'User-Agent': 'LinkManagerApp'
        }
    });
    const emails = await res.json();
    if (!Array.isArray(emails)) return null;
    const primary = emails.find((e: any) => e.primary && e.verified);
    return primary ? primary.email : (emails[0] ? emails[0].email : null);
}

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
                let email = profile.emails?.[0]?.value;
                if (!email) {
                    email = await getGithubPrimaryEmail(accessToken);
                }
                if (!user) {
                    const finalEmail = email || `${profile.username || 'githubuser'}@noemail.github`;
                    user = await prisma.user.create({
                        data: {
                            githubId: profile.id,
                            name: profile.displayName,
                            email: finalEmail,
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
