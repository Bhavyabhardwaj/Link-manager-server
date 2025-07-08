"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.signin = void 0;
const zod_1 = require("zod");
exports.signin = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20).trim(), // remove whitespace from both ends
    password: zod_1.z.string().min(6).max(32),
});
exports.signup = exports.signin.extend({
    email: zod_1.z.string().email(),
});
