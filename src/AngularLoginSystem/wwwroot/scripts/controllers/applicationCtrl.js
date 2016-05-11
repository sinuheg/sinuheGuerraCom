'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular')
  .controller('ApplicationCtrl', function ($scope,USER_ROLES) {
      $scope.currentUser = null;
      $scope.userRoles = USER_ROLES;

      $scope.setCurrentUser = function (user) {
          $scope.currentUser = user;
      };

  });