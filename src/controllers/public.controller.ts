import { NextFunction, Request, Response } from "express";
import { publicService } from "../services";


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