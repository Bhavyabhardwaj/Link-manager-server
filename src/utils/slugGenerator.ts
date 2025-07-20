import { customAlphabet } from "nanoid";
import prisma from "../config/db";

// custom alphabet for readable slugs
const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 6); 

export async function generateUniqueSlug(): Promise<string> { 
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
        const slug = nanoid();
        const existing = await prisma.link.findFirst({ where: { slug } });

        if (!existing) {
            return slug;
        }

        attempts++;
    }

    throw new Error("Failed to generate unique slug after maximum attempts");
}