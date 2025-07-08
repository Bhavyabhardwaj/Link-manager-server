"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const utils_1 = require("../utils");
const errors_1 = require("../errors");
const isAuthenticated = (req, res, next) => {
    var _a;
    const token = (_a = (req.headers.authorization)) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        throw new errors_1.UnauthorizedError("Token is required");
    }
    try {
        const decoded = utils_1.jwtUtil.verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.isAuthenticated = isAuthenticated;
