// Flawless

angular.module('myControllers').controller('ResetController', function($routeParams, $window, authService) {

  var vm  = this;

  vm.reset = function(fresher, password, passwordConfirmation) {
    authService.reset({
      'token': $routeParams.token,
      'fresher': fresher,
      'password': password,
      'password_confirmation': passwordConfirmation
    }, function(response) {
      $window.location.href = 'accedi';
    }, function(response) {
      console.log(response);
    });
  };

});
