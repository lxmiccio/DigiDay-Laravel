// Flawless

angular.module('myControllers').controller('EventsController', function($filter, authService, eventService) {

  var vm = this;

  vm.myEvents = [];
  vm.subscribedEvents = [];
  vm.otherEvents = [];

  authService.me(function(response) {
    vm.user = response.data.data;

    eventService.getAll(function(response) {
      $filter('newRoles')(vm.roles, vm.user);

      angular.forEach($filter('newEvents')(response.data.data), function(event) {
        var added = false;

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
      angular.forEach(response.data.data, function(event) {
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
