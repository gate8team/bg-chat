// Main server start file
var app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    database = require('./config/database.js').database,
    models = require('./app/models'),
    config = require('./config'),
    apiRoutes = require('./app/routes/api/v{apiVersion}'.replace('{apiVersion}', config.get('app:api:version')))(app);

// let's make our console pretty :)
require('./config/theme.js')();

// use it for cross requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// load up the api we need (api version can be defined in config/config.json)
app.use('/api/v{apiVersion}/'.replace('{apiVersion}', config.get('app:api:version')), apiRoutes);

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

  server.listen(config.get('app:port'), function () {
    console.log('Socket.io Running'.info);
  });
});

// To create users
//app.models.user.create({login: 'admin', password: '1234'}, function(err, user) {
//
//});
