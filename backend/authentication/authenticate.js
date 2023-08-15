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
exports.jwtVerify = exports.generateRefreshToken = exports.generateToken = exports.refreshToken = exports.jwtMiddleware = void 0;
const fs_1 = require("fs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const model_1 = require("../model/model");
const privateKey = (0, fs_1.readFileSync)(path_1.default.join(__dirname, "../secret/private.pem"), "utf8");
const publicKey = (0, fs_1.readFileSync)(path_1.default.join(__dirname, "../secret/public.pem"), "utf8");
function jwtMiddleware(req, res, next) {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json("You are not authenticated");
        }
        jsonwebtoken_1.default.verify(token, publicKey, (err, decoded) => {
            if (err)
                return res.redirect("/refresh-token");
            req.user = decoded;
            next();
        });
    }
    catch (err) {
        res.json({ error: err });
    }
}
exports.jwtMiddleware = jwtMiddleware;
//refresh token
function refreshToken(req, res) {
    const { ref_tk } = req.cookies;
    if (!ref_tk)
        return res.status(401).json({ error: "You are not authenticated" });
    try {
        jsonwebtoken_1.default.verify(ref_tk, publicKey, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                return res.status(401).json({ error: "You are not authenticated" });
            const user = yield model_1.userCollection.findOne({ email: decoded.email });
            const token = generateToken({ email: user === null || user === void 0 ? void 0 : user.email, name: user === null || user === void 0 ? void 0 : user.name });
            res.status(201).json({ token });
        }));
    }
    catch (error) { }
}
exports.refreshToken = refreshToken;
function generateToken(data) {
    const token = jsonwebtoken_1.default.sign(data, privateKey, {
        algorithm: "RS256",
        expiresIn: "30m",
    });
    return token;
}
exports.generateToken = generateToken;
function generateRefreshToken(data) {
    const token = jsonwebtoken_1.default.sign(data, privateKey, {
        algorithm: "RS256",
        expiresIn: "7d",
    });
    return token;
}
exports.generateRefreshToken = generateRefreshToken;
function jwtVerify(token) {
    try {
        jsonwebtoken_1.default.verify(token, publicKey, (err, decoded) => {
            if (err)
                return false;
            return true;
        });
    }
    catch (error) {
        return false;
    }
}
exports.jwtVerify = jwtVerify;
