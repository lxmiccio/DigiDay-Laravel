// Flawless

angular.module('myControllers').controller('RecoverController', function ($window, authService) {

  var vm  = this;

  vm.recover = function(fresher) {
    authService.recover({
      'fresher': fresher
    }, function(response) {
      $window.location.href = '';
    }, function(response) {
      console.log(response);
    });
  };

});
