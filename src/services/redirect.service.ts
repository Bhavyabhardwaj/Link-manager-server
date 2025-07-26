import prisma from "../config/db";
import { LinkLookupParams } from "../types";

export const findLinkBySlug = async (slug: string, params: LinkLookupParams) => {
    return await prisma.link.findUnique({
        where: {
            slug,
            active: params?.includeInactive ? undefined : true
        },
    });
};

export const processLinkRedirect = async(
)