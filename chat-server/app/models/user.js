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
    roleId: 'integer',
    // check if user is admin
    isAdmin: function() {
      return this.roleId == 1;
    },
    // check if user is client
    isClient: function() {
      return this.roleId == 0;
    },
    // check if user is consultant
    isConsultant: function() {
      return this.roleId == 2;
    }
  },
  // lets hash the password and check if we need to set default role
  beforeCreate: function(values, cb) {
    (values.roleId == null) && (values.roleId = 0);
    values.password = passwordHash.generate(values.password);
    cb();
  }
});

module.exports = User;
