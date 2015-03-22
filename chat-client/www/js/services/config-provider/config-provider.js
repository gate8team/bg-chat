'use strict';

(function (app) {
  app.config(function ($provide) {
    $provide.factory('ConfigProvider', function () {
      return {
        server: {
          url: 'http://localhost:1337'
        }
      };
    });
  });
})(window.bgChatServicesApp);
