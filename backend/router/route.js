"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const authenticate_1 = require("../authentication/authenticate");
exports.router = express_1.default.Router();
exports.router.post("/register", userController_1.createUser);
exports.router.post("/login", userController_1.loginUser);
exports.router.get('/login/get', (req, res) => {
    res.send('hello');
});
exports.router.post('/refresh-token', authenticate_1.refreshToken);
exports.router.use(authenticate_1.jwtMiddleware);
exports.router.get("/verify", userController_1.verifyUser);
