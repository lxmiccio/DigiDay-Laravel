// Flawless

angular.module('myControllers').controller('AdministerItemsController', function($window, authService, itemService) {

  authService.isAdministrator(function() {
    $window.location.href = '/';
  });

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

      vm.items.push(response.data.data);

    }, function(response) {
      console.log(response);
    });
  };

  vm.enable = function(item) {
    itemService.enable(item.id, {}, function(response) {
      vm.items[vm.items.indexOf(item)] = response.data.data;
    }, function(response) {
      console.log(response);
    });
  };

  vm.disable = function(item) {
    itemService.disable(item.id, {}, function(response) {
      vm.items[vm.items.indexOf(item)] = response.data.data;
    }, function(response) {
      console.log(response);
    });
  };

});
