// Flawless

angular.module('myControllers').controller('AdministerEventsController', function ($filter, eventService) {

  var vm  = this;

  eventService.getAll(function(response) {
    vm.events = response.data.data;

    angular.forEach(vm.events, function(event, index) {
      vm.events[index].writtenItems = '';
      angular.forEach(event.items, function(item) {
        vm.events[index].writtenItems += item.name + '(' + item.required + '), ';
      });
      vm.events[index].writtenItems = vm.events[index].writtenItems.slice(0, -2);
    });

    vm.filteredEvents = $filter('newEvents')(vm.events);
  }, function(response) {
    console.log(response);
  });

  vm.remove = function(event) {
    eventService.remove(event.id, function(response) {

      eventService.getAll(function(response) {
        vm.events = response.data.data;

        angular.forEach(vm.events, function(event, index) {
          vm.events[index].writtenItems = '';
          angular.forEach(event.items, function(item) {
            vm.events[index].writtenItems += item.name + '(' + item.required + '), ';
          });
          vm.events[index].writtenItems = vm.events[index].writtenItems.slice(0, -2);
        });

        vm.filteredEvents = $filter('newEvents')(vm.events);
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
