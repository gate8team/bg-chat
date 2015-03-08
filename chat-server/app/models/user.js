Waterline = require('waterline')

var User = Waterline.Collection.extend({
  identity: 'user',
  connection: 'mysql',
  attributes: {
    firstName: 'string',
    lastName: 'string',
    roleId: 'integer'
  }
});

module.exports.User = User;
