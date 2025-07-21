import { NextFunction, Request, Response } from "express";
import { ipUtil, deviceUtil } from "../utils";
import { linkClickService } from "../services";
import prisma from "../config/db";

export const trackClick = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const linkId  = req.params.slug;
        const userAgent = req.headers['user-agent'];
        const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "";
        const [ipInfo, deviceInfo] = await Promise.all([ipUtil.getIpInfo(ip),
        Promise.resolve(deviceUtil.extractDeviceInfo(userAgent))
        ]);

        await linkClickService.logLinkClick({
            linkId,
            ipAddress: ip,
            userAgent,
            referrer: req.headers.referer,
            country: ipInfo.country,
            city: ipInfo.city,
            agent: deviceInfo.browser,
            device: deviceInfo.deviceType,
            os: deviceInfo.os,
            browser: deviceInfo.browser,
        })
        const link = await prisma.link.findUnique({ where: { id: linkId } });
        if (!link) return res.status(404).json({ error: "Link not found" });
        res.redirect(link.url);
    } catch (error) {
        next(error);
    };
};

export const getLinkAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const  linkId  = req.params.slug;
        const analytics = await linkClickService.getAnalytics(linkId);
        res.json({ status: "success", data: analytics });
    } catch (error) {
        next(error);
    };
};
