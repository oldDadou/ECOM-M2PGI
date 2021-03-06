var angular = require('angular');
var ecomApp = require('./../app');

var navsidebarController = function($scope, $location, $rootScope, $routeParams, apiToken) {
  $scope.auth = false;
  $scope.seller = false;
  $scope.admin = false;
  $scope.url = "";

    $scope.$watch(apiToken.isAuthentificated, function(isAuth) {
            $scope.auth = isAuth;
            if($scope.auth) {
                $scope.user = apiToken.getUser();
                var userWatch = $scope.$watch(apiToken.getUser, function(user) {
                    $scope.user = user;
                    $scope.seller = (user && user.accountType == "S");
                    $scope.admin  = (user && user.accountType == "A");
                });
            } else {
                $scope.auth = false;
                $scope.seller = false;
                $scope.admin = false;
                if(userWatch) userWatch();
            }
        }
    );

    $scope.$on('$routeChangeSuccess', function(event){
        $scope.url = $location.url();
    });

    $scope.isActiveClass = function(checkedUrl, pageTitle) {
        if ($scope.url.indexOf(checkedUrl) > -1) {
            $rootScope.pageTitle = pageTitle+" | ";
            return "activeTab";
        }else{
            //$rootScope.pageTitle = "";
            return "";
        }
    };
};

ecomApp.controller('navsidebarController', navsidebarController);
module.exports = navsidebarController;
