'use strict';

(function(app){
  app.controller('ChatsController', function($scope, $ionicLoading, $rootScope, $log, ConfigProvider, User) {
    $scope.chats = [];

//    $ionicLoading.show({
//      template: 'Loading...'
//    });
    
    for (var i = 1; i < 2; i++) {
      $scope.chats.push({
        id: i,
        image: 'http://ionicframework.com/img/docs/venkman.jpg',
        name: 'Venkman',
        lastMessage: 'Back off, man. I\'m a scientist.'
      });
    }
  });
})(window.bgChatControllersApp);
