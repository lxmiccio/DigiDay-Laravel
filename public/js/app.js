angular.module('digidayApp', ['angular-jwt', 'angularRandomString', 'isteven-multi-select', 'LocalStorageModule', 'ngFileUpload', 'mwl.calendar', 'ngRoute', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'myControllers', 'myFilters', 'myServices'])

.config(function ($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'views/calendar.html',
    controller: 'CalendarController as ctrl'
  }).when('/registrati', {
    templateUrl: 'views/signup.html',
    controller: 'SignupController as ctrl'
  }).when('/accedi', {
    templateUrl: 'views/login.html',
    controller: 'LoginController as ctrl'
  }).when('/utente/:id', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileController as ctrl'
  }).when('/utente/:id/immagine', {
    templateUrl: 'views/updateImage.html',
    controller: 'UpdateImageController as ctrl'
  }).when('/evento/:id', {
    templateUrl: 'views/event.html',
    controller: 'EventController as ctrl'
  })/*.otherwise({
    redirectTo: '/'
  })*/;
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

.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('digidayApp').setStorageType('localStorage');
})

.run(function($rootScope) {
  $rootScope.$on('$locationChangeStart', function() {
    $rootScope.previous = location.pathname;
  })
});
