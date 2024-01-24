

const socket = io();

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message')

socket.on("message", (message) => {
    const p = document.createElement("p");
    p.innerText = message;
    messageContainer.appendChild(p);
  });

  messageForm.addEventListener("click", (e) => {
    const message = messageInput.value;
    console.log(message);
    socket.emit("user-message", message);
  });