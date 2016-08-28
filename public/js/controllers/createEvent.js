// Flawless

angular.module('myControllers').controller('CreateEventController', function ($filter, $q, $window, classroomService, eventService, itemService, topicService) {

  var vm  = this;

  classroomService.getAll(function(response) {
    vm.classrooms = response.data.data;
  }, function(response) {
    console.log(response);
  });

  itemService.getAll(function(response) {
    vm.items = response.data.data;
  }, function(response) {
    console.log(response);
  });

  topicService.getAll(function(response) {
    vm.topics = response.data.data;
  }, function(response) {
    console.log(response);
  });

  vm.onStartingDateChange = function(startingDate) {
    if(startingDate >= new Date()) {
      vm.startingDate = $filter('date')(startingDate, 'yyyy-MM-dd HH:mm:ss');
    } else {
      vm.startingDate = null;
    }
    vm.endingDate = null;
  };

  vm.onEndingDateChange = function(endingDate, startingDate, classrooms, items) {
    if(endingDate > new Date(startingDate)) {
      vm.endingDate = $filter('date')(endingDate, 'yyyy-MM-dd HH:mm:ss');
      vm.filteredClassrooms = $filter('availableClassrooms')(classrooms, startingDate, endingDate);
      vm.filteredItems = $filter('availableItems')(items, startingDate, endingDate);
    } else {
      vm.endingDate = null;
    }
  };

  vm.onMaximumPartecipantsChange = function(maximumPartecipants, selectedClassroom) {
    if(!Number.isInteger(maximumPartecipants) || maximumPartecipants < 0) {
      vm.maximumPartecipants = 0;
    } else if(maximumPartecipants > selectedClassroom[0].maximumPartecipants) {
      vm.maximumPartecipants = selectedClassroom[0].maximumPartecipants;
    }
  };

  vm.onItemRequiredChange = function(selectedItems, index) {
    if(!Number.isInteger(selectedItems[index].required) || selectedItems[index].required < 0) {
      vm.selectedItems[index].required = 0;
    } else if(selectedItems[index].required > selectedItems[index].available) {
      vm.selectedItems[index].required = vm.selectedItems[index].available;
    }
  };

  vm.create = function(name, startingDate, endingDate, maximumPartecipants, selectedClassroom, selectedTopic, selectedItems, description, user) {
    eventService.create({
      'name': name,
      'starting_date': startingDate,
      'ending_date': endingDate,
      'maximum_partecipants': maximumPartecipants,
      'user_id': user.id,
      'classroom_id': selectedClassroom[0].id,
      'topic_id': selectedTopic[0].id,
      'description': description
    }, function(response) {
      var promises = [];

      angular.forEach(selectedItems, function(item) {
        var deferred = $q.defer();

        eventService.attachItem(response.data.data.id, {
          'item_id': item.id,
          'required': item.required
        }, function(response) {
          deferred.resolve(response);
        }, function(response) {
          console.log(response);
        });

        promises.push(deferred.promise);
      });

      $q.all(promises).then(function(responses) {
        $window.location.href = '';
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

});
