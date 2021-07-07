'use strict';

describe('Controller: MediaViewCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var MediaViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MediaViewCtrl = $controller('MediaViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MediaViewCtrl.awesomeThings.length).toBe(3);
  });
});
