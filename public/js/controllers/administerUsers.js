// Flawless

angular.module('myControllers').controller('AdministerUsersController', function($q, $window, roleService, userService) {

  var vm = this;

  roleService.getAll(function(response) {
    vm.roles = response.data.data;
  }, function(response) {
    console.log(response);
  });

  userService.getAll(function(response) {
    vm.users = response.data.data;

    angular.forEach(vm.users, function(user, index) {
      vm.users[index].writtenRoles = '';
      angular.forEach(user.roles, function(role) {
        vm.users[index].writtenRoles += role.name + ', ';
      });
      vm.users[index].writtenRoles = vm.users[index].writtenRoles.slice(0, -2);
    });
  }, function(response) {
    console.log(response);
  });

  vm.create = function(fresher, firstName, lastName, email, selectedRoles) {
    userService.create({
      'fresher': fresher,
      'first_name': firstName,
      'last_name': lastName,
      'email': email
    }, function(response) {
      var promises = [];

      angular.forEach(selectedRoles, function(role) {
        var deferred = $q.defer();

        userService.attachRole(response.data.data.id, {
          'role_id': role.id
        }, function(response) {
          deferred.resolve(response);
        }, function(response) {
          console.log(response);
        });

        promises.push(deferred.promise);
      });

      $q.all(promises).then(function(responses) {
        $window.location.href = 'amministrazione/utenti';
      }, function(response) {
        console.log(response);
      });
    }, function(response) {
      console.log(response);
    });
  };

  vm.enable = function(user) {
    userService.enable(user.id, {}, function(response) {

      response.data.data.writtenRoles = '';
      angular.forEach(response.data.data.roles, function(role) {
        response.data.data.writtenRoles += role.name + ', ';
      });
      response.data.data.writtenRoles = response.data.data.writtenRoles.slice(0, -2);

      vm.users[vm.users.indexOf(user)] = response.data.data;

    }, function(response) {
      console.log(response);
    });
  };

  vm.disable = function(user) {
    userService.disable(user.id, {}, function(response) {

      response.data.data.writtenRoles = '';
      angular.forEach(response.data.data.roles, function(role) {
        response.data.data.writtenRoles += role.name + ', ';
      });
      response.data.data.writtenRoles = response.data.data.writtenRoles.slice(0, -2);

      vm.users[vm.users.indexOf(user)] = response.data.data;

    }, function(response) {
      console.log(response);
    });
  };

});
