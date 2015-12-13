var angular = require('angular');

var InscriptionController = function ($scope, $sce, memberService, sellerService, $location, authentificationService, alertService) {

	$scope.sellerTemplate = './js/templates/sellerInscription.html';

    $scope.user = {
        email: "",
        firstName: "",
        lastName: "",
        accountType: 'N',
		sellerInfo : {
			rib : ""
		}
    };

    $scope.sellerCheckBox = false;
	$scope.existingLogin = false;
    
    $scope.submitInscription = function () {
    	var res = null;
    	
    	if($scope.sellerCheckBox) {
    		res = sellerService.Create($scope.user);
    		$scope.user.accountType = 'S';
    	} else if(!$scope.sellerCheckBox) {
    		res = memberService.Create($scope.user);
    		$scope.user.accountType = 'M';
    		delete $scope.user.sellerInfo;
    	}
    	
    	if(res != null) {
	    		res.then(function (res) {
		            if (res.success == false) {
						alertService.add("alert-danger", $sce.trustAsHtml("<strong>Erreur, lors de l'inscription</strong>"), 1000);
						return false;
		            } else {
						alertService.add("alert-success", $sce.trustAsHtml("<strong>Enregistré !</strong>"), 2000);
						return authentificationService.login($scope.user.login, $scope.user.password);
		            }
	        	}).then(function(res) {
                    if(res.success) {
                        $location.path("/accueil");
                    } else {
						$location.path("/inscription");
                    }
                });
        }
    };

	$scope.logInto = function() {
		authentificationService.login($scope.login, $scope.password).then(
				function(res) {
					if(res.success) {
						$location.path("/");
					} else {
						$location.path("/inscription");
					}
				}
		);
	}

	$scope.checkLogin = function() {
		memberService.IsExisting($scope.user.login).then(
			function(res) {
				if(res) { //login found"
					$location.path("/inscription");
					$scope.existingLogin = true;
					$scope.inscriptionform.loginInput.$setValidity("inscription login", false);
				} else { //login not found"
					$location.path("/inscription");
					$scope.existingLogin = false;
					$scope.inscriptionform.loginInput.$setValidity("inscription login", true);
				}
			}
		);
	}
};

module.exports = InscriptionController;