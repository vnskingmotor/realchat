const io = require("socket.io")(3000);
const users = {};
io.on("connection", (socket) => {
  // console.log(`${name} connected`)
  // socket.emit('chat-message', 'Hello VnsKing')
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
    console.log(`${name} connected`);
  });
  socket.on("send-chat-message", (message) => {
    // console.log(message);
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    console.log(`${users[socket.id]} disconnected`);
    delete users[socket.id];
  });
});
