/** JQuery */
var $ = jQuery = require('jquery');

/** Bootstrap */
var bootsrap = require('bootstrap');

/** Angular deps */
var angular         = require('angular');
var angularRoute    = require('angular-route');
var angularAnimate  = require('angular-animate');
/**
 * Controllers
 */

var mainController             = require('./controllers/MainController');
var inscriptionController      = require('./controllers/InscriptionController');
var headerController           = require('./controllers/HeaderController');
var accountDetails             = require('./controllers/AccountDetailsController');
var upgradeController          = require('./controllers/accountDetails/upgradeAccount');
var uploadController           = require('./controllers/accountDetails/uploadPhoto');
var managePhotosController     = require('./controllers/accountDetails/managePhotos');
var accueilController          = require('./controllers/AccueilController');
var detailsPhotoController     = require('./controllers/DetailsPhotoController');
var administratorController    = require('./controllers/adminDetails/AdministratorController');
var reportedPhotosController    = require('./controllers/adminDetails/ReportedPhotosController');
var memMgmtController          = require('./controllers/adminDetails/memMgmt');
var searchController		   = require('./controllers/SearchController');
var navsidebarController	   = require('./controllers/NavsidebarController');

/**
 * Services
 */
var memberService = require('./services/MemberService');
var sellerService = require('./services/SellerService');
var localService = require('./services/LocalService');
var httpInterceptor = require('./services/HttpInterceptor');
var apiToken = require('./services/ApiToken');
var searchService = require('./services/SearchService');
var authentificationService = require('./services/AuthentificationService');
var uploadPhoto  = require('./services/uploadPhoto');
var publicPhoto  = require('./services/PublicPhotoService');
var properties  = require('./services/propertiesService');
var alertService = require('./services/AlertService');
var tokenRefresh = require('./services/tokenRefresh');

/**
 * Directives
 */
var inputFileDir = require('./directives/InputFile');
var focusOnLoad = require('./directives/FocusOnLoad'); // module de focus sur les inputs de formumaires on page load

/**
 * Modules
 */
var photoModule      = require('./Photos/Module');
var pageModule       = require('./SellerPage/Module');
var cartModule       = require('./Cart/Module');
var orderModule      = require('./Orders/Module');
var sellerAnalytics  = require('./Sellers/Module');
var memberModule	 = require('./Member/Module');
var followModule     = require('./Follow/Module');
var tags             = require('./Tags/Module');
/**
 *
 * @type {module}
 */

var ecomApp = require("./app.js");

ecomApp.config(function ($routeProvider, $httpProvider) {

    $routeProvider
        .when('/accueil', {
            templateUrl : './js/templates/accueil/accueil.html',
            controller : 'accueilController'
        })
        .when('/search', {
            templateUrl : './js/templates/searchResult.html',
            controller : 'searchController'
        })
        .when('/photos/details/:id', {
            templateUrl : './js/templates/photoDetails.html',
            controller : 'detailsPhotoController'
        })
        .when('/inscription/:type?', {
            templateUrl: './js/templates/inscription.html',
            controller: 'inscriptionController'
        })
        .when('/profil', {
            templateUrl: './js/templates/accountDetails.html',
            controller: 'accountDetails'
        })
        .when('/profil/:section', {
            templateUrl: './js/templates/accountDetails.html',
            controller: 'accountDetails'
        })
        .when('/', {
            redirectTo: '/accueil'
        })
        .when('/seller/page/:id', {
            templateUrl : './js/SellerPage/Page/PageTemplate.html',
            controller : 'pageController'
        })
        .when('/contactUs', {
            templateUrl : './js/templates/contactUs.html'
        //    controller : 'pageController'
        })
        .otherwise({
        	redirectTo: '/accueil'
        });

    $httpProvider.interceptors.push('httpInterceptor', httpInterceptor);

});

ecomApp.directive('ecomInputFile', inputFileDir);
ecomApp.directive('focusOnLoad', focusOnLoad);

