'use strict';

(function(app, _){
  app.service('ChatMessage', function($http, $q, ConfigProvider, ApiEndpointsProvider, Base) {
    var ChatMessage = _.extend({}, Base);

    ChatMessage.loadMessages = function(successCallback, errorCallback) {
      this.sendRequest(ApiEndpointsProvider.messages.all, successCallback, errorCallback);
    };

    return ChatMessage;
  });
})(window.bgChatServicesApp, _);
