angular.module('myServices').factory('roleService', function ($http) {

	function getAll(onSuccess, onError) {
		$http.get('api/roles').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function getById(id, onSuccess, onError) {
		$http.get('api/roles/' + id).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function create(data, onSuccess, onError) {
		$http.post('api/roles', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function update(id, data, onSuccess, onError) {
		$http.put('api/roles/' + id, data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function remove(id, onSuccess, onError) {
		$http.delete('api/roles/' + id).then(function() {
			onSuccess();
		}, function(response) {
			onError(response);
		});
	};

	return {
		getAll: getAll,
		getById: getById,
		create: create,
		update: update,
		remove: remove
	};

});
