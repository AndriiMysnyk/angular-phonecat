'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
    $scope.carrierProp = 'all';

    $scope.filterPhones = function(phone) {
        switch ($scope.carrierProp) {
            case "all":
                return phone;

            case "none":
                return phone.carrier == undefined ? phone : null;

            default:
                if ($scope.carrierProp != phone.carrier) {
                    return;
                }
                return phone;
        }
    }
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
