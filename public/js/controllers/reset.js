// Flawless

angular.module('myControllers').controller('ResetController', function($routeParams, $timeout, $window, authService) {

  var vm  = this;

  vm.showError = false;
  vm.error = "";

  vm.reset = function(fresher, password, passwordConfirmation) {
    vm.showError = false;

    authService.reset({
      'token': $routeParams.token,
      'fresher': fresher,
      'password': password,
      'password_confirmation': passwordConfirmation
    }, function(response) {
      $window.location.href = 'accedi';
    }, function(response) {
      vm.showError = true;
      vm.error = "Matricola inesistente???";
      $timeout(function() {
        vm.showError = false;
      }, 60000);
    });
  };

});
