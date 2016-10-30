// Flawless

angular.module('myControllers').controller('AttendedEventsController', function($filter, $routeParams, eventService, userService) {

  var vm = this;

  userService.getById($routeParams.id, function(response) {
    vm.user = response.data.data;

    vm.events = [];
    vm.attendedEvents = [];

    angular.forEach(vm.user.events, function(event) {
      var hours;
      var minutes;

      if(new Date(event.startingDate).getMinutes() > new Date(event.endingDate).getMinutes()) {
        hours = new Date(event.endingDate).getHours() - new Date(event.startingDate).getHours() - 1;
        minutes = 60 - new Date(event.startingDate).getMinutes() + new Date(event.endingDate).getMinutes();
      } else if(new Date(event.startingDate).getMinutes() < new Date(event.endingDate).getMinutes()) {
        hours = new Date(event.endingDate).getHours() - new Date(event.startingDate).getHours();
        minutes = new Date(event.endingDate).getMinutes() - new Date(event.startingDate).getMinutes();
      } else {
        hours = new Date(event.endingDate).getHours() - new Date(event.startingDate).getHours();
        minutes = 0;
      }

      var partecipants = 0;

      angular.forEach(event.users, function(user) {
        if(user.attended) {
          partecipants++;
        }
      });

      event.duration = hours + 'h, ' + minutes + 'm';
      event.partecipants = partecipants;

      vm.events.push(event);
    });

    angular.forEach(vm.user.attendedEvents, function(event) {
      var hours;
      var minutes;

      if(new Date(event.startingDate).getMinutes() > new Date(event.endingDate).getMinutes()) {
        hours = new Date(event.endingDate).getHours() - new Date(event.startingDate).getHours() - 1;
        minutes = 60 - new Date(event.startingDate).getMinutes() + new Date(event.endingDate).getMinutes();
      } else if(new Date(event.startingDate).getMinutes() < new Date(event.endingDate).getMinutes()) {
        hours = new Date(event.endingDate).getHours() - new Date(event.startingDate).getHours();
        minutes = new Date(event.endingDate).getMinutes() - new Date(event.startingDate).getMinutes();
      } else {
        hours = new Date(event.endingDate).getHours() - new Date(event.startingDate).getHours();
        minutes = 0;
      }

      var partecipants = 0;

      angular.forEach(event.users, function(user) {
        if(user.attended) {
          partecipants++;
        }
      });


      event.duration = hours + 'h, ' + minutes + 'm';
      event.partecipants = partecipants;

      vm.attendedEvents.push(event);
    });
  }, function(response) {
    console.log(response);
  });

  vm.openPdf = function(user, events, attendedEvents) {
    var body = [[
      { text: 'Evento', style: 'tableHeader' },
      { text: 'Proprietario', style: 'tableHeader' },
      { text: 'Data', style: 'tableHeader' },
      { text: 'Durata', style: 'tableHeader' },
      { text: 'Partecipanti', style: 'tableHeader' },
      { text: 'Argomento', style: 'tableHeader' }
    ]];

    angular.forEach(events, function(event) {
      body.push([
        { text: event.name, style: 'tableText' },
        { text: event.user.firstName + ' ' + event.user.lastName, style: 'tableText' },
        { text: $filter('date')(new Date(event.startingDate), 'yyyy-MM-dd'), style: 'tableText' },
        { text: event.duration, style: 'tableText' },
        { text: event.partecipants + '/' + event.users.length, style: 'tableText' },
        { text: event.topic.name, style: 'tableText' }
      ]);
    });

    angular.forEach(attendedEvents, function(event) {
      body.push([
        { text: event.name, style: 'tableText' },
        { text: event.user.firstName + ' ' + event.user.lastName, style: 'tableText' },
        { text: $filter('date')(new Date(event.startingDate), 'yyyy-MM-dd'), style: 'tableText' },
        { text: event.duration, style: 'tableText' },
        { text: event.partecipants + '/' + event.users.length, style: 'tableText' },
        { text: event.topic.name, style: 'tableText' }
      ]);
    });

    var pdf = {
      content: [{
        text: user.firstName + ' ' + user.lastName,
        style: 'header'
      }, {
        style: 'table',
        table: {
          widths: ['*', '*', '*', '*', '*', '*'],
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
          margin: [0, 15, 0, 0]
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
        }
      }
    };

    pdfMake.createPdf(pdf).open();
  };
});
