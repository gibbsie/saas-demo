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
        sku: $scope.media.sku,
        title: $scope.media.title,
        description: $scope.media.description,
        condition: $scope.media.condition,
        conditionDescription: $scope.media.conditionDescription,
        numberInStock: $scope.media.numberInStock,
        unitCost: $scope.media.unitCost
      };

      $http.post(Constants.MEDIA_MANAGER_URL + '/media', media)
        .then(function(response) {
          console.log('Media added');
          $scope.media.sku = '';
          $scope.media.title = '';
          $scope.media.description = '';
          $scope.media.condition = '1';
          $scope.media.conditionDescription = '';
          $scope.media.numberInStock = 0;
          $scope.media.unitCost = 0;
          $route.reload();
        })
        .catch(function(response) {
          $scope.error = "Error saving media: " + response.message;
          console.log("Error saving media: " + response.message);
        })
    };

    $scope.cancel = function() {
      $location.path('/media/all');
    };
  });
