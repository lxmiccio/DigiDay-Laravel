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

	function remove(id, onSuccess, onError) {
		$http.delete('api/users/' + id).then(function() {
			onSuccess();
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
    remove: remove
  };

});
