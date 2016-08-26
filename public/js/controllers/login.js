angular.module("myControllers").controller("LoginController", function ($rootScope, $window, userService) {

  var vm  = this;

  vm.login = function(username, password) {
    userService.login({
      username: username,
      password: password
    }, function(response) {
      $window.location.href = $rootScope.previous;
    }, function(response) {
      console.log(response);
    });
  };

  vm.isAuthenticated = function () {
    return userService.isAuthenticated();
  };

});
