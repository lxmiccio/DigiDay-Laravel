angular.module('myFilters').filter('availableItems', function() {
  return function (items, startingDate, endingDate) {
    if(angular.isArray(items)) {
      var availableItems = [];

      angular.forEach(items, function(item) {
        item.availableAmount = item.amount;

        if(!items.events) {
          availableItems.push(item);
        } else {
          angular.forEach(items.events, function(event) {
            if ((!(startingDate < event.startingDate)) && (!(startingDate > event.endingDate))
            || (!(event.startingDate < startingDate)) && (!(event.startingDate > endingDate))
            || (!(endingDate < event.startingDate)) && (!(endingDate > event.endingDate))
            || (!(event.endingDate < startingDate)) && (!(event.endingDate > endingDate))) {
              //item.availableItems -= event.
            }
          });
        }
      });

      return availableItems;
    } else {
      return items;
    }
  };
});
