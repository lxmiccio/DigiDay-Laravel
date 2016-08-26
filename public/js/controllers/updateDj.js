angular.module("myControllers").controller("UpdateDjController", function ($filter, $location, $routeParams, djService, imageService, userService) {

  var vm  = this;

  vm.changedExternalImage = false;
  vm.changedInternalImage = false;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  djService.getById($routeParams.id, function(response) {
    vm.dj = response.data.data;

    vm.firstName = vm.dj.firstName;
    vm.lastName = vm.dj.lastName;
    vm.description = vm.dj.description;
    vm.externalImage = vm.dj.externalImage;
    vm.internalImage = vm.dj.internalImage;
  }, function(response) {
    console.log(response);
  });

  vm.removeExternalImage = function() {
    vm.externalImage = null;
    vm.changedExternalImage = true;
  };

  vm.restoreExternalImage = function(externalImage) {
    vm.externalImage = externalImage;
    vm.changedExternalImage = false;
  };

  vm.changeExternalImage = function(externalImage) {
    if(externalImage) {
      vm.externalImage = externalImage;
      vm.changedExternalImage = true;
    }
  };

  vm.removeInternalImage = function() {
    vm.internalImage = null;
    vm.changedInternalImage = true;
  };

  vm.restoreInternalImage = function(internalImage) {
    vm.internalImage = internalImage;
    vm.changedInternalImage = false;
  };

  vm.changeInternalImage = function(internalImage) {
    if(internalImage) {
      vm.internalImage = internalImage;
      vm.changedInternalImage = true;
    }
  };

  vm.updateDj = function(firstName, lastName, description, externalImage, internalImage, dj) {

    if(!vm.changedExternalImage) {
      if(!vm.changedInternalImage) {
        djService.update(dj.id, {
          'first_name': firstName,
          'last_name': lastName,
          'description': description,
          'external_image': externalImage,
          'internal_image': internalImage
        }, function(response) {
          $location.path('dj/' + dj.id);
        }, function(response) {
          console.log(response);
        });
      }
      else {
        imageService.remove({
          image: dj.internalImage
        }, function(response) {

          imageService.upload({
            'image': internalImage,
            'directory': 'djs/' + dj.id,
            'filename': 2
          }, function(response) {

            djService.update(dj.id, {
              'first_name': firstName,
              'last_name': lastName,
              'description': description,
              'external_image': externalImage,
              'internal_image': response.data.image
            }, function(response) {
              $location.path('dj/' + dj.id);
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
    }
    else {
      imageService.remove({
        image: dj.externalImage
      }, function(response) {

        imageService.upload({
          'image': externalImage,
          'directory': 'djs/' + dj.id,
          'filename': 1
        }, function(response) {

          if(!vm.changedInternalImage) {
            djService.update(dj.id, {
              'first_name': firstName,
              'last_name': lastName,
              'description': description,
              'external_image': externalImage,
              'internal_image': response.data.image
            }, function(response) {
              $location.path('dj/' + dj.id);
            }, function(response) {
              console.log(response);
            });
          }
          else {
            var externalImage = response.data.image;

            imageService.remove({
              image: dj.internalImage
            }, function(response) {

              imageService.upload({
                'image': internalImage,
                'directory': 'djs/' + dj.id,
                'filename': 2
              }, function(response) {

                djService.update(dj.id, {
                  'first_name': firstName,
                  'last_name': lastName,
                  'description': description,
                  'external_image': externalImage,
                  'internal_image': response.data.image
                }, function(response) {
                  $location.path('dj/' + dj.id);
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

        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
  };

  vm.isAuthenticated = function () {
    return userService.isAuthenticated();
  };

});
