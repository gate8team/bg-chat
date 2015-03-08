// Main server start file
var app = require('express')(),
  server = require('http').Server(app),
  io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('event:new:message', function (data) {
    console.log(data);
    socket.broadcast.emit('event:incoming:message', data);
  });
});

server.listen(8000, function () {
  console.log('Socket.io Running');
});
