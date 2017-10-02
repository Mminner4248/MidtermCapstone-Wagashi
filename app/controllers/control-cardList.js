"use strict";
//This controller grabs the APIService array and sets up the function that organizes the object to be saved and pushed up to Firebase.
app.controller('cardListCtrl', function($scope, APIService, homeFactory, userFactory){
    $scope.APIService = APIService;
    console.log("Scope results", $scope.results);

    let user = userFactory.getCurrentUser();

    $scope.isLoggedIn = false;

    firebase.auth().onAuthStateChanged(function(user) {
		if(user) {
			$scope.isLoggedIn = true;
			console.log("CurrenUser logged in", user);
			console.log("logged into firebase", $scope.isLoggedIn);
			$scope.$apply();
		}else{
			$scope.isLoggedIn = false;
			console.log("This user is not logged", $scope.isLoggedIn);
		}
	});

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