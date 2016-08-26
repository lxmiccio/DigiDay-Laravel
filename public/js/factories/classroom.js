angular.module('myServices').factory('classroomService', function ($http) {

	function getAll(onSuccess, onError) {
		$http.get('api/classrooms').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function getById(id, onSuccess, onError) {
		$http.get('api/classrooms/' + id).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function create(data, onSuccess, onError) {
		$http.post('api/classrooms', data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function update(id, data, onSuccess, onError) {
		$http.put('api/classrooms/' + id, data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	};

	function remove(id, onSuccess, onError) {
		$http.delete('api/classrooms/' + id).then(function() {
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
