'use strict';

var express = require('express'),
  router = express.Router();

var defineRoutes = function(currentApp) {
  // load up messages api
  router.use('/messages', require('./messages')(currentApp));
};

module.exports = function(currentApp) {
  defineRoutes(currentApp);
  return router;
};
