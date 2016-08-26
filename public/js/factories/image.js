angular.module('myServices').factory('imageService', function ($http, Upload, userService) {

  function upload(data, onSuccess, onError) {
    Upload.upload({url: 'api/images/upload', data: data}).then(function(response) {
      onSuccess(response)
    }, function(response) {
      onError(response);
    });
  };

  function remove(data, onSuccess, onError) {
    $http.post('api/images/remove', data).then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  return {
    upload: upload,
    remove: remove
  };

});
