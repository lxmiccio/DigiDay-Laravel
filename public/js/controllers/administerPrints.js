// Flawless

angular.module('myControllers').controller('AdministerPrintsController', function($filter, eventService) {

  var vm  = this;

  eventService.getAll(function(response) {
    vm.events = response.data.data;

    vm.filteredEvents = [];

    angular.forEach(vm.events, function(event) {
      vm.filteredEvents.push(event);
    });
  }, function(response) {
    console.log(response);
  });

  vm.onStartingDateChange = function(startingDate) {
    vm.startingDate = $filter('date')(startingDate, 'yyyy-MM-dd')
  };

  vm.onEndingDateChange = function(endingDate, startingDate, classrooms, items) {
    if(endingDate > new Date(startingDate)) {
      vm.endingDate = $filter('date')(endingDate, 'yyyy-MM-dd');
    } else {
      vm.endingDate = null;
    }
  };

  vm.filterEvents = function(events, startingDate, endingDate) {
    vm.filteredEvents = [];

    angular.forEach(events, function(event) {
      if(event.startingDate >= startingDate && event.startingDate <= endingDate) {
        vm.filteredEvents.push(event);
      }
    });
  };

  vm.openPdf = function(events) {
    var body = [[
      { text: 'Evento', style: 'tableHeader' },
      { text: 'Proprietario', style: 'tableHeader' },
      { text: 'Data', style: 'tableHeader' },
      { text: 'Durata', style: 'tableHeader' },
      { text: 'Partecipanti', style: 'tableHeader' },
      { text: 'Argomento', style: 'tableHeader' }
    ]];

    angular.forEach(events, function(event) {
      var i = 0;

      angular.forEach(event.users, function(user) {
        if(user.attended) {
          i++;
        }
      });

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

      body.push([
        { text: event.name, style: 'tableText' },
        { text: event.user.firstName + ' ' + event.user.lastName, style: 'tableText' },
        { text: $filter('date')(new Date(event.startingDate), 'yyyy-MM-dd'), style: 'tableText' },
        { text: hours + ' ore, ' + minutes + ' minuti', style: 'tableText' },
        { text: i + '/' + event.users.length, style: 'tableText' },
        { text: event.topic.name, style: 'tableText' }
      ]);
    });

    var pdf = {
      content: [{
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
