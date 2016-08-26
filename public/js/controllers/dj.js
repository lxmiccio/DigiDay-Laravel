angular.module("myControllers").controller("DjController", function ($location, $routeParams, djService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  djService.getById($routeParams.id, function(response) {
    vm.dj = response.data.data;
  }, function(response)  {
    console.log(response);
  });

  vm.redirect = function(path) {
    $location.path(path);
  };

});
