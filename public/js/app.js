angular.module('digidayApp', ['angular-jwt', 'angularRandomString', 'isteven-multi-select', 'LocalStorageModule', 'ngFileUpload', 'mwl.calendar', 'ngRoute', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'myControllers', 'myFilters', 'myServices'])

.config(function ($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'views/calendar.html',
    controller: 'CalendarController as ctrl'
  }).when('/amministrazione', {
    templateUrl: 'views/administration.html'
  }).when('/amministrazione/argomenti', {
    templateUrl: 'views/administerTopics.html',
    controller: 'AdministerTopicsController as ctrl'
  }).when('/amministrazione/argomento/:id/modifica', {
    templateUrl: 'views/updateTopic.html',
    controller: 'UpdateTopicController as ctrl'
  }).when('/amministrazione/classi', {
    templateUrl: 'views/administerClassrooms.html',
    controller: 'AdministerClassroomsController as ctrl'
  }).when('/amministrazione/classe/:id/modifica', {
    templateUrl: 'views/updateClassroom.html',
    controller: 'UpdateClassRoomController as ctrl'
  }).when('/amministrazione/digiday', {
    templateUrl: 'views/administerEvents.html',
    controller: 'AdministerEventsController as ctrl'
  }).when('/amministrazione/materiali', {
    templateUrl: 'views/administerItems.html',
    controller: 'AdministerItemsController as ctrl'
  }).when('/amministrazione/materiale/:id/modifica', {
    templateUrl: 'views/updateItem.html',
    controller: 'UpdateItemController as ctrl'
  }).when('/amministrazione/utenti', {
    templateUrl: 'views/administerUsers.html',
    controller: 'AdministerUsersController as ctrl'
  }).when('/amministrazione/utente/:id/modifica', {
    templateUrl: 'views/updateUser.html',
    controller: 'UpdateUserController as ctrl'
  }).when('/registrati', {
    templateUrl: 'views/signup.html',
    controller: 'SignupController as ctrl'
  }).when('/utente/conferma/:token', {
    templateUrl: 'views/confirm.html',
    controller: 'ConfirmController as ctrl'
  }).when('/accedi', {
    templateUrl: 'views/login.html',
    controller: 'LoginController as ctrl'
  }).when('/utente/recupera', {
    templateUrl: 'views/recover.html',
    controller: 'RecoverController as ctrl'
  }).when('/utente/reimposta/:token', {
    templateUrl: 'views/reset.html',
    controller: 'ResetController as ctrl'
  }).when('/utente/:id', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileController as ctrl'
  }).when('/utente/:id/eventi', {
    templateUrl: 'views/administerUserAttendedEvents.html',
    controller: 'UserAttendedEventsController as ctrl'
  }).when('/utente/:id/immagine', {
    templateUrl: 'views/updateImage.html',
    controller: 'UpdateImageController as ctrl'
  }).when('/eventi', {
    templateUrl: 'views/events.html',
    controller: 'EventsController as ctrl'
  }).when('/evento/crea', {
    templateUrl: 'views/createEvent.html',
    controller: 'CreateEventController as ctrl'
  }).when('/evento/:id', {
    templateUrl: 'views/event.html',
    controller: 'EventController as ctrl'
  }).otherwise({
    redirectTo: '/'
  });
})

.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('digidayApp').setStorageType('localStorage');
})

.config(function($httpProvider, jwtInterceptorProvider) {
  jwtInterceptorProvider.refreshToken = function($http, jwtHelper, localStorageService) {
    var token = localStorageService.get('token');

    if(token) {
      if(jwtHelper.isTokenExpired(token)) {
        return $http.get('api/auth/refresh').then(function(response) {
          localStorageService.set('token', response.data.token);
          return localStorageService.get('token');
        }, function(response) {
          token = localStorageService.get('token');
          if(!jwtHelper.isTokenExpired(token)) {
            return localStorageService.get('token');
          } else {
            localStorageService.remove('token');
          }
        });
      } else {
        return token;
      }
    }
  }

  $httpProvider.interceptors.push('jwtInterceptor');
})

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthHttpInterceptor');
})

.factory('AuthHttpInterceptor', function(localStorageService) {
  return {
    request: function(config) {
      config.headers.Authorization = localStorageService.get('token');
      return config;
    },
    // response: function(response) {
    //   if(response.headers('Authorization')) {
    //     localStorageService.set('token', response.headers('Authorization'));
    //   }
    //   return response;
    // },
    // responseError: function(response) {
    //   return response;
    // }
  };
})

.run(function($rootScope) {
  $rootScope.$on('$locationChangeStart', function() {
    if(location.pathname != "/accedi" && location.pathname != "/registrati") {
      $rootScope.previous = location.pathname;
    }
  })
});
