import { NextFunction, Request, Response } from "express";
import { linkClickService, publicService } from "../services";
import { deviceUtil, ipUtil } from "../utils";


export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.params;
        const user = await publicService.getProfile(username);
        
        res.status(200).json({
            status: "success",
            message: "User profile fetched successfully",
            data: user,
        });
    } catch (error: any) {
        next(error);
    }
}

export const handleRedirect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const link = await publicService.getLinkBySlug(slug);

        const userAgent = req.headers['user-agent'];
        const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "";
        const [ipInfo, deviceInfo] = await Promise.all([
            ipUtil.getIpInfo(ip),
            Promise.resolve(deviceUtil.extractDeviceInfo(userAgent))
        ]);

        await linkClickService.logLinkClick({
            linkId: link.id,
            ipAddress: ipInfo.ip,
            userAgent,
            referrer: req.headers.referer,
            country: ipInfo.country,
            city: ipInfo.city,
            agent: deviceInfo.browser,
            device: deviceInfo.deviceType,
            os: deviceInfo.os,
            browser: deviceInfo.browser,
        })
        
        res.redirect(link.url);
    } catch (error: any) {
        next(error);
    }
}