angular.module('myFilters').filter('newEvents', function() {
  return function (events) {
    if(angular.isArray(events)) {
      var newEvents = [];

      angular.forEach(events, function(event) {
        if(new Date(event.startingDate) > new Date()) {
          newEvents.push(event);
        }
      });

      return newEvents;
    } else {
      return events;
    }
  };
});
