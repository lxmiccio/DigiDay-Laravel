angular.module("myControllers").controller("UpdateCategoryController", function ($filter, $location, $routeParams, categoryService, imageService, prService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  categoryService.getById($routeParams.id, function(response) {
    vm.category = response.data.data;

    vm.name = vm.category.name;
    vm.image = vm.category.image;

    prService.getAll(function(response) {
      vm.allPrs = response.data.data;
      vm.filteredPrs = $filter('newPrs')(vm.allPrs, vm.category);
    }, function(response) {
      console.log(response);
    });

  }, function(response) {
    console.log(response);
  });

  vm.removeImage = function() {
    vm.image = null;
  };

  vm.restoreImage = function(image) {
    vm.image = image;
  };

  vm.changeImage = function(image) {
    if(image) {
      vm.image = image;
    }
  };

  vm.updateCategory = function(name, image, category) {
    if(image && category.image && image != category.image) {
      imageService.remove({
        image: category.image
      }, function(response) {

        imageService.upload({
          'image': image,
          'directory': 'categories',
          'filename': category.id
        }, function(response) {

          categoryService.update(category.id, {
            name: name,
            image: response.data.image
          }, function(response) {
            vm.category = response.data.data;
            vm.filteredPrs = $filter('newPrs')(vm.allPrs, vm.category);
          }, function(response) {
            console.log(response);
          });

        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
    else if(image && category.image && image == category.image) {
      categoryService.update(category.id, {
        name: name,
        image: image
      }, function(response) {
        vm.category = response.data.data;
        vm.filteredPrs = $filter('newPrs')(vm.allPrs, vm.category);
      }, function(response) {
        console.log(response);
      });
    }
    else if(image && !category.image) {
      imageService.upload({
        'image': image,
        'directory': 'categories',
        'filename': category.id
      }, function(response) {

        categoryService.update(category.id, {
          name: name,
          image: response.data.image
        }, function(response) {
          vm.category = response.data.data;
          vm.filteredPrs = $filter('newPrs')(vm.allPrs, vm.category);
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
    else if(!image && category.image) {
      imageService.remove({
        image: category.image
      }, function(response) {

        categoryService.update(category.id, {
          name: name,
          image: image
        }, function(response) {
          vm.category = response.data.data;
          vm.filteredPrs = $filter('newPrs')(vm.allPrs, vm.category);
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });
    }
    else if(!image && !category.image) {
      categoryService.update(category.id, {
        name: name,
        image: image
      }, function(response) {s
        vm.category = response.data.data;
        vm.filteredPrs = $filter('newPrs')(vm.allPrs, vm.category);
      }, function(response) {
        console.log(response);
      });
    }
  };

  vm.createPr = function(firstName, lastName, category) {
    prService.create({
      first_name: firstName,
      last_name: lastName
    }, function(response) {

      categoryService.attachPr(category.id, {
        pr_id: response.data.data.id
      }, function(response) {

        vm.category = response.data.data;

        prService.getAll(function(response) {
          vm.firstName = '';
          vm.lastName = '';

          vm.allPrs = response.data.data;
          vm.filteredPrs = $filter('newPrs')(vm.allPrs, vm.category);
        }, function(response) {
          console.log(response);
        });

      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  };

  vm.attachPrs = function(prs, category) {
    angular.forEach(prs, function(pr) {
      categoryService.attachPr(category.id, {
        pr_id: pr.id
      }, function(response) {
        vm.category = response.data.data;
        vm.filteredPrs = $filter('newPrs')(vm.allPrs, vm.category);
      }, function(response) {
        console.log(response);
      });
    });
  };

  vm.detachPr = function(pr, category) {
    categoryService.detachPr(category.id, {
      pr_id: pr.id
    }, function(response) {

      categoryService.getById(category.id, function(response) {
        vm.category = response.data.data;
        vm.filteredPrs = $filter('newPrs')(vm.allPrs, vm.category);
      }, function(response) {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });
  }

  vm.redirect = function(path) {
    $location.path(path);
  };

});
