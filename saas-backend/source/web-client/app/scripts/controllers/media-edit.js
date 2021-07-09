'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MediaEditCtrl
 * @description
 * # MediaEditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp').controller('MediaEditCtrl', function ($scope, $location, $http, $route, $routeParams, Constants) {
  // fetch the item to edit
  $scope.media = {};
  $scope.editMedia = true;

  $http.get(Constants.MEDIA_MANAGER_URL + '/media/' + $routeParams.id)
    .then(function(response) {
      $scope.media = response.data;
    })
    .catch(function(response) {
      $scope.error = "Error getting media: " + response.message;
      console.log('Error getting media: ' + response.message);
    })
    .finally(function() {
      console.log('Finished getting media');
    });


  $scope.saveMedia = function() {
    var media = {
      id: $scope.media.id,
      title: $scope.media.title,
      description: $scope.media.description,
      genre: $scope.media.genre,
      cast: $scope.media.cast,
      rating: $scope.media.rating,
      unitCost: $scope.media.unitCost
    };

    $http.put(Constants.MEDIA_MANAGER_URL + '/media', media)
      .then(function(response) {
        console.log('Media updated');
        $location.path('/media');
      })
      .catch(function(response) {
        $scope.error = "Error updating media: " + response.message;
        console.log("Error updating media: " + response.message);
      })
  };

  $scope.cancel = function() {
    $location.path('/media');
  };
});
