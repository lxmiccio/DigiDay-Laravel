// Flawless

angular.module('myControllers').controller('ProfileController', function($routeParams, userService) {

  var vm  = this;

  userService.getById($routeParams.id, function(response) {
    vm.user = response.data.data;

    vm.user.writtenRoles = '';
    angular.forEach(vm.user.roles, function(role) {
      vm.user.writtenRoles += role.name + ', ';
    });
    vm.user.writtenRoles = vm.user.writtenRoles.slice(0, -2);
  }, function(response) {
    console.log(response);
  });

});
