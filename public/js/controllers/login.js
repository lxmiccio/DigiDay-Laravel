angular.module('myControllers').controller('LoginController', function ($window, authService) {

  var vm  = this;

  vm.login = function(fresher, password) {
    authService.login({
      fresher: fresher,
      password: password
    }, function(response) {
      $window.location.href = '/';
    }, function(response) {
      console.log(response);
    });
  };

});
