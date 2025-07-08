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
exports.deleteLink = exports.updateLink = exports.getLinkById = exports.getLinks = exports.createLink = void 0;
const errors_1 = require("../errors");
const services_1 = require("../services");
const createLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, url, description } = req.body;
        const userId = req.user.id;
        const newLink = yield services_1.linkService.createLink({ title, url, description, active: true }, userId);
        res.status(201).json({
            status: "success",
            message: "Link created successfully",
            data: newLink,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createLink = createLink;
const getLinks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const links = yield services_1.linkService.getLinks(userId);
        res.status(200).json({
            status: "success",
            message: "Links fetched successfully",
            data: links,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getLinks = getLinks;
const getLinkById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const linkId = req.params.id;
        const userId = req.user.id;
        const link = yield services_1.linkService.getLinkById(linkId, userId);
        if (!link) {
            throw new errors_1.NotFoundError("Link not found");
        }
        else {
            res.status(200).json({
                status: "success",
                message: "Link fetched successfully",
                data: link,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getLinkById = getLinkById;
const updateLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const linkId = req.params.id;
        const userId = req.user.id;
        const updateData = req.body;
        const updatedLink = yield services_1.linkService.updateLink(linkId, userId, updateData);
        res.status(200).json({
            status: "success",
            message: "Link updated successfully",
            data: updatedLink,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateLink = updateLink;
const deleteLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const linkId = req.params.id;
        const userId = req.user.id;
        const deletedLink = yield services_1.linkService.deleteLink(linkId, userId);
        res.status(200).json({
            status: "success",
            message: "Link deleted successfully",
            data: deletedLink,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteLink = deleteLink;
