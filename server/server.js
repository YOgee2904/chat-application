const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const { readFileSync } = require("fs");
const MongoDBStore = require('connect-mongodb-session')(session);
const  auth = require('./authenticate');
//Creating Express Application
const app = express();

//creating http server on a express application
const httpServer = createServer(app);

app.use("/contents", express.static(__dirname + "/dist"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/chatapp",
  collection: "session",
  expires: 1000 * 60 * 60 * 24 * 7,
})

// session option
const sessionMiddleware = session({
  name: "weChat",
  genid: function () {
    return uuidv4();
  },
  secret: readFileSync(__dirname + '/secret/secret.txt', "utf-8").trim(),
  resave: false,
  saveUninitialized: false,
  store:  store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: true,
    domain: "localhost",
  },
});


// use session middleware
app.use(sessionMiddleware);

// login route
app.post("/auth", (req, res) => {
  const token = auth.generateToken({userIDP:uuidv4(), username: req.body.username})
  //set cookie
  res.setHeader("Set-Cookie", `token=${token}; path=/; httpOnly`)
  req.session.authenticated = true;
  req.session.username = req.body.username;
  res.redirect("/");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});
app.use(auth.jwtMiddleware);
//creating socket server on http server

const io = new Server(httpServer, {
  maxHttpBufferSize: 1e8,
});

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));

app.get("/", (req, res) => {
  if (req.session.authenticated) {
    res.sendFile(__dirname + "/index.html");
  } else {
    res.redirect("/login");
  }
});

io.use((socket, next) => {
  const session = socket.request.session;
  if (session && session.authenticated) {
    next();
  } else {
    next(new Error("unauthorized"));
  }
});

io.on("connection", (socket) => {
  let username = socket.request.session.username;
  socket.emit("username", username);
  socket.broadcast.emit("user-connected", {
    username: username,
    userID: socket.id,
  });
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.request.session.username,
    });
  }
  socket.emit("users", users);
  socket.on("message", (data) => {
    socket.broadcast.emit("message", {
      message: data.message,
      username: username,
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", socket.id);
  });
  //file-upload
  socket.on("file-upload", (data) => {
    socket.broadcast.emit("file-upload", {
      message: data.message,
      username: username,
    });
  });
  //private file upload
  socket.on("private-file-upload", (data) => {
    // data => {message : fileType , fileData, fileName}
    socket.to(data.to).emit("private-file-upload", {
      message: data.message,
      username: username,
      userID: socket.id,
    });
  });
  //private message
  socket.on("private-message", (data) => {
    socket.to(data.to).emit("private-message", {
      message: data.message,
      username: username,
      userID: socket.id,
    });
  });
});


  httpServer.listen(3000, () => {
    console.log("server started");
  });

