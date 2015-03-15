Waterline = require('waterline')

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
    }
  }
});

module.exports = ChatMessage;
