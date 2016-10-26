// Flawless

angular.module('myControllers').controller('RegisterController', function($routeParams, eventService, userService) {

  var vm  = this;

  eventService.getById($routeParams.id, function(response) {
    vm.event = response.data.data;

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

  vm.confirm = function(users) {
    angular.forEach(users, function(user) {
      if(user.attended && !user.startingAttended) {
        userService.attend(user.id, {
          attended: user.attended,
          event_id: vm.event.id
        }, function(response) {
          console.log(response);
        }, function(response) {
          console.log(response);
        });
      } else if(!user.attended && user.startingAttended) {
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

    console.log(body)

    var pdf = {
      content: [{
        text: event.name,
        style: 'header'
      }, {
        text: 'Proprietario: ' + event.user.firstName + ' ' + event.user.lastName,
        style: 'text'
      }, {
        text: 'Durata complessiva: ' + hours + ' ore e ' + minutes + ' minuti',
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