ecomApp.factory('memberService', memberService);
ecomApp.factory('sellerService', sellerService);
ecomApp.factory('localService', localService);
ecomApp.factory('authentificationService', authentificationService);
ecomApp.factory('apiToken', apiToken);
ecomApp.factory('searchService', searchService);
ecomApp.factory('httpInterceptor', httpInterceptor);
ecomApp.factory('uploadPhoto', uploadPhoto);
ecomApp.factory('publicPhoto', publicPhoto);
ecomApp.factory('properties', properties);
ecomApp.factory('tokenRefresh', tokenRefresh);
ecomApp.factory('alertService', alertService);

ecomApp.controller('inscriptionController', inscriptionController);
ecomApp.controller('mainController', mainController);
ecomApp.controller('accountDetails', accountDetails);
ecomApp.controller('upgradeController', upgradeController);
ecomApp.controller('uploadPhoto', uploadController);
ecomApp.controller('managePhotos', managePhotosController);
ecomApp.controller('accueilController', accueilController);
ecomApp.controller('detailsPhotoController', detailsPhotoController);
ecomApp.controller('administratorController', administratorController);
ecomApp.controller('reportedPhotosController', reportedPhotosController);
ecomApp.controller('memMgmtController', memMgmtController);
ecomApp.controller('searchController', searchController);
ecomApp.controller('navsidebarController', navsidebarController);

ecomApp.filter('highlight', function($sce) {
  return function(text, phrase) {
    var tokens = phrase.trim().split(/\b\s+/).join('|');
    if (phrase) text = text.replace(new RegExp('('+tokens+')', 'gi'), '<span class="highlighted">$1</span>');
    return $sce.trustAsHtml(text);
  }
});

ecomApp.filter('matchQueries', function() {
  return function(items, phrase) {
    var tokens = phrase.toLowerCase().split(/\b\s+/);
    var filtered = [];
    angular.forEach(items, function(item) {
      var matched = false;
      angular.forEach(tokens, function(token) {
        if(!matched && (item.description.toLowerCase().indexOf(token) > -1 || item.name.toLowerCase().indexOf(token) > -1
         || (item.tags && item.tags.indexOf(token) > -1))) {
          filtered.push(item);
          matched = true;
        }
      });
    });
    return filtered;
  };
});

ecomApp.filter('matchQueriesMember', function() {
  return function(items, phrase) {
    var tokens = phrase.toLowerCase().split(/\b\s+/);
    var filtered = [];
    angular.forEach(items, function(item) {
      var matched = false;
      angular.forEach(tokens, function(token) {
        if(!matched &&
          (item.firstName.toLowerCase().indexOf(token) > -1
          || item.lastName.toLowerCase().indexOf(token) > -1
          || item.login.toLowerCase().indexOf(token) > -1
          || item.email.toLowerCase().indexOf(token) > -1
          || item.sellerInfo.rib.toLowerCase().indexOf(token) > -1)) {
          filtered.push(item);
          matched = true;
        }
      });
    });
    return filtered;
  };
});

ecomApp.filter('shorten', function () {
  return function (value, wordwise, max, tail) {
    if (!value) return '';

    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;

    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
      if (lastspace != -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail || ' …');
  };
});

ecomApp.filter('elapsed', function(){
    return function(date){
        if (!date) return;
        var time = date,
            timeNow = new Date().getTime(),
            difference = timeNow - time,
            seconds = Math.floor(difference / 1000),
            minutes = Math.floor(seconds / 60),
            hours = Math.floor(minutes / 60),
            days = Math.floor(hours / 24);
        if (days > 1) {
            return days + " jours";
        } else if (days == 1) {
            return "1 jour"
        } else if (hours > 1) {
            return hours + " heures";
        } else if (hours == 1) {
            return "une heure";
        } else if (minutes > 1) {
            return minutes + " minutes";
        } else if (minutes == 1){
            return "une minute";
        } else {
            return "quelques secondes";
        }
    }
});


ecomApp.run(function(apiToken, tokenRefresh) {

    if(apiToken.isAuthentificated()) {
        tokenRefresh.refresh().then(function(res) {
            apiToken.setToken(res.data.token);
            apiToken.setUser(res.data.user);
        }, function(res){
            apiToken.setToken(null);
            apiToken.setUser(null);
        });
    }
});
