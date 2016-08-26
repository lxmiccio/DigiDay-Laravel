angular.module("myControllers").controller("EventController", function ($filter, $routeParams, eventService, userService) {

  var vm = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  eventService.getById($routeParams.id, function(response) {
    vm.event = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.stringToDate = function(string, format) {
    var date = new Date(string);
    date.setDate(date.getDate());
    return $filter('date')(date, format);
  };

});
