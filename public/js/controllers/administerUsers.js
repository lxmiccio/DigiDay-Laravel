// Flawless

angular.module('myControllers').controller('AdministerUsersController', function ($q, $window, roleService, userService) {

  var vm = this;

  userService.getAll(function(response) {
    vm.users = response.data.data;

    angular.forEach(vm.users, function(user, index) {
      var writtenRoles = '';
      angular.forEach(user.roles, function(role) {
        writtenRoles += role.name + ', ';
      });
      vm.users[index].writtenRoles = writtenRoles.slice(0, -2);
    });
  }, function(response) {
    console.log(response);
  });

  roleService.getAll(function(response) {
    vm.roles = response.data.data;
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

  vm.remove = function(user) {
    userService.remove(user.id, function(response) {

      userService.getAll(function(response) {
        vm.users = response.data.data;

        angular.forEach(vm.users, function(user, index) {
          var writtenRoles = '';
          angular.forEach(user.roles, function(role) {
            writtenRoles += role.name + ', ';
          });
          vm.users[index].writtenRoles = writtenRoles.slice(0, -2);
        });
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
