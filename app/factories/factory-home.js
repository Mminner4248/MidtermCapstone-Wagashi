"use strict";
//This factory pulls the saved user data from Firebase. This is used for both the card game and the home view.  
app.factory("homeFactory", function($q, $http, FBCreds, userFactory){
   //pulls all data from Firebase based on uid.
    const getAllUserCards = function(user){
		let userCards = [];
		console.log("url is", `${FBCreds.databaseURL}/cards.json?orderBy="uid"&equalTo="${user}"`);
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/cards.json?orderBy="uid"&equalTo="${user}"`)
			.then((itemObject)=>{
				let itemCollection = itemObject.data;
				console.log("itemCollection", itemCollection);
				Object.keys(itemCollection).forEach((key) => {
					itemCollection[key].id = key;
					userCards.push(itemCollection[key]);
				});
				resolve(userCards);
			})
			.catch((error) => {
				reject(error);
			});
		});
    };
  //adds new object to firebase 
    const addCard = function(newObj){
        console.log("obj in add", newObj);
        console.log("URL", `${FBCreds.databaseURL}/cards.json`);

		return $http.post(`${FBCreds.databaseURL}/cards.json`, newObj)
		.then ((data) => {
			console.log("data", data);
			return data;
		}, (error) => {
			let errorCode = error.code;
			let errorMessage = error.message;
			console.log("error", errorCode, errorMessage);
		});
    };
  //removes entire object from firebase. 
    const deleteCard = function(id){
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/cards/${id}.json`)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
		});
    };
//allows user to have toast when items deleted or added.
    $(document).ready(function(){
        $('.tooltipped').tooltip({delay: 50});
      });
            
    
    return {getAllUserCards, addCard, deleteCard};
});