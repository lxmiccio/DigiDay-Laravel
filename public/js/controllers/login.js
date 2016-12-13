// Flawless

angular.module('myControllers').controller('LoginController', function($rootScope, $timeout, $window, authService) {

  var vm  = this;

  vm.showError = false;
  vm.error = "";

  vm.login = function(fresher, password) {
    vm.showError = false;

    authService.login({
      fresher: fresher,
      password: password
    }, function(response) {
      $window.location.href = $rootScope.previous;
    }, function(response) {
      vm.showError = true;
      vm.error = "Credenziali errate";
      $timeout(function() {
        vm.showError = false;
      }, 60000);
    });
  };

});
