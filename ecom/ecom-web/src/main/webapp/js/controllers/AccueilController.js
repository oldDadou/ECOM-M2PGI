var angular = require('angular');

var accueilController = function($scope, $location, publicPhoto) {
    var cachedPhotos = [];

    publicPhoto.GetAll().then(function(res) {
            $scope.photos = cachedPhotos = res;
        }
    );

    $scope.details = function(photoId) {
        if(isNaN(photoId)) return;
        if($scope.photos) {
            var photo = $scope.photos.find(function(photo) {
                return (photo.photoID == photoId);
            });
        }
        if(photo)
            $location.path('/photos/details/' + photoId).search( {
                'photo' :JSON.stringify(photo)
            });
    };

    $scope.search = {
        terms : '',
        hitCount : 0,
        took : 0
    };

    $scope.elasticsearch = function (){
      publicPhoto.Search($scope.terms).then(function(res) {
        $scope.search.terms = $scope.terms;
        $scope.search.hitCount = res.totalHits;
        $scope.search.took = res.took;
        $scope.photos = res.hits;
      });
    };

    $scope.photosFromCache = function (){
      $scope.terms = '';
      $scope.search.hitCount = null;
      $scope.photos = cachedPhotos;
    }

};

module.exports = accueilController;
