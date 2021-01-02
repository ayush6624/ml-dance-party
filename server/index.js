const http = require('http').createServer();

const io = require('socket.io')(http, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('video', (message) => {
    socket.broadcast.emit('video', message);
  });
});

http.listen(3030, () => console.log('listening on http://localhost:3030'));
