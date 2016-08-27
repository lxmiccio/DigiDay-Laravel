angular.module('myFilters').filter('newRoles', function() {
  return function (roles, user) {
    if(angular.isArray(roles) && angular.isArray(user.roles)) {
      var newRoles = [];

      angular.forEach(roles, function(role) {
        var found = false;

        angular.forEach(user.roles, function(userRole) {
          if(userRole.id == role.id) {
            found = true;
          }
        });

        if(!found) {
          newRoles.push({
            id: role.id,
            name: role.name,
            ticked: false
          });
        }
      });

      return newRoles;
    } else {
      return roles;
    }
  };
});
