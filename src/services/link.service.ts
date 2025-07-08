import { linkValidation } from "../validation";
import prisma from "../config/db";

export const createLink = async({title, url, description}: linkValidation.LinkInput, userId: string) => {
    const newLink = await prisma.link.create({
        data: {
            title,
            url,
            description,
            userId,
        }
    })
    return newLink;
}

export const getLinks = async(userId: string) => {
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

export const getLinkById = async(linkId: string, userId: string) => {
    const link = await prisma.link.findUnique({
        where: {
            id: linkId,
            userId,
            active: true
        }
    });
    return link;
}
export const updateLink = async(linkId: string, userId: string, updateData: Partial<linkValidation.LinkInput>) => {
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

export const deleteLink = async(linkId: string, userId: string) => {
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
