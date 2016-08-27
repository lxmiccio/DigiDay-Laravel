angular.module('myControllers').controller('AdministerTopicsController', function (topicService) {

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

      topicService.getAll(function(response) {
        vm.topics = response.data.data;
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

  vm.remove = function(topic) {
    topicService.remove(topic.id, function(response) {

      topicService.getAll(function(response) {
        vm.topics = response.data.data;
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
