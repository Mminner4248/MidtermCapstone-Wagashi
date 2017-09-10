"use strict";

app.factory("APIFactory", function($scope, $q, $http){

    const getAllDefs = function(){
        let results = [];
    return $q((resolve, reject) => {
        $http.get("http://jisho.org/api/v1/search/words?keyword=" + $scope.search)
        .then((itemObject) => {
            let itemCollection = itemObject.data;
            console.log("itemCollection", itemCollection);
            Object.keys(itemCollection).forEach((key) =>{
                itemCollection[key].id = key;
                results.push(itemCollection[key]);
            });
            resolve(results);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

return {getAllDefs};
});