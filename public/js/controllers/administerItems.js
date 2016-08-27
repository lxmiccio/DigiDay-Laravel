// Flawless

angular.module('myControllers').controller('AdministerItemsController', function (itemService) {

  var vm  = this;

  itemService.getAll(function(response) {
    vm.items = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.onAmountChange = function(amount) {
    if(!Number.isInteger(amount) || amount < 0) {
      vm.amount = 0;
    }
  };

  vm.create = function(name, amount, description) {
    itemService.create({
      'name': name,
      'amount': amount,
      'description': description
    }, function(response) {

      vm.name = null;
      vm.amount = null;
      vm.description = null;

      itemService.getAll(function(response) {
        vm.items = response.data.data;
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

  vm.remove = function(item) {
    itemService.remove(item.id, function(response) {

      itemService.getAll(function(response) {
        vm.items = response.data.data;
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
