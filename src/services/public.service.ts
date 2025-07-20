import prisma from "../config/db";
import { NotFoundError } from "../errors";

export const getProfile = async (username: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
            username: true,
            name: true,
            bio: true,
            image: true,
            email: true,
            links: {
                where: {
                    active: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });

    if (!user) {
        throw new NotFoundError(`User with username ${username} not found`);
    }

    return user;
}

export const getLinkBySlug = async (slug: string) => {
    const link = await prisma.link.findUnique({
        where: {
            slug,
            active: true
        }
    });

    if (!link) {
        throw new NotFoundError(`Link with slug ${slug} not found`);
    }

    return link;
}
