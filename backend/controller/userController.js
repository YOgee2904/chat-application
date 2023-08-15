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
exports.verifyUser = exports.loginUser = exports.createUser = void 0;
const model_1 = require("../model/model");
const generateHash_1 = require("../authentication/generateHash");
const authenticate_1 = require("../authentication/authenticate");
// validate Email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//create user
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        if (!validateEmail(email))
            return res.status(400).json({ message: "Invalid Email" });
        try {
            const user = yield model_1.userCollection.findOne({ email: email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }
            const salt = (0, generateHash_1.createSalt)();
            const hash = (0, generateHash_1.createHash)(password, salt);
            const newuser = yield model_1.userCollection.insertOne({
                name,
                email,
                hash,
                salt,
            });
            const token = (0, authenticate_1.generateToken)({ name, email });
            const refreshToken = (0, authenticate_1.generateRefreshToken)({ email });
            res.status(201).json({ token: token, refreshToken: refreshToken });
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    });
}
exports.createUser = createUser;
//login user
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield model_1.userCollection.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ message: "User does not exist" });
            }
            const isVerified = (0, generateHash_1.verifyHash)({
                password: password,
                salt: user.salt,
                hash: user.hash,
            });
            if (!isVerified)
                return res.status(401).json({ "error": "You are not Authenticated" });
            const token = (0, authenticate_1.generateToken)({ name: user.name, email });
            const refreshToken = (0, authenticate_1.generateRefreshToken)({ email });
            res.status(201).json({ token: token, refreshToken: refreshToken });
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    });
}
exports.loginUser = loginUser;
//get user
function verifyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, name } = req.user;
        try {
            const user = yield model_1.userCollection.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ message: "User does not exist" });
            }
            res.status(201).json({ email, name });
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    });
}
exports.verifyUser = verifyUser;
