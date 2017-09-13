"use strict";

app.service("APIService", function($http, $q){
    this.results = [];

    this.filterSearch = function(itemCollection){
        console.log("itemCollection in filter", itemCollection.data); 
       
        this.results = itemCollection.data.map(function(def) {

            return {
                japanese: def.japanese[0].word,
                furigana: def.japanese[0].reading,
                pos: def.senses[0].parts_of_speech[0],
                definitions: def.senses[0].english_definitions
            };
            
        });
    };

    this.getAllDefs = function(word){
        return $q((resolve, reject) => {
            $http.get("http://jisho.org/api/v1/search/words?keyword=" + word)
                .then((itemObject) => {
                    var itemCollection = itemObject.data;
                    console.log("itemCollection", itemCollection);
                    this.filterSearch(itemCollection);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
            });
    };
});