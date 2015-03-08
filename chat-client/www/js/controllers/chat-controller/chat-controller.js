'use strict';

(function(app){
  app.controller('ChatController', function($scope, $ionicScrollDelegate, ConfigProvider, User, $stateParams) {
    $scope.params = $stateParams;
    $scope.title = 'My Chat #{id}'.replace('{id}', $scope.params.id);
    $scope.messages = [];
    $scope.message = {};
    $scope.counter = 0;
    
    var socket = io(ConfigProvider.server.url);
    
    socket.on('event:incoming:message', function(message){
      $scope.$apply(function(){
        $scope.messages.push(message);
      });
      
      $ionicScrollDelegate.scrollBottom(true);
    });
    
    $scope.sendMessage = function() {
      var message = _.clone($scope.message);
      socket.emit('event:new:message', $scope.message);
      
      message.fromMe = true;
      message.createdAt = new Date();
      
      $scope.messages.push(message);
      $ionicScrollDelegate.scrollBottom(true);
    };
  });
})(window.bgChatControllersApp);
