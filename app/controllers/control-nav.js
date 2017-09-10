"use strict";

//provides the functionality for the navbar partial. Checks if the user is logged in with a true or false. This navbar partial uses this to provide what to show. 

app.controller('navCtrl', function($scope, $window, APIFactory){

$scope.$watch('search', function() {
  getAllDefs();
});

});