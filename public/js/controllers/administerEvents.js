// Flawless

angular.module('myControllers').controller('AdministerEventsController', function($filter, eventService) {

  var vm  = this;

  eventService.getAll(function(response) {
    vm.events = response.data.data;

    angular.forEach(vm.events, function(event, index) {
      vm.events[index].date = $filter('date')(new Date(event.startingDate), 'dd/MM/yyyy');

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
      vm.events[index].duration = hours + 'h, ' + minutes + 'm';

      var partecipants = 0;
      angular.forEach(event.users, function(user) {
        if(user.attended) {
          partecipants++;
        }
      });
      vm.events[index].partecipants = partecipants;

      vm.events[index].writtenItems = '';
      angular.forEach(event.items, function(item) {
        vm.events[index].writtenItems += item.name + ' (' + item.required + '), ';
      });
      vm.events[index].writtenItems = vm.events[index].writtenItems.slice(0, -2);
    });
  }, function(response) {
    console.log(response);
  });

});
