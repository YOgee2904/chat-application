import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import {
  chatBox,
  imgContainer,
  pdfContainer,
  userDisplay,
  autoExpand,
  privateMessageReceive,
  readFile,
  initiateFile,
} from "/contents/utility.js";
const socket = io("", {
  autoConnect: false,
  transports: ["websocket"],
});
socket.connect();
//fetch username
let username;
socket.on("username", (uname) => {
  username = uname;
});
//new user connected message
socket.on("user-connected", (user) => {
  usersArray = usersArray.filter((users) => users.username !== user.username);
  console.log(usersArray);
  usersArray.push(user);
  userDisplay(user, "connected");
  chatBox(`${user.username} connected`, "server");
});

//User disconnected Message
socket.on("user-disconnected", (userID) => {
  userDisplay({ userID: userID }, "left");
  chatBox(`${username} disconnected`, "server");
});

//send message to server
let messageBox = document.querySelector("#message");
messageBox.onkeypress = (event) => {
  let userBox = document.querySelector(".active");
  if (event.key === "Enter" && event.shiftKey) {
    e.preventDefault();
    insertLineBreak(textarea);
  }
  const message =messageBox.value.trim();
  if (event.key === "Enter") {
    event.preventDefault();
    if (message.length > 0) {
      chatBox(message, "me");
      if (userBox) {
        socket.emit("private-message", {
          message: message,
          to: userBox.id,
        });
      } else {
        socket.emit("message", { message: message });
      }
    }
    messageBox.value = "";
  }
};
//listen for reply
socket.on("message", ({ message, username }) => {
  chatBox(message, username);
});

//listen for file upload
socket.on("file-upload", ({ message, username }) => {
  initiateFile(message, username);
});
//send files
let fileInput = document.querySelector("#file");
fileInput.onchange = () => {
  let userBox = document.querySelector(".active");
  for (let file of fileInput.files) {
    readFile(file).then((fileData) => {
      const blob = new Blob([file], { type: file.type });
      const fileURL = URL.createObjectURL(blob);
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif"
      ) {
        imgContainer(fileURL, "me");
      } else {
        pdfContainer(fileURL, file.name, "me");
      }
      if (userBox) {
        socket.emit("private-file-upload", {
          message: {
            fileData: fileData,
            fileType: file.type,
            fileName: file.name,
          },
          to: userBox.id,
        });
      } else {
        socket.emit("file-upload", {
          message: {
            fileData: fileData,
            fileType: file.type,
            fileName: file.name,
          },
        });
      }
    });
  }
};
let usersArray = [];
//listen for  users

socket.on("users", (users) => {
  for (let user of users) {
    if (user.username !== username) {
      usersArray.push(user);
      userDisplay(user, "connected");
    }
  }
});

//auto expand text area
document.querySelector("#message").addEventListener("keyup", (e) => {
  autoExpand(e.target);
});

// private message receive
socket.on("private-message", (data) => {
  privateMessageReceive(data, "message");
});
//private file receive
socket.on("private-file-upload", (data) => {
  console.log(data.userID);
  privateMessageReceive(data, "file");
});
export { socket, usersArray };
