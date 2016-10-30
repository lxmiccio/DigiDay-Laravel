// Flawless

angular.module('myControllers').controller('UpdateTopicController', function($routeParams, $window, topicService) {

  var vm  = this;

  topicService.getById($routeParams.id, function(response) {
    vm.topic = response.data.data;

    vm.name = vm.topic.name;
    vm.description = vm.topic.description;
  }, function(response) {
    console.log(response);
  });

  vm.update = function(name, description, topic) {
    topicService.update(topic.id, {
      'name': name,
      'description': description
    }, function(response) {
      $window.location.href = 'amministrazione/argomenti';
    }, function(response) {
      console.log(response);
    });
  };

});
