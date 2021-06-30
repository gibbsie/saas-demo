'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MediaCtrl
 * @description
 * # MediaCtrl
 * Controller of the clientApp
 */
angular.module('clientApp').controller('MediaCtrl', function ($scope, $http, Constants) {
  $http.get(Constants.MEDIA_MANAGER_URL + '/media/all')
    .then(function(response) {
      $scope.media = response.data;
    })
    .catch(function(response) {
      console.error('Error getting media', response.status, response.data);
    })
    .finally(function() {
      console.log('Finished getting media');
    });
});
