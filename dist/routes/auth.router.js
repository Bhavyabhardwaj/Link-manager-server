"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const authRouter = (0, express_1.Router)();
authRouter.post("/signin", controllers_1.authController.handleSignIn);
authRouter.post("/signup", controllers_1.authController.handleSignUp);
exports.default = authRouter;
