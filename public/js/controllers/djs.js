angular.module("myControllers").controller("DjsController", function($location, djService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  djService.getAll(function(response) {
    vm.djs = response.data.data;
  }, function(response)  {
    console.log(response);
  });

  vm.redirect = function(path) {
    $location.path(path);
  };

  vm.isAuthenticated = function () {
    return userService.isAuthenticated();
  };

});
