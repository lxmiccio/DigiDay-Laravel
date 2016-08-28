angular.module('myFilters').filter('availableClassrooms', function() {
  return function (classrooms, startingDate, endingDate) {
    if(angular.isArray(classrooms)) {
      var availableClassrooms = [];

      angular.forEach(classrooms, function(classroom) {
        if(!classroom.events) {
          availableClassrooms.push(classroom);
        } else {
          var free = true;

          angular.forEach(classroom.events, function(event) {
            if ((!(new Date(startingDate) < new Date(event.startingDate))) && (!(new Date(startingDate) > new Date(event.endingDate)))
            || (!(new Date(event.startingDate) < new Date(startingDate))) && (!(new Date(event.startingDate) > new Date(endingDate)))
            || (!(new Date(endingDate) < new Date(event.startingDate))) && (!(new Date(endingDate) > new Date(event.endingDate)))
            || (!(new Date(event.endingDate) < new Date(startingDate))) && (!(new Date(event.endingDate) > new Date(endingDate)))) {
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
