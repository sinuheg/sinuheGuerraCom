'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular')
  .controller('DashboardCtrl', function($scope, $state, $rootScope, $timeout) {

    $scope.$state = $state;

    $scope.date = new Date();
    $scope.eventSources = [];

  	$rootScope.$on('$stateChangeSuccess', function(){ 
		$timeout(function() {
			$('#body-container').scrollTop(0);
		}, 200);
	});
  
  });