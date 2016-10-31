// Flawless

angular.module('myControllers').controller('CalendarController', function($filter, calendarConfig, authService, eventService, topicService) {

  var vm = this;

  vm.calendarView = 'month';
  vm.viewDate = new Date();

  if(authService.isAuthenticated()) {
    authService.me(function(response) {
      vm.user = response.data.data;

      eventService.getAll(function(response) {
        vm.events = response.data.data;

        angular.forEach(vm.events, function(event, index) {
          vm.events[index].title = event.name;
          vm.events[index].startsAt = new Date(event.startingDate);
          vm.events[index].endsAt = new Date(event.endingDate);

          if(event.user.id == vm.user.id) {
            vm.events[index].color = calendarConfig.colorTypes.important;
          } else {
            var partecipate = false;

            angular.forEach(event.users, function(partecipant) {
              if(partecipant.id == vm.user.id) {
                partecipate = true;
              }
            });

            if(partecipate) {
              vm.events[index].color = calendarConfig.colorTypes.success;
            } else if(event.users.length == event.maximumPartecipants) {
              vm.events[index].color = calendarConfig.colorTypes.inverse;
            } else {
              vm.events[index].color = calendarConfig.colorTypes.info;
            }
          }
        });

        vm.filteredEvents = angular.copy(vm.events);
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  } else {
    eventService.getAll(function(response) {
      vm.events = response.data.data;

      angular.forEach(vm.events, function(event, index) {
        vm.events[index].title = event.name;
        vm.events[index].startsAt = new Date(event.startingDate);
        vm.events[index].endsAt = new Date(event.endingDate);

        if(event.users.length == event.maximumPartecipants) {
          vm.events[index].color = calendarConfig.colorTypes.inverse;
        } else {
          vm.events[index].color = calendarConfig.colorTypes.info;
        }
      });

      vm.filteredEvents = angular.copy(vm.events);
    }, function(response) {
      console.log(response);
    });
  }

  topicService.getAll(function(response) {
    vm.topics = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.onTopicClick = function(events, topics) {
    vm.filteredEvents = $filter('eventsOfTopics')(events, topics);
  };

});
