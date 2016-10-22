// Flawless

angular.module('myControllers').controller('SignupController', function($window, authService, roleService, userService) {

  var vm = this;

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

  vm.signup = function(fresher, firstName, lastName, email, role) {
    authService.signup({
      'fresher': fresher,
      'first_name': firstName,
      'last_name': lastName,
      'email': email,
      'role_id': role[0].id
    }, function(response) {
      
      userService.attachRole(response.data.data.id, {
        'role_id': role[0].id
      }, function(response) {
        $window.location.href = '';
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
