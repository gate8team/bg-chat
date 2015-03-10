var Waterline = require('waterline'),
    passwordHash = require('password-hash');

var User = Waterline.Collection.extend({
  identity: 'user',
  connection: 'mysql',
  attributes: {
    password: 'string',
    login: {
      type: 'string',
      unique: true
    },
    roleId: 'integer'
  },
  // lets hash the password and check if we need to set default role
  beforeCreate: function(values, cb) {
    (values.roleId == null) && (values.roleId = 0);
    values.password = passwordHash.generate(values.password);
    cb();
  }
});

module.exports = User;
