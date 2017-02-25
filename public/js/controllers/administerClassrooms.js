// Flawless

angular.module('myControllers').controller('AdministerClassroomsController', function($window, authService, classroomService) {

  authService.isAdministrator(function() {
    $window.location.href = '/';
  });

  var vm  = this;

  classroomService.getAll(function(response) {
    vm.classrooms = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.onCapacityChange = function(capacity) {
    if(!Number.isInteger(capacity) || capacity < 0) {
      vm.capacity = 0;
    }
  };

  vm.create = function(name, capacity, description) {
    classroomService.create({
      'name': name,
      'capacity': capacity,
      'description': description
    }, function(response) {

      vm.name = null;
      vm.capacity = null;
      vm.description = null;

      vm.classrooms.push(response.data.data);

    }, function(response) {
      console.log(response);
    });
  };

  vm.enable = function(classroom) {
    classroomService.enable(classroom.id, {}, function(response) {
      vm.classrooms[vm.classrooms.indexOf(classroom)] = response.data.data;
    }, function(response) {
      console.log(response);
    });
  };

  vm.disable = function(classroom) {
    classroomService.disable(classroom.id, {}, function(response) {
      vm.classrooms[vm.classrooms.indexOf(classroom)] = response.data.data;
    }, function(response) {
      console.log(response);
    });
  };

});
