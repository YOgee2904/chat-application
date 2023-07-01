import { usersArray, socket } from "/contents/user.js";
let previousSender = "";
let showUserName = true;
//auto Expand function

export function autoExpand(element) {
  element.style.height = "50px";
  element.style.height = element.scrollHeight + "px";
}

// pdf or doc

export function pdfContainer(pdfSrc, fileName, user) {
  let container = document.querySelector(".chat-container");
  let div = document.createElement("div");
  let p = document.createElement("p");
  p.innerHTML = `${user}`;
  div.className = "list pdf";
  let a = document.createElement("a");
  let img = document.createElement("img");
  img.src = "https://img.icons8.com/color/48/000000/pdf--v1.png";
  img.className = "pdf-icon";
  div.appendChild(img);
  a.href = pdfSrc;
  a.target = "_blank";
  a.download = fileName;
  a.innerHTML = fileName;
  user === "me" ? div.classList.add("sent") : div.classList.add("received");
  div.appendChild(p);
  div.appendChild(a);
  container.appendChild(div);
  scrollToBottom();
}

//image container list

export function imgContainer(imgSrc, user) {
  let container = document.querySelector(".chat-container");
  let img = document.createElement("img");
  let p = document.createElement("p");
  p.innerHTML = `${user}`;
  img.src = imgSrc;
  let div = document.createElement("div");
  div.className = "list";
  user === "me" ? div.classList.add("sent") : div.classList.add("received");
  div.appendChild(p);
  div.appendChild(img);
  container.appendChild(div);
  scrollToBottom();
}

// scroll to bottom of chat box
export function scrollToBottom() {
  let container = document.querySelector(".chat-container");
  container.scrollTop = container.scrollHeight;
}

// userconnect and disconnect function
export function userDisplay(user, status) {
  let usersList = document.querySelector("#users-list");
  if (status === "connected") {
    let div = document.createElement("div");
    let username = document.createElement("div");
    let img = document.createElement("img");
    let p = document.createElement("p");
    img.className = "image childEl";
    img.src = "https://randomuser.me/api/portraits/med/men/75.jpg";
    div.className = `user-box`;
    div.id = user.userID;
    div.addEventListener("click", privateMessage);
    username.className = "username childEl";
    p.innerHTML = "12:40pm";
    p.className = "time childEl";
    username.innerHTML = `${user.username}`;
    div.appendChild(img);
    div.appendChild(username);
    div.appendChild(p);
    usersList.appendChild(div);
  } else {
    let div = document.getElementById(`${user.userID}`);
    div ? usersList.removeChild(div) : null;
  }
}

//async file read function
export function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

//creates message box

export function chatBox(msg, user) {
  let container = document.querySelector(".chat-container");
  let div = document.createElement("div");
  let p = document.createElement("p");
  div.className = "list";
  showUserName = previousSender !== user;
  if (user === "me") {
    div.classList.add("sent");
  } else if (user === "server") {
    div.classList.add("server");
  } else {
    div.classList.add("received");
  }
  p.innerHTML = `${user}`;
  div.innerText = msg;
  showUserName ? div.appendChild(p) : div.classList.add("old");

  container.appendChild(div);
  scrollToBottom();
  previousSender = user;
}

// private message function
async function privateMessage(e) {
  let el = e.target;
  if (e.target.matches(".childEl")) {
    el = e.target.parentElement;
  }
  if (el.classList.contains("active")) {
    return;
  }
  let allUsersBox = document.querySelectorAll(".user-box");
  allUsersBox.forEach((user) => {
    user.classList.remove("active");
  });
  el.classList.add("active");
  let div = document.querySelector(".chat-container");
  div.innerHTML = "";
  let headerUsername = document.querySelector("#message-box");
  let user = usersArray.filter((user) => user.userID === el.id);
  headerUsername.innerHTML = user[0].username;
}

export function privateMessageReceive(data, type) {
  let el = document.querySelector(`#${data.userID}`);
  let headerUsername = document.querySelector("#message-box");
  // if user isn't selected then create chat container and set header username
  if (!(el && el.classList.contains("active"))) {
    headerUsername.innerHTML = data.username;
    createChatContainer();
  }
  removeSelectedUser();
  el ? el.classList.add("active") : null;
  if (type === "file") {
    initiateFile(data.message, data.username);
    return;
  }
  chatBox(data.message, data.username);
}

function createChatContainer() {
  let container = document.querySelector(".chat-container");
  container.innerHTML = "";
}

function removeSelectedUser() {
  let el = document.querySelector(".active");
  el ? el.classList.remove("active") : null;
}

// file creation
export function initiateFile(message, username) {
  if (
    message.fileType === "image/jpeg" ||
    message.fileType === "image/png" ||
    message.fileType === "image/gif"
  ) {
    imgContainer(message.fileData, username);
  } else {
    pdfContainer(message.fileData, message.fileName, username);
  }
}
