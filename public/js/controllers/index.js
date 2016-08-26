angular.module("myControllers").controller("IndexController", function ($http, $window, localStorageService, counterService, socket, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  counterService.increase(1, function(response) {

  }, function(response) {
    console.log(response);
  });

  socket.on('counter.increase', function(counter) {
    vm.counter = angular.fromJson(counter).counter;
  });

  vm.increaseCounter = function(visitors) {
    counterService.update(1, {
      visitors: visitors
    },function(response) {
      vm.counter = response.data.data;
    }, function(response) {
      console.log(response)
    });
  };

  socket.on('counter.update', function(counter) {
    vm.counter = angular.fromJson(counter).counter;
  });

  vm.isAuthenticated = function () {
    return userService.isAuthenticated();
  };

  vm.logout = function() {
    userService.logout(function(response) {
      $window.location.reload();
    }, function(response) {
      console.log(response);
    });
  };

});
