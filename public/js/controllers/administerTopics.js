// Flawless

angular.module('myControllers').controller('AdministerTopicsController', function(topicService) {

  var vm  = this;

  topicService.getAll(function(response) {
    vm.topics = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.create = function(name, description) {
    topicService.create({
      'name': name,
      'description': description
    }, function(response) {

      vm.name = null;
      vm.description = null;

      vm.topics.push(response.data.data);

    }, function(response) {
      console.log(response);
    });
  };

  vm.enable = function(topic) {
    topicService.enable(topic.id, {}, function(response) {
      vm.topics[vm.topics.indexOf(topic)] = response.data.data;
    }, function(response) {
      console.log(response);
    });
  };

  vm.disable = function(topic) {
    topicService.disable(topic.id, {}, function(response) {
      vm.topics[vm.topics.indexOf(topic)] = response.data.data;
    }, function(response) {
      console.log(response);
    });
  };

});
