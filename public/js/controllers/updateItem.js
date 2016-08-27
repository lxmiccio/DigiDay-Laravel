angular.module('myControllers').controller('UpdateItemController', function ($routeParams, $window, itemService) {

  var vm  = this;

  itemService.getById($routeParams.id, function(response) {
    vm.item = response.data.data;

    vm.name = vm.item.name;
    vm.amount = vm.item.amount;
    vm.description = vm.item.description;
  }, function(response) {
    console.log(response);
  });

  vm.update = function(name, amount, description, item) {
    itemService.update(item.id, {
      'name': name,
      'amount': amount,
      'description': description
    }, function(response) {
      $window.location.href = 'amministrazione/materiali';
    }, function(response) {
      console.log(response);
    });
  };

});
