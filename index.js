const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors());

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join', (data) => {
    socket.join(data.roomId);
    socket.broadcast.to(data.roomId).emit('user-connected', data.userId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});

