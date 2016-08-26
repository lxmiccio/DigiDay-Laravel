angular.module("myControllers").controller("EventsController", function ($filter, $location, $routeParams, localStorageService, randomString, categoryService, paginationService, partecipantService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  categoryService.getById($routeParams.id, function(response) {
    vm.category = response.data.data;

    vm.category.events = $filter('oldEvents')(vm.category.events.reverse());

    paginationService.paginate(vm.category, 1);
    vm.pagination = paginationService.getPagination($routeParams.page);
  }, function(response)  {
    console.log(response);
  });

  vm.redirect = function(path) {
    $location.path(path);
  };

  vm.redirectToPage = function(page) {
    if(page > 0 && page <= vm.pagination.totalPages) {
      $location.path('categoria/' + $routeParams.id + '/pagina/' + page)
    }
  };

  vm.openPartecipantsPrsPdf = function(event) {
    var prs = [];

    var totalPartecipants = 0;

    angular.forEach(event.partecipants, function(partecipant) {
      var found = false;

      angular.forEach(prs, function(pr, index) {
        if(pr.id == partecipant.pr.id) {
          found = true;
          prs[index].partecipants += ', ' + partecipant.name;
          prs[index].totalPartecipants++;
        }
      });

      if(!found) {
        prs.push({
          id: partecipant.pr.id,
          name: partecipant.pr.firstName + ' ' + partecipant.pr.lastName,
          partecipants: partecipant.name,
          totalPartecipants: 1
        });
      }

      totalPartecipants++;
    });

    var partecipants = [[
      { text: 'Pr', style: 'tableHeader' },
      { text: 'Partecipanti', style: 'tableHeader' }
    ]];

    var partecipantsPerPr = [[
      { text: 'Pr', style: 'tableHeader' },
      { text: 'Partecipanti', style: 'tableHeader' }
    ]];

    angular.forEach(prs, function(pr) {
      partecipants.push([
        { text: pr.name, style: 'tableText' },
        { text: pr.partecipants, style: 'tableText' }
      ]);

      partecipantsPerPr.push([
        { text: pr.name, style: 'tableText' },
        { text: pr.totalPartecipants.toString(), style: 'tableText' }
      ]);
    });

    var pdf = {
      content: [{
        text: event.name,
        style: 'header'
      }, {
        style: 'table',
        table: {
          widths: ['*', '*'],
          headerRows: 1,
          body: partecipants
        }
      }, {
        style: 'table',
        table: {
          widths: ['*', '*'],
          headerRows: 1,
          body: partecipantsPerPr
        }
      }, {
        style: 'text',
        text: 'Partecipanti: ' + totalPartecipants
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
          alignment: 'center',
          fontSize: 12,
          margin: [0, 15, 0, 15]
        }
      }
    };

    pdfMake.createPdf(pdf).open();
  };

  vm.openPartecipantsPdf = function(event) {
    var body = [[
      { text: 'Partecipante', style: 'tableHeader' }
    ]];

    var totalPartecipants = 0;

    angular.forEach(event.partecipants, function(partecipant) {
      body.push([
        { text: partecipant.name, style: 'tableText' }
      ]);

      totalPartecipants++;
    });

    var pdf = {
      content: [{
        text: event.name,
        style: 'header'
      }, {
        style: 'table',
        table: {
          widths: ['*'],
          headerRows: 1,
          body: body
        }
      }, {
        style: 'text',
        text: 'Partecipanti: ' + totalPartecipants
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
          alignment: 'center',
          fontSize: 12,
          margin: [0, 15, 0, 15]
        }
      }
    };

    pdfMake.createPdf(pdf).open();
  };

});
