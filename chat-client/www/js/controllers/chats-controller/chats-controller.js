'use strict';

(function(app){
  app.controller('ChatsController', function($scope, $rootScope, $log, ConfigProvider, User) {
    $scope.chats = [];
    
    for (var i = 1; i < 5; i++) {
      $scope.chats.push({
        id: i,
        image: 'http://ionicframework.com/img/docs/venkman.jpg',
        name: 'Venkman',
        lastMessage: 'Back off, man. I\'m a scientist.'
      });
    }
  });
})(window.bgChatControllersApp);
