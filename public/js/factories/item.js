angular.module('myServices').factory('itemService', function ($http) {

	function getAll(onSuccess, onError) {
		$http.get('api/items').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function getById(id, onSuccess, onError) {
		$http.get('api/items/' + id).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function create(data, onSuccess, onError) {
		$http.post('api/items', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function update(id, data, onSuccess, onError) {
		$http.put('api/items/' + id, data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

  function enable(id, data, onSuccess, onError) {
		$http.put('api/items/' + id + '/enable', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
  };

  function disable(id, data, onSuccess, onError) {
		$http.put('api/items/' + id + '/disable', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
  };

	return {
		getAll: getAll,
		getById: getById,
		create: create,
		update: update,
		enable: enable,
		disable: disable
	};

});
