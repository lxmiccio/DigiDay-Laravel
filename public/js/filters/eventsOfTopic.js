angular.module('myFilters').filter('eventsOfTopic', function() {
  return function (events, topics) {
    if(angular.isArray(events) && angular.isArray(topics) && topics.length > 0) {
      var eventsOfTopic = [];

      angular.forEach(events, function(event) {
        angular.forEach(topics, function(topic) {
          if(topic.id == event.topic.id) {
            eventsOfTopic.push(event);
          }
        });
      });

      return eventsOfTopic;
    } else {
      return events;
    }
  };
});
