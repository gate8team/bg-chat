var path = require('path');

require('fs').readdirSync(__dirname).forEach(function (file) {
  if (file === 'index.js') return;
  
  var innerModule = require(path.join(__dirname, file));
  
  module.exports[path.basename(file, '.js')] = require(path.join(__dirname, file));
});
