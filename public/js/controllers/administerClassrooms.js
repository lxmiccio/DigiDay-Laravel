// Flawless

angular.module('myControllers').controller('AdministerClassroomsController', function (classroomService) {

  var vm  = this;

  classroomService.getAll(function(response) {
    vm.classrooms = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.onMaximumPartecipantsChange = function(maximumPartecipants) {
    if(!Number.isInteger(maximumPartecipants) || maximumPartecipants < 0) {
      vm.maximumPartecipants = 0;
    }
  };

  vm.create = function(name, maximumPartecipants, description) {
    classroomService.create({
      'name': name,
      'maximum_partecipants': maximumPartecipants,
      'description': description
    }, function(response) {

      vm.name = null;
      vm.maximumPartecipants = null;
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
