'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular')
  .controller('LoginCtrl', function ($scope, $location, $rootScope, AUTH_EVENTS) {
      $scope.credentials = {
          username: '',
          password: ''
      };
      $scope.submit = function (credentials) {
          $location.path('/dashboard');
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(credentials);
          return false;
      }

  });
