"use strict";

app.controller('homeViewCtrl', function($scope, homeFactory, userFactory){
    $scope.userCards = [];
	let user = userFactory.getCurrentUser();
    console.log("user list", user);

    $scope.isLoggedIn = false;
    
        firebase.auth().onAuthStateChanged(function(user) {
            if(user) {
                $scope.isLoggedIn = true;
                console.log("CurrenUser logged in", user);
                console.log("logged into firebase", $scope.isLoggedIn());
                $scope.$apply();
            }else{
                $scope.isLoggedIn = false;
                console.log("This user is not logged", $scope.isLoggedIn);
            }
        });
    
//ShowAllUserCards populates the DOM with just your uid targeted cards from factory-home. 

	const showAllUserCards = function(){
		homeFactory.getAllUserCards(user)
		.then((cards) => {
			console.log("showUserCards from promise", cards);
			$scope.userCards = cards;
		});
	};

//deletePin is able to remove the targeted card from the array. 
	$scope.deleteCard = function(id){
		homeFactory.deleteCard(id)
		.then((irrelevant) => {
			showAllUserCards();
		});
    };
    
    $(document).ready(function(){
        $('.tooltipped').tooltip({delay: 50});
      });


	showAllUserCards();
});