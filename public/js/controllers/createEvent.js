angular.module('myControllers').controller('CreateEventController', function ($filter, classroomService, eventService, itemService, topicService) {

  var vm  = this;

  classroomService.getAll(function(response) {
    vm.classrooms = response.data.data;
  }, function(response) {
    console.log(response);
  });

  itemService.getAll(function(response) {
    vm.items = response.data.data;
  }, function(response) {
    console.log(response);
  });

  topicService.getAll(function(response) {
    vm.topics = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.onStartingDateChange = function(startingDate) {
    if(startingDate >= new Date()) {
      vm.startingDate = $filter('date')(startingDate, 'yyyy-MM-dd HH:mm:ss');
    } else {
      vm.startingDate = '';
    }
    vm.endingDate = '';
  };

  vm.onEndingDateChange = function(endingDate, startingDate, classrooms, items) {
    if(endingDate > new Date(startingDate)) {
      vm.endingDate = $filter('date')(endingDate, 'yyyy-MM-dd HH:mm:ss');
    } else {
      vm.endingDate = '';
    }
    vm.filteredClassrooms = $filter('availableClassrooms')(classrooms, startingDate, endingDate);
    vm.filteredItems = $filter('availableItems')(items, startingDate, endingDate);
  };

  vm.onMaximumPartecipantsChange = function(maximumPartecipants) {
    if(!Number.isInteger(maximumPartecipants) || maximumPartecipants < 0) {
      vm.maximumPartecipants = 0;
    }
  };

});
