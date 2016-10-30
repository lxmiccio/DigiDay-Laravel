// Flawless

angular.module('myControllers').controller('AdministerPrintsController', function($filter, eventService) {

  var vm  = this;

  eventService.getAll(function(response) {
    vm.events = response.data.data;

    angular.forEach(vm.events, function(event, index) {
      vm.events[index].date = $filter('date')(new Date(event.startingDate), 'dd/MM/yyyy');

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
      vm.events[index].duration = hours + 'h, ' + minutes + 'm';

      var partecipants = 0;
      angular.forEach(event.users, function(user) {
        if(user.attended) {
          partecipants++;
        }
      });
      vm.events[index].partecipants = partecipants;
    });

    vm.filteredEvents = angular.copy(vm.events);
  }, function(response) {
    console.log(response);
  });

  vm.onStartingDateChange = function(startingDate) {
    vm.startingDate = $filter('date')(new Date(startingDate), 'yyyy-MM-dd');
  };

  vm.onEndingDateChange = function(endingDate, startingDate, events) {
    if(new Date(endingDate) > new Date(startingDate)) {
      vm.endingDate = $filter('date')(new Date(endingDate), 'yyyy-MM-dd');

      vm.filteredEvents = [];

      angular.forEach(events, function(event) {
        if(new Date(event.startingDate) >= new Date(startingDate) && new Date(event.startingDate) <= new Date(endingDate)) {
          vm.filteredEvents.push(event);
        }
      });
    } else {
      vm.endingDate = null;
    }
  };

  vm.openPdf = function(events, startingDate, endingDate) {
    var body = [[
      { text: 'Evento', style: 'tableHeader' },
      { text: 'Argomento', style: 'tableHeader' },
      { text: 'Proprietario', style: 'tableHeader' },
      { text: 'Data', style: 'tableHeader' },
      { text: 'Durata', style: 'tableHeader' },
      { text: 'Partecipanti', style: 'tableHeader' }
    ]];

    angular.forEach(events, function(event) {
      body.push([
        { text: event.name, style: 'tableText' },
        { text: event.topic.name, style: 'tableText' },
        { text: event.user.firstName + ' ' + event.user.lastName, style: 'tableText' },
        { text: event.date, style: 'tableText' },
        { text: event.duration, style: 'tableText' },
        { text: event.partecipants + '/' + event.users.length + '/' + event.maximumPartecipants, style: 'tableText' }
      ]);
    });

    var pdf = {
      content: [{
        text: 'DigiDay dal ' + $filter('date')(new Date(startingDate), 'dd/MM/yyyy') + ' al ' + $filter('date')(new Date(endingDate), 'dd/MM/yyyy'),
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
        }
      }
    };

    pdfMake.createPdf(pdf).open();
  };

});
