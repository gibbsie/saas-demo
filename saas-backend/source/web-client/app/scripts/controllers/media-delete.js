'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MediaDeleteCtrl
 * @description
 * # MediaDeleteCtrl
 * Controller of the clientApp
 */
angular.module('clientApp').controller('MediaDeleteCtrl', function ($scope, $location, $http, $route, $routeParams, Constants) {
  // fetch the item to delete
  $http.get(Constants.MEDIA_MANAGER_URL + '/media/' + $routeParams.id)
    .then(function(response) {
      $scope.media = response.data;
    })
    .catch(function(response) {
      $scope.error = "Error getting order: " + response.message;
      console.log('Error getting media: ' + response.message);
    })
    .finally(function() {
      console.log('Finished getting media');
    });

  // delete the media
  $scope.deleteMedia = function() {
    $http.delete(Constants.MEDIA_MANAGER_URL + '/media/' + $scope.media.media_id)
      .then(function (response) {
        console.log('Media delete');
        $location.path('/media/all');
      })
      .catch(function (response) {
        $scope.error = "Error deleting media: " + response.message;
        console.log("Error deleting media: " + response.message);
      })
  };

  $scope.back = function() {
    $location.path('/media/all');
  };
});
