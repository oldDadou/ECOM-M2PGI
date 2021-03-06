var angular = require('angular');

module.exports = function ($scope, $location, $sce, $routeParams, apiToken, publicPhoto, alertService, cartService) {

    if($routeParams.payLoad) {
        var init = JSON.parse($routeParams.payLoad);
        if($routeParams.newAccount) {
            init.forEach(function(photo) {
                cartService.addToCart(photo);
            });
        }
    }

    $scope.panierVide = true;
    $scope.totalPrice = 0;
    var cart = $scope.cart = cartService.getCart();

    var updateCart = $scope.$watch(cartService.getCart, function () {
            $scope.cart = cart = cartService.getCart();
            $scope.totalPrice = 0;
            $scope.panierVide = true;
            if ($scope.cart.length > 0) {
                $scope.panierVide = false;
                $scope.cart.forEach(function (elem) {
                    $scope.totalPrice += elem.price;
                });
            }
        }
    );

    $scope.$watch(apiToken.isAuthentificated, function () {
        $scope.cart = cart = cartService.getCart();
    });


    $scope.clearCart = function () {
      if(cart.length) {
        cartService.clearCart().then(function (res) {
            if (res.success)
                apiToken.setUser(res.data);
        });
      }
    };

    $scope.validateCart = function () {
        if (apiToken.isAuthentificated()) {
            cartService.validateCart().then(function (res) {
                if (res.success)
                    apiToken.setUser(res.data);
            }, function (err) {
            });
        } else {
            alertService.add("alert-info", $sce.trustAsHtml("<strong>Pour valider votre panier, veuillez d'abors vous authentifier ou créer un compte <strong>"), 3000);
            $location.path('/inscription').search('redirect', '/profil/myCart').search('payLoad', JSON.stringify(cartService.getCart()));
        }
    }

    $scope.goToPhoto = function(id) {
      $location.path('/photos/details/'+id);
    }
};
