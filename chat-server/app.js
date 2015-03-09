// Main server start file
var app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    database = require('./config/database.js').database,
    models = require('./app/models/index.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/messages/', function(req, res) {
  app.models.chat_message.find().exec(function(err, chatMessages) {
    if (err) return res.json({});
    return res.json(chatMessages);
  });
});

// Load up all models
for (var modelName in models) {
  database.entity.loadCollection(models[modelName]);
}

// Init the db connection
database.initialize(function(err, models) {
  if (err) throw err;
  
  app.models = models.collections;
  app.connections = models.connections;

  io.on('connection', function (socket) {
    socket.on('event:new:message', function (data) {
      // when new message comes, lets create a new record..
      app.models.chat_message.create(data, function(err, message) {
        if (err == null) {
          socket.broadcast.emit('event:incoming:message', message);
        } else {
          console.log(err);
        }
      });
    });
  });

  server.listen(8000, function () {
    console.log('Socket.io Running');
  });
});
