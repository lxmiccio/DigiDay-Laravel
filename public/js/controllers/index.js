angular.module('myControllers').controller('IndexController', function ($location, $window, localStorageService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.isAdministrator = function () {
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

  vm.isAuthenticated = function () {
    return userService.isAuthenticated();
  };

  vm.logout = function() {
    userService.logout(function(response) {
      $window.location.href = '/';
    }, function(response) {
      console.log(response);
    });
  };

  vm.redirect = function(path) {
    $location.path(path);
  };

});
