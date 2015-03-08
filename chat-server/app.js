// Main server start file
var app = require('express')(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  database = require('./config/database.js').database,
  Waterline = require('waterline'),
  models = require('./app/models/index.js');

database.entity.loadCollection(models.user.User);

database.initialize(function(err, models) {
  if(err) throw err;

  server.models = models.collections;
  server.connections = models.connections;

  io.on('connection', function (socket) {
    socket.on('event:new:message', function (data) {
      console.log(data);
      socket.broadcast.emit('event:incoming:message', data);
    });
  });

  server.listen(8000, function () {
    console.log('Socket.io Running');
  });
});
