"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.jwtMiddleware = void 0;
const fs_1 = require("fs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateKey = (0, fs_1.readFileSync)(__dirname + "/secret/private.pem", "utf8");
const publicKey = (0, fs_1.readFileSync)(__dirname + "/secret/public.pem", "utf8");
function jwtMiddleware(req, res, next) {
    var _a;
    try {
        const token = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("token=")[1];
        if (!token) {
            return res.redirect("/login");
        }
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        if (decoded) {
            return next();
        }
        res.status(401).json("You are not authorized");
    }
    catch (err) {
        res.json({ error: err });
    }
}
exports.jwtMiddleware = jwtMiddleware;
function generateToken(data) {
    const token = jsonwebtoken_1.default.sign(data, privateKey, { algorithm: "RS256" });
    return token;
}
exports.generateToken = generateToken;
