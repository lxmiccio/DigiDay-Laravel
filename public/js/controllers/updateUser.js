// Flawless

angular.module('myControllers').controller('UpdateUserController', function ($filter, $routeParams, $window, roleService, userService) {

  var vm  = this;

  userService.getById($routeParams.id, function(response) {
    vm.user = response.data.data;

    vm.fresher = vm.user.fresher;
    vm.firstName = vm.user.firstName;
    vm.lastName = vm.user.lastName;
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

  vm.update = function(fresher, email, firstName, lastName, user) {
    userService.update(user.id, {
      'fresher': fresher,
      'email': email,
      'first_name': firstName,
      'last_name': lastName
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
      vm.user = response.data.data;
      vm.filteredRoles = $filter('newRoles')(vm.roles, vm.user);
    }, function(response) {
      console.log(response);
    });
  };

});
