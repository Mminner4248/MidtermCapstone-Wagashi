"use strict";

app.controller('gameCtrl', function($window, $timeout, $compile, $scope, homeFactory, userFactory){
    $scope.gameCards = [];
    $scope.gameArray = [];

    let user = userFactory.getCurrentUser();

    const checkWin = function(){
        if($('.unmatched').length === 0){
            $window.alert("You won!");
        }
    };

   $scope.checkMatch = function(event){
       $(event.currentTarget).addClass("selected");
     if ($('.selected').length == 2) {
         console.log("Selected dataValue", $('.selected').first().attr("dataValue"));
         console.log("Selected dataValue", $('.selected').last().attr("dataValue"));
        if($('.selected').first().attr("dataValue") == $('.selected').last().attr("dataValue")) {
            $('.selected').each(function() {
                $(this).animate({opacity: 0}).removeClass('unmatched');
            });
            $('.selected').each(function() {
                $(this).removeClass('selected');
            });
            checkWin();
        } else {
            $timeout (function() {
                console.log("outside!", $('.selected'));
                let gameElements = $('.selected');
                gameElements.each(function() {
                    console.log("inside!", gameElements);  
                    // gameElements.addClass('ng-hide');
                    gameElements.removeClass('.selected');
                });

                // $('selected').each(function(){
                //     console.log("inside!", $('.selected'));                    
                //     $(this).removeClass('.selected');
                // });
            }, 1000);
        }
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
        shuffle();       
    };


    const showAllGameCards = function(){
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
        });
    }; 

    showAllGameCards();
});