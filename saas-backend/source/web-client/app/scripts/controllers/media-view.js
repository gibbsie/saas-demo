'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MediaViewCtrl
 * @description
 * # MediaViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp').controller('MediaViewCtrl', function ($scope, $location, $http, $route, $routeParams, Constants) {

  $http.get(Constants.MEDIA_MANAGER_URL + '/media/' + $routeParams.id)
    .then(function (response) {
      $scope.media = response.data;
    })
    .catch(function (response) {
      console.log('Error getting media: ' + response.message);
    })
    .finally(function () {
      console.log('Finished getting media');
    });
});
