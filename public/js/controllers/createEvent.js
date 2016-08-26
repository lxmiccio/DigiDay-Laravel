angular.module("myControllers").controller("CreateEventController", function ($filter, $location, $routeParams, categoryService, eventService, imageService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  categoryService.getById($routeParams.id, function(response) {
    vm.category = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.onStartingDateChange = function(startingDate) {
    if(startingDate >= new Date()) {
      vm.startingDate = $filter('date')(startingDate, 'yyyy-MM-dd HH:mm:ss');
    } else {
      vm.startingDate = '';
    }
  };

  vm.onMaximumPartecipantsChange = function(maximumPartecipants) {
    if(!Number.isInteger(maximumPartecipants) || maximumPartecipants < 0) {
      vm.maximumPartecipants = 0;
    }
  };

  vm.removeImage = function() {
    vm.image = null;
  };

  vm.changeImage = function(image) {
    if(image) {
      vm.image = image;
    }
  };

  vm.createEvent = function (name, startingDate, maximumPartecipants, description, image, category) {
    if(image) {
      eventService.create({
        'name': name,
        'starting_date': startingDate,
        'maximum_partecipants': maximumPartecipants,
        'description': description,
        'category_id': category.id
      }, function(response) {

        var id = response.data.data.id;

        imageService.upload({
          'image': image,
          'directory': 'events',
          'filename': id
        }, function(response) {

          eventService.update(id, {
            'name': name,
            'starting_date': startingDate,
            'maximum_partecipants': maximumPartecipants,
            'description': description,
            'image': response.data.image
          }, function(response) {
            $location.path('categoria/' + category.id);
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
    else {
      eventService.create({
        'name': name,
        'starting_date': startingDate,
        'maximum_partecipants': maximumPartecipants,
        'description': description,
        'category_id': category.id
      }, function(response) {
        $location.path('categoria/' + category.id);
      }, function(response) {
        console.log(response);
      });
    }
  };

});
