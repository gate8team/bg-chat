'use strict';

(function(app){
  app.controller('ChatController', function($scope, $ionicScrollDelegate, ConfigProvider, User, $stateParams) {
    $scope.params = $stateParams;
    $scope.title = 'My Chat #{id}'.replace('{id}', $scope.params.id);
    $scope.messages = [];
    $scope.message = {};
    $scope.counter = 0;
    
    var socket = io(ConfigProvider.server.url);
    socket.on('event:incoming:message',function(data){
      $scope.$apply(function(){
        $scope.messages.push(data);
      });
      $ionicScrollDelegate.scrollBottom(true);
    });
    
    $scope.sendMessage = function() {
      var message = _.clone($scope.message);
      message.id = $scope.counter++;
      message.image = 'http://ionicframework.com/img/docs/venkman.jpg';
      message.name = 'Anton';
      socket.emit('event:new:message', message);
      message.fromMe = true;
      $scope.messages.push(message);
      $ionicScrollDelegate.scrollBottom(true);
    };
  });
})(window.bgChatControllersApp);
