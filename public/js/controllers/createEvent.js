// Flawless

angular.module('myControllers').controller('CreateEventController', function($filter, $q, $window, classroomService, eventService, itemService, topicService) {

  var vm  = this;

  vm.showStartingDateError = false;
  vm.showEndingDateError = false;

  classroomService.getAll(function(response) {
    vm.classrooms = [];

    angular.forEach(response.data.data, function(classroom) {
      if(!classroom.disabled) {
        vm.classrooms.push(classroom);
      }
    })
  }, function(response) {
    console.log(response);
  });

  itemService.getAll(function(response) {
    vm.items = [];

    angular.forEach(response.data.data, function(item) {
      if(!item.disabled) {
        vm.items.push(item);
      }
    });
  }, function(response) {
    console.log(response);
  });

  topicService.getAll(function(response) {
    vm.topics = [];

    angular.forEach(response.data.data, function(topic) {
      vm.topics.push(topic);
    })
  }, function(response) {
    console.log(response);
  });

  vm.onDateRender = function(view, dates, leftDate, upDate, rightDate) {
    angular.forEach(dates, function(date, index) {
      if(new Date(date.localDateValue()) < new Date() || new Date(date.localDateValue()).getDay() == 0 || new Date(date.localDateValue()).getDay() == 6) {
        dates[index].selectable = false;
      }
    });
  };

  vm.onDateChange = function(date) {
    if(new Date(date) >= new Date()) {
      vm.date = $filter('date')(new Date(date), 'yyyy-MM-dd');
    } else {
      vm.date = null;
    }
    vm.startingDate = null;
    vm.endingDate = null;
  };

  vm.onStartingOrEndingDateRender = function(view, dates, leftDate, upDate, rightDate) {
    angular.forEach(dates, function(date, index) {
      if(view == 'year' || view == 'month' || view == 'day') {
        if(new Date(vm.date).getFullYear() != new Date(date.localDateValue()).getFullYear() || new Date(vm.date).getMonth() != new Date(date.localDateValue()).getMonth() || new Date(vm.date).getDate() != new Date(date.localDateValue()).getDate()) {
          dates[index].selectable = false;
        }
      }
    });
  };

  vm.onStartingDateChange = function(startingDate) {
    startingDate = new Date(new Date(vm.date).getFullYear(), new Date(vm.date).getMonth(), new Date(vm.date).getDate(), new Date(startingDate).getHours(), new Date(startingDate).getMinutes());

    if(new Date(startingDate) >= new Date() && new Date(startingDate).getHours() >= 8 && new Date(startingDate).getHours() <= 19) {
      vm.startingDate = $filter('date')(new Date(startingDate), 'yyyy-MM-dd HH:mm:ss')
      vm.showStartingDateError = false;
    } else if(new Date(startingDate).getHours() == 20 && new Date(startingDate).getMinutes() == 0) {
      vm.startingDate = $filter('date')(new Date(startingDate), 'yyyy-MM-dd HH:mm:ss')
      vm.showStartingDateError = false;
    } else {
      vm.startingDate = null;
      vm.showStartingDateError = true;
    }
    vm.endingDate = null;
  };

  vm.onEndingDateChange = function(endingDate, startingDate, classrooms, items) {
    endingDate = new Date(new Date(vm.date).getFullYear(), new Date(vm.date).getMonth(), new Date(vm.date).getDate(), new Date(endingDate).getHours(), new Date(endingDate).getMinutes());

    if(new Date(endingDate) > new Date(startingDate) && new Date(endingDate).getHours() <= 19) {
      vm.endingDate = $filter('date')(new Date(endingDate), 'yyyy-MM-dd HH:mm:ss');
      vm.showEndingDateError = false;
      vm.filteredClassrooms = $filter('availableClassrooms')(classrooms, new Date(startingDate), new Date(endingDate));
      vm.filteredItems = $filter('availableItems')(items, new Date(startingDate), new Date(endingDate));
    } else if(new Date(endingDate) > new Date(startingDate) && new Date(endingDate).getHours() == 20 && new Date(endingDate).getMinutes() == 0) {
      vm.endingDate = $filter('date')(new Date(endingDate), 'yyyy-MM-dd HH:mm:ss');
      vm.showEndingDateError = false;
      vm.filteredClassrooms = $filter('availableClassrooms')(classrooms, new Date(startingDate), new Date(endingDate));
      vm.filteredItems = $filter('availableItems')(items, new Date(startingDate), new Date(endingDate));
    } else {
      vm.endingDate = null;
      vm.showEndingDateError = true;
    }
  };

  vm.onClassroomChange = function(classroom, maximumPartecipants)
  {
    if(maximumPartecipants > classroom[0].capacity) {
      vm.maximumPartecipants = classroom[0].capacity;
    }
  }

  vm.onMaximumPartecipantsChange = function(maximumPartecipants, selectedClassroom) {
    if(!Number.isInteger(maximumPartecipants) || maximumPartecipants < 0) {
      vm.maximumPartecipants = 0;
    } else if(maximumPartecipants > selectedClassroom[0].capacity) {
      vm.maximumPartecipants = selectedClassroom[0].capacity;
    }
  };

  vm.onItemRequiredAmountChange = function(selectedItems, index) {
    if(!Number.isInteger(selectedItems[index].required) || selectedItems[index].required < 0) {
      vm.selectedItems[index].required = 0;
    } else if(selectedItems[index].required > selectedItems[index].available) {
      vm.selectedItems[index].required = vm.selectedItems[index].available;
    }
  };

  vm.create = function(name, startingDate, endingDate, maximumPartecipants, description, selectedClassroom, selectedTopic, selectedItems, user) {
    eventService.create({
      'name': name,
      'starting_date': startingDate,
      'ending_date': endingDate,
      'maximum_partecipants': maximumPartecipants,
      'description': description,
      'classroom_id': selectedClassroom[0].id,
      'topic_id': selectedTopic[0].id,
      'user_id': user.id
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
