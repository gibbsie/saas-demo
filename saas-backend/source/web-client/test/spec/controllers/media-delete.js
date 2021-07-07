'use strict';

describe('Controller: MediaDeleteCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var MediaDeleteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MediaDeleteCtrl = $controller('MediaDeleteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MediaDeleteCtrl.awesomeThings.length).toBe(3);
  });
});
