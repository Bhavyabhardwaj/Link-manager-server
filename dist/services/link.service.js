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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLink = exports.updateLink = exports.getLinkById = exports.getLinks = exports.createLink = void 0;
const db_1 = __importDefault(require("../config/db"));
const createLink = (_a, userId_1) => __awaiter(void 0, [_a, userId_1], void 0, function* ({ title, url, description }, userId) {
    const newLink = yield db_1.default.link.create({
        data: {
            title,
            url,
            description,
            userId,
        }
    });
    return newLink;
});
exports.createLink = createLink;
const getLinks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const links = yield db_1.default.link.findMany({
        where: {
            userId,
            active: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return links;
});
exports.getLinks = getLinks;
const getLinkById = (linkId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const link = yield db_1.default.link.findUnique({
        where: {
            id: linkId,
            userId,
            active: true
        }
    });
    return link;
});
exports.getLinkById = getLinkById;
const updateLink = (linkId, userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedLink = yield db_1.default.link.update({
        where: {
            id: linkId,
            userId,
            active: true
        },
        data: updateData
    });
    return updatedLink;
});
exports.updateLink = updateLink;
const deleteLink = (linkId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedLink = yield db_1.default.link.update({
        where: {
            id: linkId,
            userId,
            active: true
        },
        data: {
            active: false
        }
    });
    return deletedLink;
});
exports.deleteLink = deleteLink;
