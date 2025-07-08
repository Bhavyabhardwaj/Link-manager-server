import { NextFunction, Request, Response } from "express";
import { jwtUtil } from "../utils";
import { UnauthorizedError } from "../errors";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization)?.split(" ")[1];

    if (!token) {
        throw new UnauthorizedError("Token is required");
    }

    try {
        const { data } = jwtUtil.verifyToken(token);
        (req as any).user = data; 
        next();
    } catch (error) {
        next(error);
    }
}