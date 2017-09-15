"use strict";

console.log("Hello, app.js");

const app = angular.module("WagashiApp", ["ngRoute"]);

let isAuth = (userFactory) => new Promise ((resolve, reject) => {
	console.log("This is the userFactory", userFactory);
	userFactory.isAuthenticated()
	.then((userExists) => {
		if(userExists) {
			console.log("Authentication Good");
			resolve();
		}else {
			console.log("Authentication Bad");
			reject();
		}
	});
});

app.config(($routeProvider) => {
    $routeProvider
    .when('/', {
        templateUrl:'partials/cardlist.html',
		controller:'cardListCtrl'
	})
	.when('/home',{
		templateUrl: 'partials/homeview.html',
		controller: 'homeViewCtrl',
		resolve: {isAuth}
	})
	.when('/search', {
        templateUrl:'partials/cardlist.html',
		controller:'cardListCtrl',
		resolve: {isAuth}
	})
	.when('/game', {
        templateUrl:'partials/game.html',
		controller:'gameCtrl',
		resolve: {isAuth}
	});
});


app.run(($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain,
		databaseURL: creds.databaseURL
	};
	firebase.initializeApp(authConfig);
});