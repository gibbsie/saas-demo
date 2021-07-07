'use strict';

describe('Controller: MediaEditCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var MediaEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MediaEditCtrl = $controller('MediaEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MediaEditCtrl.awesomeThings.length).toBe(3);
  });
});
