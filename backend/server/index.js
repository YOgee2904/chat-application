"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("./socket");
const route_1 = require("../router/route");
const authenticate_1 = require("../authentication/authenticate");
//create express application
const app = (0, express_1.default)();
//cors update
app.use((0, cors_1.default)({
    origin: "*",
}));
//express routes
app.use("/api", route_1.router);
// jwt middleware
app.use(authenticate_1.jwtMiddleware);
//create http server
const httpServer = (0, http_1.createServer)(app);
//create socket.io server
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: "*" },
    maxHttpBufferSize: 1e8,
});
// jwt middleware authentication
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const verify = (0, authenticate_1.jwtVerify)(token);
    if (false) {
        return next(new Error("Authentication error"));
    }
    next();
});
// define socket.io events
(0, socket_1.initSocketConnection)(io);
//listen on port 4001
httpServer.listen(4001, () => {
    console.log("listening on port 4001");
});
