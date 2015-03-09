'use strict';

(function (app) {
  app.config(function ($provide) {
    $provide.factory('ConfigProvider', function () {
      return {
        server: {
          url: 'http://localhost:8000'
        }
      };
    });
  });
})(window.bgChatServicesApp);
