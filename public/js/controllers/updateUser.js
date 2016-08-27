angular.module('myControllers').controller('UpdateUserController', function ($filter, $routeParams, $window, roleService, userService) {

  var vm  = this;

  userService.getById($routeParams.id, function(response) {

    vm.user = response.data.data;

    vm.email = vm.user.email;

    roleService.getAll(function(response) {
      vm.roles = response.data.data;
      vm.filteredRoles = $filter('newRoles')(vm.roles, vm.user);
    }, function(response) {
      console.log(response);
    });

  }, function(response) {
    console.log(response);
  });

  vm.update = function(email, user) {
    userService.updateEmail(user.id, {
      'email': email
    }, function(response) {
      $window.location.href = 'amministrazione/utenti';
    }, function(response) {
      console.log(response);
    });
  };

  vm.attachRoles = function(roles, user) {
    angular.forEach(roles, function(role) {
      userService.attachRole(user.id, {
        'role_id': role.id
      }, function(response) {
        vm.user = response.data.data;
        vm.filteredRoles = $filter('newRoles')(vm.roles, vm.user);
      }, function(response) {
        console.log(response);
      })
    });
  };

  vm.detachRole = function(role, user) {
    userService.detachRole(user.id, {
      role_id: role.id
    }, function(response) {

      userService.getById(user.id, function(response) {
        vm.user = response.data.data;
        vm.filteredRoles = $filter('newRoles')(vm.roles, vm.user);
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
