angular.module('myFilters').filter('availableClassrooms', function() {
  return function (classrooms, startingDate, endingDate) {
    if(angular.isArray(classrooms)) {
      var availableClassrooms = [];

      angular.forEach(classrooms, function(classroom) {
        if(!classrooms.events) {
          availableClassrooms.push(classroom);
        } else {
          var free = true;

          angular.forEach(classrooms.events, function(event) {
            if ((!(startingDate < event.startingDate)) && (!(startingDate > event.endingDate))
            || (!(event.startingDate < startingDate)) && (!(event.startingDate > endingDate))
            || (!(endingDate < event.startingDate)) && (!(endingDate > event.endingDate))
            || (!(event.endingDate < startingDate)) && (!(event.endingDate > endingDate))) {
              free = false;
            }
          });

          if(free) {
            availableClassrooms.push(classroom);
          }
        }
      });

      return availableClassrooms;
    } else {
      return classrooms;
    }
  };
});
