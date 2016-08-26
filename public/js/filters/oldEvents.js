angular.module('myFilters').filter('oldEvents', function() {
  return function (events) {
    if(angular.isArray(events)) {
      var oldEvents = [];

      angular.forEach(events, function(event) {
        if(new Date(event.startingDate) < new Date()) {
          oldEvents.push(event);
        }
      });

      return oldEvents;
    } else {
      return events;
    }
  };
});
