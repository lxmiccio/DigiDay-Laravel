angular.module('myControllers').controller('UpdateImageController', function ($window, imageService, userService) {

  var vm  = this;

  vm.changedImage = false;

  vm.removeImage = function() {
    vm.image = null;
    vm.changedImage = true;
  };

  vm.restoreImage = function(image) {
    vm.image = image;
    vm.changedImage = false;
  };

  vm.changeImage = function(image) {
    if(image) {
      vm.image = image;
      vm.changedImage = true;
    }
  };

  vm.updateImage = function(image, user) {
    if(!vm.changedImage) {
      $window.location.href = 'utente/' + user.id;
    }
    else {
      imageService.remove({
        image: user.image
      }, function(response) {

        imageService.upload({
          'image': image,
          'directory': 'users',
          'filename': user.id
        }, function(response) {

          userService.updateImage(user.id, {
            'image': response.data.image
          }, function(response) {
            $window.location.href = 'utente/' + user.id;
          }, function(response) {
            console.log(response);
          });

        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
  };

});
