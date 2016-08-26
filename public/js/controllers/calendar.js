angular.module("myControllers").controller("CalendarController", function ($filter, calendarConfig, eventService, topicService, userService) {

  var vm = this;

  vm.calendarView = 'month';
  vm.viewDate = new Date();

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

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

  vm.onEventClick = function(event) {
    console.log(event)
  };

});
