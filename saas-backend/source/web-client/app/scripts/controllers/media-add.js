'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MediaAddCtrl
 * @description
 * # MediaAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp').controller('MediaAddCtrl', function ($scope, $location, $http, $route, Constants) {
    $scope.addMedia = true;

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

      $http.post(Constants.MEDIA_MANAGER_URL + '/media', media)
        .then(function(response) {
          console.log('Media added');
          $scope.media.id = '';
          $scope.media.title = '';
          $scope.media.description = '';
          $scope.media.genre = '1';
          $scope.media.cast = '';
          $scope.media.rating = 0;
          $scope.media.unitCost = 0;
          $route.reload();
        })
        .catch(function(response) {
          $scope.error = "Error saving media: " + response.message;
          console.log("Error saving media: " + response.message);
        })
    };

    $scope.cancel = function() {
      $location.path('/media');
    };
  });
