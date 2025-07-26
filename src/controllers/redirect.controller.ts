import { NextFunction, Request, Response } from "express";
import prisma from "../config/db";
import { deviceUtil, ipUtil } from "../utils";
import { linkService } from "../services";

export const redirectToOriginalUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const link = await prisma.link.findUnique({
            where: { slug, active: true },
        })

        if (!link) {
            return res.status(404).json({
                status: "Link not found",
                message: "The short link you're looking for doesn't exist or has been deleted."
            });
        }
        const userAgent = req.headers['user-agent'] || 'unknown';
        const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
            req.socket.remoteAddress ||
            req.ip ||
            "";
        
        const trackClick = async() => {
            try {
                const [ipInfo, deviceInfo] = await Promise.all([
                    ipUtil.getIpInfo(ip),
                    Promise.resolve(deviceUtil.extractDeviceInfo(userAgent))
                ]);
                await linkService.logLinkClick({
                    linkId: link.id,
                    ip,
                    userAgent,
                    referrer: req.headers.referer || "",
                    country: ipInfo.country || "Unknown",
                    city: ipInfo.city || "Unknown",
                    agent: deviceInfo.browser || "Unknown",
                    device: deviceInfo.deviceType || "Unknown",
                    os: deviceInfo.os || "Unknown",
                    browser: deviceInfo.browser || "Unknown",
                });
            } catch (error) {
                console.error("Error tracking link click:", error);
            }
        }
        await trackClick();
        return res.redirect(301, link.url)
    } catch (error) {
        console.error("Error in redirectToOriginalUrl:", error);
        next(error);
    }
};

export const getLinkInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const link = await prisma.link.findUnique({
            where: { slug, active: true },
            select: {
                id: true,
                url: true,
                slug: true,
                title: true,
                description: true,
                createdAt: true,
                _count: {
                    select: {
                        linkClicks: true,
                    }
                }
            }
        });

        if (!link) {
            return res.status(404).json({
                status: "Link not found",
                message: "The short link you're looking for doesn't exist or has been deleted."
            });
        }

        res.json({
            ...link,
            shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${link.slug}`,
            clickCount: link._count.linkClicks
        });
    } catch (error) {
        console.error("Error in getLinkInfo:", error);
        next(error);
    }
}