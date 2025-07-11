import { Router } from "express";
import authRouter from "./auth.router";
import linkRouter from "./link.router"; 
import { isAuthenticated } from "../middlewares"; // for protected routes
import publicRouter from "./public.router";

const router = Router();

router.use("/", publicRouter)

// Define route structure
const apiRoutes = [
  { path: "/auth", route: authRouter },
  { path: "/link", route: linkRouter, isProtected: true },
];

// Loop through routes and apply them
apiRoutes.forEach(({ path, route, isProtected }) => {
  if (isProtected) {
    router.use(`/api${path}`, isAuthenticated, route);
  } else {
    router.use(`/api${path}`, route);
  }
});

export default router;
