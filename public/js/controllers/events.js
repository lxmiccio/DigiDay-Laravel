// Flawless

angular.module('myControllers').controller('EventsController', function($filter, authService, eventService) {

  var vm = this;

  authService.me(function(response) {
    vm.user = response.data.data;

    vm.myEvents = [];
    vm.subscribedEvents = [];
    vm.otherEvents = [];

    eventService.getAll(function(response) {
      angular.forEach($filter('newEvents')(response.data.data), function(event) {
        event.date = $filter('date')(new Date(event.startingDate), 'dd/MM/yyyy');

        var hours;
        var minutes;
        if(new Date(event.startingDate).getMinutes() > new Date(event.endingDate).getMinutes()) {
          hours = new Date(event.endingDate).getHours() - new Date(event.startingDate).getHours() - 1;
          minutes = 60 - new Date(event.startingDate).getMinutes() + new Date(event.endingDate).getMinutes();
        } else if(new Date(event.startingDate).getMinutes() < new Date(event.endingDate).getMinutes()) {
          hours = new Date(event.endingDate).getHours() - new Date(event.startingDate).getHours();
          minutes = new Date(event.endingDate).getMinutes() - new Date(event.startingDate).getMinutes();
        } else {
          hours = new Date(event.endingDate).getHours() - new Date(event.startingDate).getHours();
          minutes = 0;
        }
        event.duration = hours + 'h, ' + minutes + 'm';

        var added = false;

        if(event.user.id == vm.user.id) {
          vm.myEvents.push(event);
          added = true;
        } else if(angular.isArray(event.users) && event.users.length > 0) {
          angular.forEach(event.users, function(user) {
            if(user.id == vm.user.id) {
              vm.subscribedEvents.push(event);
              added = true;
            }
          });
        }

        if(!added) {
          vm.otherEvents.push(event);
        }
      });
    }, function(response) {
      console.log(response);
    });

  }, function(response) {
    eventService.getAll(function(response) {
      vm.otherEvents = [];

      angular.forEach($filter('newEvents')(response.data.data), function(event) {
        event.date = $filter('date')(new Date(event.startingDate), 'dd/MM/yyyy');

        var hours;
        var minutes;
        if(new Date(event.startingDate).getMinutes() > new Date(event.endingDate).getMinutes()) {
          hours = new Date(event.endingDate).getHours() - new Date(event.startingDate).getHours() - 1;
          minutes = 60 - new Date(event.startingDate).getMinutes() + new Date(event.endingDate).getMinutes();
        } else if(new Date(event.startingDate).getMinutes() < new Date(event.endingDate).getMinutes()) {
          hours = new Date(event.endingDate).getHours() - new Date(event.startingDate).getHours();
          minutes = new Date(event.endingDate).getMinutes() - new Date(event.startingDate).getMinutes();
        } else {
          hours = new Date(event.endingDate).getHours() - new Date(event.startingDate).getHours();
          minutes = 0;
        }
        event.duration = hours + 'h, ' + minutes + 'm';

        vm.otherEvents.push(event);
      });
    }, function(response) {
      console.log(response);
    });
  });
});
