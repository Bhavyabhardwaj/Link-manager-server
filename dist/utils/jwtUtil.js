"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfig_1 = require("../config/jwtConfig");
const generateToken = ({ data, expiresIn }) => {
    return jsonwebtoken_1.default.sign(data, jwtConfig_1.JWT_SECRET, { expiresIn });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const data = jsonwebtoken_1.default.verify(token, jwtConfig_1.JWT_SECRET);
        return {
            valid: true,
            data
        };
    }
    catch (error) {
        return {
            valid: false,
            data: null
        };
    }
};
exports.verifyToken = verifyToken;
