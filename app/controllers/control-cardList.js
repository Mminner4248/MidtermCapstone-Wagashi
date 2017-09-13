"use strict";

app.controller('cardListCtrl', function($scope, APIService, homeFactory, userFactory){
    $scope.APIService = APIService;
    console.log("Scope results", $scope.results);

    let user = userFactory.getCurrentUser();

    $scope.submitCard = function(card){
        console.log("user uid", user);
        let newObj = {
            japanese: card.japanese,
            furigana: card.furigana,
            pos: card.pos,
            definitions: card.definitions,
            uid: user
        };
		homeFactory.addCard(newObj);
	};

    
});