"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkValidator = void 0;
const zod_1 = require("zod");
exports.linkValidator = zod_1.z.object({
    url: zod_1.z.string().url(),
    title: zod_1.z.string().min(1, 'Title is required'),
    active: zod_1.z.boolean().optional().default(true),
    description: zod_1.z.string().optional(),
    createdAt: zod_1.z.date().optional(),
});
