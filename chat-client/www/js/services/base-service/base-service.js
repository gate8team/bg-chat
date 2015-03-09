'use strict';

(function(app){
  app.service('Base', function($http) {
    var Base = {};

    Base.sendRequest = function(endpoint, successCallback, errorCallback) {
      var promise = $http[endpoint.type](endpoint.path, endpoint.data || {});
      (successCallback != null) && (promise = promise.success(successCallback));
      (errorCallback != null) && (promise = promise.error(errorCallback));
      return promise;
    };

    return Base;
  });
})(window.bgChatServicesApp);
