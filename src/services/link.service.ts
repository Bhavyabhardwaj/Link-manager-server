import { linkValidation } from "../validation";
import prisma from "../config/db";
import { slugUtil } from "../utils";
import { BadRequestError } from "../errors";

// Service functions for link business logic and database operations
// Creates a new link for a user
export const createLink = async ({ title, url, description, slug: requestedSlug }: linkValidation.LinkInput, userId: string) => {
    let slug = requestedSlug;
    if (!slug) {
        slug = await slugUtil.generateUniqueSlug();
    } else {
        const exists = await prisma.link.findFirst({ where: { slug } });
        if (exists) {
            throw new BadRequestError("Slug already exists");
        }
    }
    const newLink = await prisma.link.create({
        data: {
            title,
            url,
            description,
            userId,
            slug
        }
    })
    return newLink;
}

// Fetches all active links for a user, ordered by creation date
export const getLinks = async (userId: string) => {
    const links = await prisma.link.findMany({
        where: {
            userId,
            active: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return links;
}

// Fetches a single active link by its ID and user ID
export const getLinkById = async (linkId: string, userId: string) => {
    const link = await prisma.link.findUnique({
        where: {
            id: linkId,
            userId,
            active: true
        }
    });
    return link;
}
// Updates an active link by its ID and user ID
export const updateLink = async (linkId: string, userId: string, updateData: Partial<linkValidation.LinkInput>) => {
    const updatedLink = await prisma.link.update({
        where: {
            id: linkId,
            userId,
            active: true
        },
        data: updateData
    });
    return updatedLink;
}

// Soft-deletes a link by setting its active flag to false
export const deleteLink = async (linkId: string, userId: string) => {
    const deletedLink = await prisma.link.update({
        where: {
            id: linkId,
            userId,
            active: true
        },
        data: {
            active: false
        }
    });
    return deletedLink;
}

// Reorders links for a user based on the provided order of link IDs
export const reorderLinks = async (userId: string, linkIds: string[]) => {
    const links = await prisma.link.findMany({
        where: {
            userId,
            id: {
                in: linkIds
            },
            active: true
        },
        orderBy: {
            order: 'asc'
        }
    });

    const updatedLinks = await Promise.all(links.map((link, index) => {
        return prisma.link.update({
            where: {
                id: link.id
            },
            data: {
                order: index
            }
        });
    }));

    return updatedLinks;
}