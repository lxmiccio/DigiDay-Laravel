angular.module('myControllers').controller('SignupController', function ($filter, $location, $routeParams, eventService, imageService, roleService, userService) {

  var vm = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

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

  vm.onBirthdateChange = function(birthdate) {
    vm.birthdate = $filter('date')(birthdate, 'yyyy-MM-dd');
  };

  vm.removeImage = function() {
    vm.image = null;
  };

  vm.changeImage = function(image) {
    if(image) {
      vm.image = image;
    }
  };

  vm.signup = function(fresher, firstName, lastName, email, password, birthdate, sex, role, image) {
    if(image) {
      userService.signup({
        'fresher': fresher,
        'first_name': firstName,
        'last_name': lastName,
        'email': email,
        'password': password,
        'birthdate': birthdate,
        'sex': sex,
      }, function(response) {

        var id = response.data.data.id;

        imageService.upload({
          'image': image,
          'directory': 'users',
          'filename': id
        }, function(response) {

          userService.update(id, {
            'fresher': fresher,
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'password': password,
            'birthdate': birthdate,
            'sex': sex,
            'image': response.data.image
          }, function(response) {

            userService.attachRole(response.data.data.id, {
              'role_id': role[0].id
            }, function(response) {
              $location.path('/');
            }, function(response) {
              console.log(response);
            });

          }, function(response) {
            console.log(response);
          });

        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
    else {
      userService.signup({
        'fresher': fresher,
        'first_name': firstName,
        'last_name': lastName,
        'email': email,
        'password': password,
        'birthdate': birthdate,
        'sex': sex
      }, function(response) {

        userService.attachRole(response.data.data.id, {
          'role_id': role.originalObject.id
        }, function(response) {
          $location.path('/');
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
  };

});
