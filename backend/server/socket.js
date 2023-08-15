"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketConnection = void 0;
function initSocketConnection(server) {
    server.on("connection", (socket) => {
        socket.on("message", (message) => {
            socket.broadcast.emit("message", message);
        });
    });
}
exports.initSocketConnection = initSocketConnection;
