var angular = require('angular');

var accueilController = function($scope, $location, $routeParams, $filter, localService, apiToken, publicPhoto) {

  $scope.photos = [];
  var cachedPhotos = [];
  $scope.welcome = true;

  /*if(localService.get('welcome') !== null) {
    $scope.welcome = false;
  } else {
    localService.set('welcome', true);
  }*/

  $scope.search = {
    active : false,
    searching : false,
    terms : '',
    lastTerms : ''
  };

  if($routeParams.terms) {
    $scope.search.lastTerms = $scope.search.terms = $routeParams.terms;
    $scope.search.searching = true;
    publicPhoto.Search($scope.search.terms).then(function(res) {
      $scope.photos = res;
      $scope.search.searching = false;
    });
  } else {
    publicPhoto.GetAll().then(function(res) {
      $scope.photos = cachedPhotos = res;
    });
  }

  var user;

  if(apiToken.isAuthentificated()) {
    user = apiToken.getUser();
    $scope.welcome = false;
  }

  $scope.register = function() {
    $location.path("/inscription");
  }

  $scope.hideWelcome = function() {
    $scope.welcome = false;
  }

  $scope.elasticsearch = function() {
    if($scope.search.terms) {
      $scope.search.lastTerms = $scope.search.terms;
      $scope.search.searching = true;
      publicPhoto.Search($scope.search.terms).then(function(res) {
        $scope.photos = res;
        $scope.search.searching = false;
      });
    }
  };

  $scope.reset = function() {
      if(!$scope.search.terms) {
        $scope.search.lastTerms = '';
        if(cachedPhotos.length > 0) {
          $scope.photos = cachedPhotos;
        } else {
          publicPhoto.GetAll().then(function(res) {
            $scope.photos = cachedPhotos = res;
          });
        }
      }
  };

  $scope.sort = function(order) {
    if(order == 'date') {
      $scope.photos = $filter('orderBy')($scope.photos, 'dateCreated', true);
    } else if(order == 'price') {
      $scope.photos = $filter('orderBy')($scope.photos, 'price');
    } else if(order == 'priceDesc') {
      $scope.photos = $filter('orderBy')($scope.photos, 'price', true);
    } else if(order == 'views') {
      $scope.photos = $filter('orderBy')($scope.photos, 'views', true);
    } else if(order == 'likes') {
      $scope.photos = $filter('orderBy')($scope.photos, 'likes', true);
    }
  }
};

module.exports = accueilController;
