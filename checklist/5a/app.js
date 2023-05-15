// Define your AngularJS module
var myApp = angular.module('myApp', []);

// Define a controller
myApp.controller('myController', ['$scope', 'myService', function($scope, myService) {
    $scope.myData = myService.getData();
}]);

// Define a service
myApp.service('myService', function() {
    var data = ['one', 'two', 'three'];

    this.getData = function() {
        return data;
    };
});

// Define a component
myApp.component('myComponent', {
    template: '<ul><li ng-repeat="item in $ctrl.items">{{item}}</li></ul>',
    controller: function() {
        this.items = ['apple', 'banana', 'cherry'];
    }
});
