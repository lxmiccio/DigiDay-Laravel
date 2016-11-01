// Flawless

angular.module('myControllers').controller('IndexController', function($location, $window, localStorageService, authService) {

  var vm  = this;

  vm.showAuthenticationMessages = false;

  authService.me(function(response) {
    vm.user = response.data.data;
    vm.showAuthenticationMessages = true;
  }, function(response) {
    vm.showAuthenticationMessages = true;
  });

  vm.isAdministrator = function() {
    if(vm.user) {
      var administrator = false;
      angular.forEach(vm.user.roles, function(role) {
        if(role.name == 'Amministratore') {
          administrator = true;
        }
      });
      return administrator;
    }
    else {
      return false;
    }
  };

  vm.isAuthenticated = function() {
    return authService.isAuthenticated();
  };

  vm.logout = function() {
    authService.logout(function(response) {
      $window.location.href = '/';
    }, function(response) {
      console.log(response);
    });
  };

  vm.locate = function(path) {
    $location.path(path);
  };

  vm.redirect = function(path) {
    $window.location.href = path;
  };

});
