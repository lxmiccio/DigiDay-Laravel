angular.module('myFilters').filter('availableItems', function() {
  return function (items, startingDate, endingDate) {
    if(angular.isArray(items)) {
      var availableItems = [];

      angular.forEach(items, function(item) {
        item.available = item.amount;
        if(!item.events) {
          availableItems.push(item);
        } else {
          angular.forEach(item.events, function(event) {
            if ((!(new Date(startingDate) < new Date(event.startingDate))) && (!(new Date(startingDate) > new Date(event.endingDate)))
            || (!(new Date(event.startingDate) < new Date(startingDate))) && (!(new Date(event.startingDate) > new Date(endingDate)))
            || (!(new Date(endingDate) < new Date(event.startingDate))) && (!(new Date(endingDate) > new Date(event.endingDate)))
            || (!(new Date(event.endingDate) < new Date(startingDate))) && (!(new Date(event.endingDate) > new Date(endingDate)))) {
              item.available -= event.required
            }
          });
          if(item.available > 0) {
            availableItems.push(item);
          }
        }
      });

      return availableItems;
    } else {
      return items;
    }
  };
});
