"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth.router"));
const link_router_1 = __importDefault(require("./link.router"));
const middlewares_1 = require("../middlewares"); // for protected routes
const router = (0, express_1.Router)();
// Define route structure
const apiRoutes = [
    { path: "/auth", route: auth_router_1.default },
    { path: "/link", route: link_router_1.default, isProtected: true },
];
// Loop through routes and apply them
apiRoutes.forEach(({ path, route, isProtected }) => {
    if (isProtected) {
        router.use(`/api${path}`, middlewares_1.isAuthenticated, route);
    }
    else {
        router.use(`/api${path}`, route);
    }
});
exports.default = router;
