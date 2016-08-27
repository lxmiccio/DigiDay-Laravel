angular.module('myControllers').controller('administerClassroomsController', function (classroomService) {

  var vm  = this;

  classroomService.getAll(function(response) {
    vm.classrooms = response.data.data;
  }, function(response) {
    console.log(response);
  });

});
