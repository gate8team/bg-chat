'use strict';

(function(app){
  app.controller('ChatsController', function($scope, $rootScope, $log, ConfigProvider, User) {
    $scope.chats = [];
    
    for (var i = 0; i < 100; i++) {
      $scope.chats.push({
        image: 'http://ionicframework.com/img/docs/venkman.jpg',
        name: 'Venkman',
        lastMessage: 'Back off, man. I\'m a scientist.'
      });
    }
  });
})(window.bgChatControllersApp);
