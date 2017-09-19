"use strict";

app.controller('gameCtrl', function($window, $timeout, $compile, $scope, homeFactory, userFactory){
    $scope.gameCards = [];
    $scope.gameArray = [];

    let user = userFactory.getCurrentUser();

    const same = array => array.every(item => item.key === array[0].key);
    const setAsMatched = array => {
        Materialize.toast('A Match!', 3000, 'green');
        array.forEach(game => {
        $timeout (function() {
            let thisGame = $scope.gameArray[$scope.gameArray.indexOf(game)];
            thisGame.matched = true;
            thisGame.selected = false;
        }, 1000);
        });  
    };

    const unSelect = array => array.forEach(item => { 
        $timeout (function() {
        if(item.matched !== true) item.selected = false;
        }, 1000);

    });
    

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
            if(selected.length === 2) checkMatch(selected);
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
    
});