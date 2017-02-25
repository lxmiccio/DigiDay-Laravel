// Flawless

angular.module('myControllers').controller('UpdateClassRoomController', function($routeParams, $window, authService, classroomService) {

  authService.isAdministrator(function() {
    $window.location.href = '/';
  });

  var vm  = this;

  classroomService.getById($routeParams.id, function(response) {
    vm.classroom = response.data.data;

    vm.name = vm.classroom.name;
    vm.capacity = vm.classroom.capacity;
    vm.description = vm.classroom.description;
  }, function(response) {
    console.log(response);
  });

  vm.update = function(name, capacity, description, classroom) {
    classroomService.update(classroom.id, {
      'name': name,
      'capacity': capacity,
      'description': description
    }, function(response) {
      $window.location.href = 'amministrazione/classi';
    }, function(response) {
      console.log(response);
    });
  };

});
