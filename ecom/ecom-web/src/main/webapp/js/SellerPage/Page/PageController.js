var angular = require('angular');


var controller = function($scope, $location, $filter, alertService, $routeParams, memberService, sellerService, pageService, publicPhoto, apiToken) {

    var cachedPhotos = [];
    $scope.photos = [];
    $scope.query = '';

    $scope.followerCount = 0;
    $scope.followed = false;
    $scope.logged = false;
    $scope.sameSeller = false;

    if(!$scope.user) { // si le scope parent ne contient pas déjà
        publicPhoto.GetUserPhotosWithId($routeParams.id).then(
            function (res) {
                $scope.photos = cachedPhotos = res;
            }
        );
        pageService.getPage($routeParams.id).then(function (res) {
            $scope.page = res.data;
        });
    }

    sellerService.GetFollowerCount($routeParams.id).then(function(res) {
      $scope.followerCount = res;
    });

    var userIDFollower = 0;
    var followedID = $routeParams.id;
    if(apiToken.isAuthentificated()) {
      userIDFollower  = apiToken.getUser().memberID;
      $scope.logged = true;
      if(userIDFollower == followedID){
        $scope.sameSeller = true;
      }else{
        memberService.IsFollowedBy(followedID, userIDFollower).then(function(res){
          var isFollowed = res;
          $scope.followed = isFollowed;
        });
      }
    }

    $scope.follow = function(){
    	memberService.follow(userIDFollower, followedID).then(function(res){
    		if(res){
    			$scope.followed = true;
                $scope.followerCount ++;
    		}
    	});
    };


    $scope.unfollow = function(){
    	memberService.unfollow(userIDFollower, followedID).then(function(res){
    		if(res){
    			$scope.followed = false;
                $scope.followerCount --;
    		}
    	});
    };

    $scope.details = function(photoId) {
        if(isNaN(photoId)) return;
        $location.path('/photos/details/' + photoId);
    };

    $scope.$on('search', function(event, data) {
      $scope.query = data.query;
      if (!data.query) $scope.photos = cachedPhotos;
      $scope.photos = $filter('matchQueries')(cachedPhotos, data.query);
    });

};

module.exports = controller;
