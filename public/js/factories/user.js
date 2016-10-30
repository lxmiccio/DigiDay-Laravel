angular.module('myServices').factory('userService', function ($http, localStorageService) {

  function getAll(onSuccess, onError) {
		$http.get('api/users').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function getById(id, onSuccess, onError) {
		$http.get('api/users/' + id).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function create(data, onSuccess, onError) {
		$http.post('api/users', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function updateEmail(id, data, onSuccess, onError) {
		$http.put('api/users/' + id + '/update/email', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function updateImage(id, data, onSuccess, onError) {
		$http.put('api/users/' + id + '/update/image', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function attachRole(id, data, onSuccess, onError) {
		$http.put('api/users/' + id + '/attach/role', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function detachRole(id, data, onSuccess, onError) {
		$http.put('api/users/' + id + '/detach/role', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function attend(id, data, onSuccess, onError) {
		$http.put('api/users/' + id + '/attended', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

  function enable(id, data, onSuccess, onError) {
		$http.put('api/users/' + id + '/enable', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
  };

  function disable(id, data, onSuccess, onError) {
		$http.put('api/users/' + id + '/disable', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
  };

  return {
    getAll: getAll,
    getById: getById,
    create: create,
    updateEmail: updateEmail,
    updateImage: updateImage,
    attachRole: attachRole,
    detachRole: detachRole,
    attend: attend,
    enable: enable,
    disable: disable
  };

});
