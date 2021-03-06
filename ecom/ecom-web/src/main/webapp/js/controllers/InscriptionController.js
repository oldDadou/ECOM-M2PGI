var angular = require('angular');

var InscriptionController = function ($scope, $sce, $routeParams, apiToken, memberService, sellerService, cartService, $location, authentificationService, alertService) {

    if (apiToken.isAuthentificated()) {
        $location.path('/');
    }
    ;

    $scope.sellerTemplate = './js/templates/sellerInscription.html';

    $scope.user = {
        email: "",
        firstName: "",
        lastName: "",
        accountType: 'N',
        password: "",
        sellerInfo: {
            rib: ""
        }
    };

    $scope.sellerCheckBox = $routeParams.type == 'seller';
    $scope.existingLogin = false;
    $scope.existingEmail = false;
    $scope.checkPass = {
        valide: true,
        message: ""
    };

    $scope.submitInscription = function () {
        var res = null;
        $scope.user.cart = cartService.getCart();
        if ($scope.sellerCheckBox) {
            res = sellerService.Create($scope.user);
            $scope.user.accountType = 'S';
        } else if (!$scope.sellerCheckBox) {
            res = memberService.Create($scope.user);
            $scope.user.accountType = 'M';
            delete $scope.user.sellerInfo;
        }
        if (res != null) {
            res.then(function (res) {
                if (res.success == false) {
                    alertService.add("alert-danger", $sce.trustAsHtml("<strong>Erreur, lors de l'inscription</strong>"), 1000);
                    return false;
                } else {
                    alertService.add("alert-success", $sce.trustAsHtml("<strong>Enregistré !</strong>"), 2000);
                    return authentificationService.login($scope.user.login, $scope.user.password);
                }
            }).then(function (res) {
                if (res.success) {
                    if ($routeParams.redirect) {
                        if ($routeParams.payLoad) {
                            $location.search('payLoad', $routeParams.payLoad)
                        }
                        $location.path($routeParams.redirect);
                    } else   {
                            if ($scope.user.accountType == 'S') {
                                $location.path("/profil/myPage").search('first');
                            } else {
                                $location.path("/accueil");
                            }
                    }
                } else {
                	alertService.add("alert-danger", $sce.trustAsHtml("<strong>Error lors de l'inscription</strong>"), 5000);
                    $location.path("/inscription");
                }
            });
        }
    };

    $scope.logInto = function () {
        authentificationService.login($scope.login, $scope.password).then(function (res) {
                if (res.success) {
                    if ($routeParams.redirect) {
                        if ($routeParams.payLoad) {
                            $location.search('payLoad', $routeParams.payLoad)
                        }
                        $location.path($routeParams.redirect);
                    } else {
                        $location.path("/accueil");
                    }
                } else {
                	alertService.add("alert-danger", $sce.trustAsHtml("<strong>Erreur lors de l'authentification </strong>"), 5000);
                    $location.path("/inscription");
                }
            }
        );
    };
    
    /*$scope.checkPassword = function() {
		if(!$scope.user.password) {
			$scope.checkPass.valide = false;
			$scope.checkPass.message = "Le champs mot de passe est obligatoire !";
		} else if($scope.user.password.length <= 4) {
			$scope.checkPass.valide = false;
			$scope.checkPass.message = "Le mot de passe est très court !";
		} else {
			$scope.checkPass.valide = true
		}
	};*/

    $scope.checkLogin = function () {
    	
    	
    	$scope.inscriptionform.loginInput.$setValidity("inscription login", true);
    	$scope.existingLogin = false;
    	
        if ($scope.user.login) {
            memberService.IsExisting($scope.user.login).then(function (res) {
                if (res) {
                    $scope.existingLogin = true;
                    $scope.inscriptionform.loginInput.$setValidity("inscription login", false);
                } else {
                    $scope.existingLogin = false;
                    $scope.inscriptionform.loginInput.$setValidity("inscription login", true);
                }
                return $scope.existingLogin;
            });
        }
    }

    $scope.checkEmail = function () {
    	
    	
    	$scope.inscriptionform.inputEmail.$setValidity("inscription email", true);
    	$scope.existingEmail = false;
        if ($scope.user.email) {
            memberService.IsExistingByEmail($scope.user.email).then(function (res) {
                if (res) {
                    $scope.existingEmail = true;
                    $scope.inscriptionform.inputEmail.$setValidity("inscription email", false);
                } else {
                    $scope.existingEmail = false;
                    $scope.inscriptionform.inputEmail.$setValidity("inscription email", true);
                }
                return $scope.existingEmail;
            });
        }
        
    }
};

module.exports = InscriptionController;
