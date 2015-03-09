'use strict';

(function(app){
  app.controller('ChatController', function($scope, $ionicScrollDelegate, $ionicLoading, ConfigProvider, User, ChatMessage, $stateParams) {
    $scope.params = $stateParams;
    $scope.title = 'My Chat #{id}'.replace('{id}', $scope.params.id);
    $scope.messages = [];
    $scope.message = {};

    $ionicLoading.show({
      template: '<ion-spinner icon="lines"></ion-spinner>'
    });
    
    ChatMessage.loadMessages(function(data) {
      $scope.messages = data;
      $ionicLoading.hide();
      $ionicScrollDelegate.scrollBottom(true);
    });
    
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
      
      $scope.message.content = '';
      $ionicScrollDelegate.scrollBottom(true);
    };
  });
})(window.bgChatControllersApp);
