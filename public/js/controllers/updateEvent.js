angular.module("myControllers").controller("UpdateEventController", function ($filter, $routeParams, $window, categoryService, eventService, imageService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  eventService.getById($routeParams.id, function(response) {
    vm.event = response.data.data;

    vm.name = vm.event.name;
    vm.startingDate = vm.event.startingDate;
    vm.maximumPartecipants = vm.event.maximumPartecipants;
    vm.description = vm.event.description;
    vm.image = vm.event.image;
  }, function(response) {
    console.log(response);
  });

  vm.onStartingDateChange = function(startingDate) {
    vm.startingDate = $filter('date')(startingDate, 'yyyy-MM-dd HH:mm:ss');
  };

  vm.removeImage = function() {
    vm.image = null;
  };

  vm.restoreImage = function(image) {
    vm.image = image;
  };

  vm.changeImage = function(image) {
    if(image) {
      vm.image = image;
    }
  };

  vm.updateEvent = function(name, startingDate, maximumPartecipants, description, image, event) {
    if(image && event.image && image != event.image) {
      imageService.remove({
        image: event.image
      }, function(response) {

        imageService.upload({
          'image': image,
          'directory': 'events',
          'filename': event.id
        }, function(response) {

          eventService.update(event.id, {
            name: name,
            starting_date: startingDate,
            partecipants_counter: event.partecipantsCounter,
            maximum_partecipants: maximumPartecipants,
            description: description,
            image: response.data.image
          }, function(response) {

            var event = response.data.data;

            categoryService.getById(event.category.id, function(response) {
              $window.location.href = 'categoria/' + event.category.id;
            }, function(response) {
              console.log(response);
            });

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
    else if(image && event.image && image == event.image) {
      eventService.update(event.id, {
        name: name,
        starting_date: startingDate,
        partecipants_counter: event.partecipantsCounter,
        maximum_partecipants: maximumPartecipants,
        description: description,
        image: image
      }, function(response) {

        var event = response.data.data;

        categoryService.getById(event.category.id, function(response) {
          $window.location.href = 'categoria/' + event.category.id;
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
    else if(image && !event.image) {
      imageService.upload({
        'image': image,
        'directory': 'events',
        'filename': event.id
      }, function(response) {

        eventService.update(event.id, {
          name: name,
          starting_date: startingDate,
          partecipants_counter: event.partecipantsCounter,
          maximum_partecipants: maximumPartecipants,
          description: description,
          image: response.data.image
        }, function(response) {

          var event = response.data.data;

          categoryService.getById(event.category.id, function(response) {
            $window.location.href = 'categoria/' + event.category.id;
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
    else if(!image && event.image) {
      imageService.remove({
        image: event.image
      }, function(response) {

        eventService.update(event.id, {
          name: name,
          starting_date: startingDate,
          partecipants_counter: event.partecipantsCounter,
          maximum_partecipants: maximumPartecipants,
          description: description,
          image: image
        }, function(response) {

          var event = response.data.data;

          categoryService.getById(event.category.id, function(response) {
            $window.location.href = 'categoria/' + event.category.id;
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
    else if(!image && !event.image) {
      eventService.update(event.id, {
        name: name,
        starting_date: startingDate,
        partecipants_counter: event.partecipantsCounter,
        maximum_partecipants: maximumPartecipants,
        description: description,
        image: image
      }, function(response) {

        var event = response.data.data;

        categoryService.getById(event.category.id, function(response) {
          $window.location.href = 'categoria/' + event.category.id;
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
  };

});
