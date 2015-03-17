var Waterline = require('waterline'),
    Crypto = require('crypto');

var ChatMessage = Waterline.Collection.extend({
  identity: 'chat_message',
  connection: 'mysql',
  attributes: {
    content: {
      type: 'string',
      maxLength: 65535
    },
    subject: {
      type: 'string',
      maxLength: 65535
    },
    token: {
      type: 'string',
      maxLength: 65535
    },
    // before create
    beforeCreate: function(values, cb) {
      Crypto.randomBytes(48, function(ex, buf) {
        values.token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
      });
    }
  }
});

module.exports = ChatMessage;
