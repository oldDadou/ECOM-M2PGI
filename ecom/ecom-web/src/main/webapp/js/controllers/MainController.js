var angular = require('angular');

var templates = {
	alertTemplate  : './js/templates/alertTemplate.html',
	headerTemplate : './js/templates/header.html',
	navsidebarTemplate : './js/templates/navsidebar.html'
};

var MainController = function($scope, alertService) {
	$scope.templates = templates;
	$scope.alerts    = alertService.get();
};

module.exports = MainController;