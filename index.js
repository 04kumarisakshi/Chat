const http = require("http");
const express =require("express");
const path =require("path");
const app =express();
const {Server} =require ("socket.io");
const server = http.createServer(app);
const io = new Server(server);

//Socket.io connect to frontend
// io.on("connection", (socket) => {
//   socket.on("user-message", (message) => {
//     io.emit("message", message);
//   });
// });
// app.use(express.static(path.resolve("./public")));

// app.get("/", (req, res) => {
//   return res.sendFile("p/public/index.html");
// });


const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})


server.listen(9000, () => console.log(`Server Started at PORT:9000`));