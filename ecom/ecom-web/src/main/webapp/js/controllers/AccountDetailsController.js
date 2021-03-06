var angular = require('angular');

var templates = {
    'details'   : './js/Member/details.html',
    'upgrade'   : './js/templates/accountDetails/upgrade.html',
    'addPhoto'  : './js/templates/accountDetails/addPhoto.html',
    'managePhotos' : './js/templates/accountDetails/managePhotos.html',
    'stats'     : './js/templates/administrationDetails/adminStats.html',
    'members'   : './js/templates/administrationDetails/adminMemMgmt.html',
    'reportedPhotos'   : './js/templates/administrationDetails/reportedPhotos.html',
    'adminNav'  : './js/templates/administrationDetails/AdminNavBar.html',
    'myCart'    : './js/Cart/detailsCart/CartDetails.html',
    'history'   : './js/Orders/OrdersHistory/ordersHistory.html',
    'wishList'  : './js/Photos/WishList/wishlist.html',
    'following' : './js/Follow/following.html',
    'sellerNav' : './js/templates/accountDetails/SellerNavBar.html',
    'memberNav' : './js/templates/accountDetails/MemberNavBar.html',
    'myPage'    : './js/SellerPage/ManagePage/managePageTemplate.html',
    'gallery'   : './js/Member/Gallery/galleryTemplate.html',
    'sellerAnalytics' : 'js/Sellers/SellerAnalytics/SellerAnalyticsTemplate.html'
};

var accountDetails = function($scope, $routeParams, $location, apiToken) {

    $scope.templates = templates;
    $scope.subview   = "details";
    $scope.setView   = setView;

    if($routeParams.section) {
        $scope.subview = $routeParams.section;
    }

    if(apiToken.isAuthentificated()) {
        $scope.user  = apiToken.getUser();
    }

    $scope.$watch(
        apiToken.getUser, function() {
            $scope.user = apiToken.getUser();
        }
    );

    function setView(view) {
        $location.path("/profil/" + view);
    }
};

module.exports = accountDetails;
