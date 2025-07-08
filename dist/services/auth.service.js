"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signIn = void 0;
const db_1 = __importDefault(require("../config/db"));
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const signIn = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password }) {
    const user = yield db_1.default.user.findUnique({
        where: {
            username
        }
    });
    if (!user) {
        throw new errors_1.NotFoundError("User not found");
    }
    const isPasswordValid = yield utils_1.bcryptUtil.verifyPassword(password, user.password);
    if (!isPasswordValid) {
        throw new errors_1.BadRequestError("Invalid username or password");
    }
    // Remove password from user object before returning
    const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
    // jwt need data and expiresIn
    const payload = {
        data: {
            id: user.id,
            user: userWithoutPassword
        },
        expiresIn: "1d"
    };
    const token = utils_1.jwtUtil.generateToken(payload);
    return {
        user: userWithoutPassword,
        token
    };
});
exports.signIn = signIn;
const signUp = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password, email }) {
    // Check if user already exists
    const existingUser = yield db_1.default.user.findUnique({
        where: {
            username
        }
    });
    if (existingUser) {
        throw new errors_1.BadRequestError("User already exists");
    }
    const hashedPassword = yield utils_1.bcryptUtil.generateHashPassword(password);
    const newUser = yield db_1.default.user.create({
        data: {
            username,
            password: hashedPassword,
            email,
        }
    });
    const payload = {
        data: {
            id: newUser.id,
            username: newUser.username
        },
        expiresIn: "1d"
    };
    const token = utils_1.jwtUtil.generateToken(payload);
    return {
        user: {
            id: newUser.id,
            username: newUser.username,
            token
        }
    };
});
exports.signUp = signUp;
