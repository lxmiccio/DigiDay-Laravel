angular.module('myControllers').controller('ConfirmController', function ($routeParams, $window, authService) {

  var vm  = this;

  vm.confirm = function(password) {
    authService.confirm({
      'confirmation_token': $routeParams.confirmationToken,
      'password': password
    }, function(response) {
      $window.location.href = 'accedi';
    }, function(response) {
      console.log(response);
    });
  };

});
