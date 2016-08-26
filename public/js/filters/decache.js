angular.module('myFilters').filter('decache', function(randomString) {
  return function (string) {
    return string + '?decache=' + randomString(32);
  };
});
