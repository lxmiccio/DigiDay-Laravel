// Flawless

angular.module('myControllers').controller('EventController', function($filter, $routeParams, $window, eventService) {

  var vm = this;

  eventService.getById($routeParams.id, function(response) {
    vm.event = response.data.data;

    vm.event.date = $filter('date')(new Date(vm.event.startingDate), 'dd/MM/yyyy');

    var hours;
    var minutes;
    if(new Date(vm.event.startingDate).getMinutes() > new Date(vm.event.endingDate).getMinutes()) {
      hours = new Date(vm.event.endingDate).getHours() - new Date(vm.event.startingDate).getHours() - 1;
      minutes = 60 - new Date(vm.event.startingDate).getMinutes() + new Date(vm.event.endingDate).getMinutes();
    } else if(new Date(vm.event.startingDate).getMinutes() < new Date(vm.event.endingDate).getMinutes()) {
      hours = new Date(vm.event.endingDate).getHours() - new Date(vm.event.startingDate).getHours();
      minutes = new Date(vm.event.endingDate).getMinutes() - new Date(vm.event.startingDate).getMinutes();
    } else {
      hours = new Date(vm.event.endingDate).getHours() - new Date(vm.event.startingDate).getHours();
      minutes = 0;
    }
    vm.event.duration = hours + 'h, ' + minutes + 'm';

    var partecipants = 0;
    angular.forEach(vm.event.users, function(user) {
      if(user.attended) {
        partecipants++;
      }
    });
    vm.event.partecipants = partecipants;

    angular.forEach(vm.event.users, function(user, index) {
      if(user.attended) {
        vm.event.users[index].startingAttended = true;
        vm.event.users[index].attended = true;
      } else {
        vm.event.users[index].startingAttended = false;
        vm.event.users[index].attended = false;
      }
    });
  }, function(response) {
    console.log(response);
  });

  vm.formatDate = function(string, format) {
    var date = new Date(string);
    date.setDate(date.getDate());
    return $filter('date')(date, format);
  };

  vm.remove = function(event) {
    eventService.remove(event.id, function(response) {
      $window.location.href = '/';
    }, function(response) {
      console.log(response);
    });
  };

  vm.isSubscribed = function(event, user) {
    if(event) {
      var subscribed = false;
      angular.forEach(event.users, function(partecipant) {
        if(partecipant.id == user.id) {
          subscribed = true;
        }
      });
      return subscribed;
    }
    else {
      return false;
    }
  };

  vm.subscribe = function(event, user) {
    eventService.attachUser(event.id, {
      'user_id': user.id
    }, function(response) {
      vm.event = response.data.data;
    }, function(response) {
      console.log(response);
    });
  };

  vm.unsubscribe = function(event, user) {
    eventService.detachUser(event.id, {
      'user_id': user.id
    }, function(response) {
      vm.event = response.data.data;
    }, function(response) {
      console.log(response);
    });
  };

  vm.confirm = function(users) {
    angular.forEach(users, function(user) {
      if(!user.startingAttended && user.attended) {
        userService.attend(user.id, {
          attended: user.attended,
          event_id: vm.event.id
        }, function(response) {
          console.log(response);
        }, function(response) {
          console.log(response);
        });
      } else if(user.startingAttended && !user.attended) {
        userService.attend(user.id, {
          attended: user.attended,
          event_id: vm.event.id
        }, function(response) {
          console.log(response);
        }, function(response) {
          console.log(response);
        });
      }
    });
  };

  vm.openPdf = function(event, users) {
    var body = [[
      { text: 'Partecipante', style: 'tableHeader' },
      { text: 'Presente', style: 'tableHeader' }
    ]];

    var partecipants = 0;
    angular.forEach(event.users, function(user) {
      if(user.attended) {
        partecipants++;
      }
    });
    event.partecipants = partecipants;

    angular.forEach(users, function(user) {
      if(user.attended) {
        body.push([
          { text: user.firstName + ' ' + user.lastName, style: 'tableText' },
          { text: 'Si', style: 'tableText' }
        ]);
      } else {
        body.push([
          { text: user.firstName + ' ' + user.lastName, style: 'tableText' },
          { text: 'No', style: 'tableText' }
        ]);
      }
    });

    var pdf = {
      content: [{
        text: event.name,
        style: 'header'
      }, {
        text: 'Argomento: ' + event.topic.name,
        style: 'text'
      }, {
        text: 'Aula: ' + event.classroom.name,
        style: 'text'
      }, {
        text: 'Proprietario: ' + event.user.firstName + ' ' + event.user.lastName,
        style: 'text'
      }, {
        text: 'Data: ' + event.date,
        style: 'text'
      }, {
        text: 'Durata: ' + event.duration,
        style: 'text'
      }, {
        text: 'Partecipanti: ' + event.partecipants + '/' + event.users.length + '/' + event.maximumPartecipants,
        style: 'text'
      }, {
        style: 'table',
        table: {
          widths: ['*', '*'],
          headerRows: 1,
          body: body
        }
      }],
      styles: {
        header: {
          alignment: 'center',
          bold: true,
          fontSize: 18,
          margin: [0, 0, 0, 10]
        },
        table: {
          margin: [0, 15, 0, 15]
        },
        tableHeader: {
          alignment: 'center',
          bold: true,
          fontSize: 12,
          margin: [0, 2, 0, 2]
        },
        tableText: {
          alignment: 'center',
          fontSize: 10,
          margin: [0, 2, 0, 2]
        },
        text: {
          alignment: 'left',
          fontSize: 12,
          margin: [0, 15, 0, 15]
        }
      }
    };

    pdfMake.createPdf(pdf).open();
  };

});
