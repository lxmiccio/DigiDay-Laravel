angular.module('myServices').factory('userService', function ($http, localStorageService) {

  function me(onSuccess, onError) {
    if(isAuthenticated()) {
      $http.get('/api/auth/me').then(function(response) {
        onSuccess(response);
      }, function(response) {
        localStorageService.remove('token');
        onError(response);
      });
    }
  };

  function login(data, onSuccess, onError) {
    $http.post('/api/auth/login', data).then(function(response) {
      localStorageService.set('token', 'Bearer ' + response.data.token);
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  function logout(onSuccess, onError) {
    if(isAuthenticated()) {
      $http.get('/api/auth/logout').then(function(response) {
        localStorageService.remove('token');
        onSuccess(response);
      }, function(response) {
        onError(response);
      });
    }
  };

  function signup(data, onSuccess, onError) {
    $http.post('/api/auth/signup', data).then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  function confirm(data, onSuccess, onError) {
    $http.post('/api/auth/confirm', data).then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

	function update(id, data, onSuccess, onError) {
		$http.put('api/auth/' + id + '/update', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function attachRole(id, data, onSuccess, onError) {
		$http.put('api/auth/' + id + '/attach/role', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function detachRole(id, data, onSuccess, onError) {
		$http.put('api/auth/' + id + '/detach/role', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

  function recover(data, onSuccess, onError) {
    $http.post('/api/auth/recovery', data).then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  function reset(data, onSuccess, onError) {
    $http.post('/api/auth/reset', data).then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  function isAuthenticated() {
    if(localStorageService.get('token')) {
      return true;
    } else {
      return false;
    }
  };

  return {
    me: me,
    login: login,
    logout: logout,
    signup: signup,
    confirm: confirm,
    update: update,
    attachRole: attachRole,
    detachRole: detachRole,
    recover: recover,
    reset: reset,
    isAuthenticated,
  };

});
