// Flawless

angular.module('myControllers').controller('UpdateClassRoomController', function ($routeParams, $window, classroomService) {

  var vm  = this;

  classroomService.getById($routeParams.id, function(response) {
    vm.classroom = response.data.data;

    vm.name = vm.classroom.name;
    vm.maximumPartecipants = vm.classroom.maximumPartecipants;
    vm.description = vm.classroom.description;
  }, function(response) {
    console.log(response);
  });

  vm.update = function(name, maximumPartecipants, description, classroom) {
    classroomService.update(classroom.id, {
      'name': name,
      'maximum_partecipants': maximumPartecipants,
      'description': description
    }, function(response) {
      $window.location.href = 'amministrazione/classi';
    }, function(response) {
      console.log(response);
    });
  };

});
