// Flawless

angular.module('myControllers').controller('RecoverController', function($timeout, $window, authService) {

  var vm  = this;

  vm.showError = false;
  vm.error = "";

  vm.recover = function(fresher) {
    vm.showError = false;

    authService.recover({
      'fresher': fresher
    }, function(response) {
      $window.location.href = '';
    }, function(response) {
      vm.showError = true;
      vm.error = "Matricola inesistente";
      $timeout(function() {
        vm.showError = false;
      }, 60000);
    });
  };

});
