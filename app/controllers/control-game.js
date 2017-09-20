"use strict";

app.controller('gameCtrl', function($window, $timeout, $compile, $scope, homeFactory, userFactory){
    $scope.gameCards = [];
    $scope.gameArray = [];

    let user = userFactory.getCurrentUser();

    const same = array => array.every(item => item.key === array[0].key);

    const checkMatched = array => array.every(item => item.matched === true);

    const checkWin = function() {
        if(checkMatched($scope.gameArray))
        {
            $scope.stopTimer();
            $window.alert("You win! Your time was: {{$scope.timeLimit}}");            
        }
    };

    const setAsMatched = array => {
        
        Materialize.toast('A Match!', 3000, 'green');
        array.forEach(game => {
        $timeout (function() {
            let thisGame = $scope.gameArray[$scope.gameArray.indexOf(game)];
            thisGame.matched = true;
            thisGame.selected = false;
            $scope.isGuarding = false;
            console.log("guard thats borked.", $scope.isGuarding);                            
            checkWin();
        }, 1000);
        });
    };

    const unSelect = array => array.forEach(item => { 
        $timeout (function() {
        if(item.matched !== true) item.selected = false;
        $scope.isGuarding = false;
        console.log("guard", $scope.isGuarding);        
        }, 1000);
    });
    

    $scope.isGuarding = false;

    const checkMatch = function(selected){
        if(same(selected)){
            setAsMatched(selected);
            return true;
        }else {
            unSelect($scope.gameArray);
            return false;
        }
    };

    $scope.selectCard = function(item){
            item.selected = true;
            let selected = $scope.gameArray.filter(game  => game.selected === true);
            console.log("selected", selected);
            if(selected.length === 2){ 
                checkMatch(selected);
                $scope.isGuarding = true;
                console.log("guard", $scope.isGuarding);
            }
        }; 

    const shuffle = function(){
        for(let i = 0; i < $scope.gameArray.length; i++) {
           let random = Math.round(Math.random() * i);
           let temp = $scope.gameArray[i];
           $scope.gameArray[i] = $scope.gameArray[random];
           $scope.gameArray[random] = temp;
        }
        console.log("shuffled Array", $scope.gameArray);
    };

    const splitArray = function(){
        $scope.gameArray = [].concat.apply([], $scope.gameCards);
        console.log("new array, I make dis", $scope.gameArray);       
    };


    $scope.showAllGameCards = function(){
		homeFactory.getAllUserCards(user)
		.then((cards) => {
			console.log("showGameCards from promise", cards);
			$scope.gameCards =  cards.map(function(word){
                return [{
                            furigana: word.furigana,
                            gameCard : word.japanese,
                            key: word.id
                            },
                        {
                            gameCard : word.definitions[0],
                            key: word.id
                        }];
            });
            console.log("gameCards in Array", $scope.gameCards); 
            splitArray();
            shuffle();
        });
    };

    $scope.stopTimer = function() {
        $timeout.cancel(timer);
      };

    $scope.timeLimit = 60000;
    $scope.isCritical = false;
    
    var timer = null;

    $scope.startTimer = function(){
		$scope.timeLimit -= 1000;
		$scope.isCritical = $scope.timeLimit <= 10000 ? true : false;
			
		timer = $timeout($scope.startTimer, 1000);
			if ($scope.timeLimit === 0) {
                $scope.stopTimer();
                $window.alert("You lost! Better luck next time!");            
		}
    };

    $scope.restartTimer = function(){
        $scope.timeLimit = 60000;
        $scope.startTimer();
    };
    
});