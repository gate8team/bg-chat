'use strict';

(function (app) {
  app.config(function ($provide) {
    $provide.factory('ApiEndpointsProvider', function (ConfigProvider) {
      return {
        messages: {
          all: {
            type: 'get',
            path: ConfigProvider.server.url + '/api/v1/messages/'
          }
        }
      };
    });
  });
})(window.bgChatServicesApp);
