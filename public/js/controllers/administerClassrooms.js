// Flawless

angular.module('myControllers').controller('AdministerClassroomsController', function (classroomService) {

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
      'maximum_partecipants': capacity,
      'description': description
    }, function(response) {

      vm.name = null;
      vm.capacity = null;
      vm.description = null;

      classroomService.getAll(function(response) {
        vm.classrooms = response.data.data;
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

  vm.remove = function(classroom) {
    classroomService.remove(classroom.id, function(response) {

      classroomService.getAll(function(response) {
        vm.classrooms = response.data.data;
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
