"use strict";

app.controller('cardListCtrl', function($scope, APIService){
    $scope.APIService = APIService;
    console.log("Scope results", $scope.results);

    // const showAllDefs = function(){
    //    let results = APIFactory.getResults();
    //         console.log("getResults from promise", results);
    //         $scope.results = results;
    // };
    // showAllDefs();
});