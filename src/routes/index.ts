import authRouter from "./auth.router";
import { Router } from "express";

const router = Router();

const apiRoutes = [
    { path: "/auth", router: authRouter },
]