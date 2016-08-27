angular.module('myControllers').controller('CalendarController', function ($filter, calendarConfig, eventService, topicService) {

  var vm = this;

  vm.calendarView = 'month';
  vm.viewDate = new Date();

  eventService.getAll(function(response) {
    vm.events = response.data.data;

    angular.forEach(vm.events, function(event, index) {
      vm.events[index].title = event.name;
      vm.events[index].startsAt = new Date(event.startingDate);
      vm.events[index].endsAt = new Date(event.endingDate);
      vm.events[index].color = calendarConfig.colorTypes.info
    });

    vm.filteredEvents = angular.copy(vm.events);
  }, function(response) {
    console.log(response);
  });

  topicService.getAll(function(response) {
    vm.topics = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.onTopicClick = function(events, topics) {
    vm.filteredEvents = $filter('eventsOfTopics')(events, topics);
  };

});
