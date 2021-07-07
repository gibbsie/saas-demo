'use strict';

describe('Controller: MediaAddCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var MediaAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MediaAddCtrl = $controller('MediaAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MediaAddCtrl.awesomeThings.length).toBe(3);
  });
});
