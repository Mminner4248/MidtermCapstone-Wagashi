"use strict";

console.log("Hello, app.js");

const app = angular.module("WagashiApp", ["ngRoute"]);








// app.run(($location, FBCreds) => {
// 	let creds = FBCreds;
// 	let authConfig = {
// 		apiKey: creds.apiKey,
// 		authDomain: creds.authDomain,
// 		databaseURL: creds.databaseURL
// 	};
// 	firebase.initializeApp(authConfig);
// });