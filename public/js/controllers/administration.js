// Flawless

angular.module('myControllers').controller('AdministrationController', function($window, authService) {

  authService.isAdministrator(function() {
    $window.location.href = '/';
  });
  
});
