angular.module('myControllers').controller('EventController', function ($filter, $routeParams, $window, eventService) {

  var vm = this;

  eventService.getById($routeParams.id, function(response) {
    vm.event = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.remove = function(event) {
    eventService.remove(event.id, function(response) {
      $window.location.href = '/';
    }, function(response) {
      console.log(response);
    });
  }

  vm.isSubscribed = function(event, user) {
    if(event) {
      var subscribed = false;
      angular.forEach(event.users, function(partecipant) {
        if(partecipant.id == user.id) {
          subscribed = true;
        }
      });
      return subscribed;
    }
    else {
      return false;
    }
  };

  vm.subscribe = function(event, user) {
    eventService.attachUser(event.id, {
      'user_id': user.id
    }, function(response) {
      vm.event = response.data.data;
    }, function(response) {
      console.log(response);
    });
  };

  vm.unsubscribe = function(event, user) {
    eventService.detachUser(event.id, {
      'user_id': user.id
    }, function(response) {
      vm.event = response.data.data;
    }, function(response) {
      console.log(response);
    });
  };

  vm.stringToDate = function(string, format) {
    var date = new Date(string);
    date.setDate(date.getDate());
    return $filter('date')(date, format);
  };

});
