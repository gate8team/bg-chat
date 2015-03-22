var Waterline = require('waterline'),
    mysqlAdapter = require('sails-mysql'),
    connections = require('./index.js').get('database:connections'),
    orm = new Waterline();

var config = {
  adapters: {
    'default': mysqlAdapter,
    mysql: mysqlAdapter
  },
  connections: connections,
  defaults: {
    migrate: 'alter'
  }
};

module.exports.database = {
  entity: orm,
  initialize: function(callback) {
    return orm.initialize(config, callback);
  }
};
