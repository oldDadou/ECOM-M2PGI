var angular = require('angular');

var pageTemplate = "./js/SellerPage/Page/PageTemplate.html";

var controller = function($scope, $filter, $sce, pageService, sellerService, alertService, apiToken, publicPhoto) {

    var user = {};
    $scope.pageTemplate = pageTemplate;
    $scope.user    = user = apiToken.getUser();
    $scope.modeView     = true;
    $scope.submit       = submit;
    $scope.toogleMode   = toogleMode;
    $scope.followerCount = 0;

    var cachedPhotos = [];
    $scope.photos = [];
    $scope.query = '';


    sellerService.GetFollowerCount($scope.user.memberID).then(function(res) {
        $scope.followerCount = res;
    });

    pageService.getPage($scope.user.memberID).then(function (res) {
        $scope.page = page = res.data;
        publicPhoto.GetUserPhotosWithId($scope.user.memberID).then(
            function (res) {
                $scope.photos = cachedPhotos = res;
            }
        );
    });


    function submit() {
        pageService.updatePage(user.memberID, $scope.page).then(function(res) {
            if(res.success) {
                $scope.page = res.data;
                alertService.add("alert-info", $sce.trustAsHtml("<strong>Votre page a bien été mise à jour ! </strong>"), 1000);
                toogleMode();
            }
        })
    }

    function toogleMode() {
        $scope.modeView = !$scope.modeView;
    }

    $scope.$on('search', function(event, data) {
      $scope.query = data.query;
      if (!data.query) $scope.photos = cachedPhotos;
      $scope.photos = $filter('matchQueries')(cachedPhotos, data.query);
    });
};

module.exports = controller;
