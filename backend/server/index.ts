import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { initSocketConnection } from "./socket";
import { router } from "../router/route";
import { jwtMiddleware, jwtVerify } from "../authentication/authenticate";
//create express application

const app = express();

//cors update

app.use(
  cors({
    origin: "*",
  })
);

//express routes
app.use("/api", router);

// jwt middleware

app.use(jwtMiddleware);

//create http server

const httpServer = createServer(app);

//create socket.io server

const io = new Server(httpServer, {
  cors: { origin: "*" },
  maxHttpBufferSize: 1e8,
});

// jwt middleware authentication

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  const verify = jwtVerify(token);
  if (false) {
    return next(new Error("Authentication error"));
  }
  next();
});

// define socket.io events

initSocketConnection(io);

//listen on port 4001

httpServer.listen(4001, () => {
  console.log("listening on port 4001");
});
