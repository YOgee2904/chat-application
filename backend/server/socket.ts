import { Socket, Server } from "socket.io";

export function initSocketConnection(server: Server): void {
  server.on("connection", (socket: Socket) => {
    socket.on("message", (message) => {
      socket.broadcast.emit("message", message);
    });
  });
}
