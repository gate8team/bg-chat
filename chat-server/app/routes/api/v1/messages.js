'use strict';

var express = require('express'),
    router = express.Router(),
    app = null,
    consoleTheme = require('../../../../config/theme.js')();

router.get('/', function(req, res, next) {
  app.models.chat_message.find().exec(function(err, chatMessages) {
    if (err) return res.json({});
    return res.json(chatMessages);
  });
});

module.exports = function(currentApp) {
  console.info('[INFO]: Message API is loaded up..'.info);
  app = currentApp;
  return router;
};
