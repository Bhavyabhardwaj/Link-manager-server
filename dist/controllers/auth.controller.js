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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.handleSignUp = exports.handleSignIn = void 0;
const services_1 = require("../services");
const handleSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const { token, user } = yield services_1.authService.signIn({ username, password });
        res.status(200).json({
            status: "success",
            message: "Sign in successful",
            user,
            token
        });
    }
    catch (error) {
        next(error);
    }
});
exports.handleSignIn = handleSignIn;
const handleSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const user = yield services_1.authService.signUp({ username, password, email });
        res.status(201).json({
            status: "success",
            message: "Sign up successful",
            user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.handleSignUp = handleSignUp;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
        message: "Verified user"
    });
});
exports.verifyToken = verifyToken;
