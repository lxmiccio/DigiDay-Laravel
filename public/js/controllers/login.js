angular.module("myControllers").controller("LoginController", function ($window, userService) {

  var vm  = this;

  vm.login = function(fresher, password) {
    userService.login({
      fresher: fresher,
      password: password
    }, function(response) {
      $window.location.href = '/';
    }, function(response) {
      console.log(response);
    });
  };

});
