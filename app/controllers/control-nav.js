"use strict";

//provides the functionality for the navbar partial. Checks if the user is logged in with a true or false. This navbar partial uses this to provide what to show. 

app.controller('navCtrl', function($scope, $window, APIService, userFactory, $location){

	//On enter, the value in the search bar is sent to the API service.

    $scope.sendSearch = function(word){
        APIService.getAllDefs(word);
    };

    $scope.search = function($event){
        if($event.which === 13){
            let word = $event.target.value;
            console.log("word", word);
			$scope.sendSearch(word);
			$location.path( "/search" );
        }
    };

	//checks if the user it logged in, if so then the buttons changed to the logged in buttons in the template.
	$scope.isLoggedIn = false;

	$scope.logout = () => {
		userFactory.logOut();
	};

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

    let logout = () => {
    	console.log("logout clicked");
    	userFactory.logOut()
      	.then(function () {
        	console.log("logged out");
        	$location.href = "#!/";
      	}, function (error) {
        	console.log("error on logout");
      	});
  };

$scope.loginGoogle = () => {
	console.log("Google Login");

	userFactory.authWithProvider()
	.then((result) => {
		let user = result.user.uid;
		$scope.$apply();
	}).catch((error) => {
		console.log("Google Login if F'd");
		let errorCode = error.code;
		let errorMessage = error.message;
		console.log("This is why it's F'd", errorCode, errorMessage);
	});
};
});