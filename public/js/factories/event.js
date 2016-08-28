angular.module('myServices').factory('eventService', function ($http, localStorageService, userService) {

	function getAll(onSuccess, onError) {
		$http.get('api/events').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function getById(id, onSuccess, onError) {
		$http.get('api/events/' + id).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function create(data, onSuccess, onError) {
		$http.post('api/events', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function update(id, data, onSuccess, onError) {
		$http.put('api/events/' + id, data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function attachUser(id, data, onSuccess, onError) {
		$http.put('api/events/' + id + '/attach/user', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function detachUser(id, data, onSuccess, onError) {
		$http.put('api/events/' + id + '/detach/user', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function attachItem(id, data, onSuccess, onError) {
		$http.put('api/events/' + id + '/attach/item', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function detachItem(id, data, onSuccess, onError) {
		$http.put('api/events/' + id + '/detach/item', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function remove(id, onSuccess, onError) {
		$http.delete('api/events/' + id).then(function() {
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
		attachUser: attachUser,
		detachUser: detachUser,
		attachItem: attachItem,
		detachItem: detachItem,
		remove: remove
	};

});
