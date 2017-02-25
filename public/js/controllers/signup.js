// Flawless

angular.module('myControllers').controller('SignupController', function($timeout, $window, authService, roleService, userService) {

  if(authService.isAuthenticated()) {
    $window.location.href = '/';
  }

  var vm = this;

  vm.showError = false;
  vm.error = "";

  roleService.getAll(function(response) {
    vm.roles = [];

    angular.forEach(response.data.data, function(role, index) {
      if(role.name != 'Amministratore') {
        vm.roles.push(role);
      }
    });
  }, function(response) {
    console.log(response);
  });

  vm.signup = function(fresher, email, firstName, lastName, selectedRole) {
    authService.signup({
      'fresher': fresher,
      'email': email,
      'first_name': firstName,
      'last_name': lastName
    }, function(response) {
      userService.attachRole(response.data.data.id, {
        'role_id': selectedRole[0].id
      }, function(response) {
        $window.location.href = '';
      }, function(response) {
        console.log(response);
      });
    }, function(response) {
      vm.showError = true;
      vm.error = response.data.message;
      $timeout(function() {
        vm.showError = false;
      }, 30000);
    });
  };

});
