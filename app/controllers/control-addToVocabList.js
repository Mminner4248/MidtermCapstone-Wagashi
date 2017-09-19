"use strict";

//     const checkWin = function(){
//         if($('.unmatched').length === 0){
//             $window.alert("You won!");
//         }
//     };

//    $scope.checkMatch = function(event){
//        $(event.currentTarget).addClass("selected");
//      if ($('.selected').length == 2) {
//          console.log("Selected dataValue", $('.selected').first().attr("dataValue"));
//          console.log("Selected dataValue", $('.selected').last().attr("dataValue"));
//         if($('.selected').first().attr("dataValue") == $('.selected').last().attr("dataValue")) {
//             $('.selected').each(function() {
//                 $(this).animate({opacity: 0}).removeClass('unmatched');
//             });
//             $('.selected').each(function() {
//                 $(this).removeClass('selected');
//             });
//             checkWin();
//         } else {
//             $timeout (function() {
//                 console.log("outside!", $('.selected'));
//                 $('.selected').each(function() {
//                     console.log("inside!", $('.selected'));
//                     $(this).find('.card-content').addClass('ng-hide');
//                     $(this).removeClass('selected');
//                 });

//                 // $('selected').each(function(){
//                 //     console.log("inside!", $('.selected'));                    
//                 //     $(this).removeClass('.selected');
//                 // });
//             }, 1000);
//         }
//      }
//     };

// -----------------------------------------
    // const checkWin = function(){
    //     if($('.unmatched').length === 0){
    //         $window.alert("You won!");
    //     }
    // };

    // const selectCard = function() {
    //     console.log("this shit", this);
    //     $('.gameCard').addClass('selected');
    //     $('.gameCard').find('.card-content').removeClass('hidden');
    //   };
      
    // const checkMatch = function() {
    //     if ($('.selected').first().attr("dataValue") == $('.selected').last().attr("dataValue"))
    //      {
    //       $('.gameCard.selected').remove();
    //       checkWin();
    //     } else {
    //       $(this).setTimeout(() => {
    //         $('.gameCard.selected').removeClass('selected');
    //         $(this).find('.card-content').addClass('hidden');
    //       }, 2000);
    //     }
    //   };
           
    //   $('.container').on('click', ".gameCard", () => {
    //         console.log("clicked!");
    //         selectCard();
    //         checkMatch();
    //     });

    // $scope.selectCard = function($event){
    //     console.log("event", $event.currentTarget);
    //     $event.currentTarget.addClass('selected');
    //     // $event.currentTarget.removeClass("hidden");
    // }; 