// Flawless

angular.module('myControllers').controller('LoginController', function ($rootScope, $window, authService) {

  var vm  = this;

  vm.login = function(fresher, password) {
    authService.login({
      fresher: fresher,
      password: password
    }, function(response) {
      $window.location.href = $rootScope.previous;
    }, function(response) {
      console.log(response);
    });
  };

});
