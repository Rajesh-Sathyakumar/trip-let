/* LOCATIONS	*/

let source = document.getElementById("tripLocationsTemplate").innerHTML;
let template = Handlebars.compile(source);
let html = template(coorgData);
document.getElementById('tripLocations').innerHTML  = html;

/* SERVICE WORKER	*/

if('serviceWorker' in navigator){
	try{
		navigator.serviceWorker.register('sw.js');
		console.log('SW Registered');
	}catch(error){
		console.log('SW reg failed');
	}
}

/* 	FIREBASE	*/

var config = {
	apiKey: "AIzaSyDoHDnSyMjdyjwkjzLBZv6BMjny-Z9Pyfo",
	authDomain: "trip-let.firebaseapp.com",
	databaseURL: "https://trip-let.firebaseio.com",
	projectId: "trip-let",
	storageBucket: "trip-let.appspot.com",
	messagingSenderId: "459259354047"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

	// messaging.requestPermission()
	// .then(function(){
	// 	console.log('have permission');
	// 	return messaging.getToken();
	// })
	// .then(function(token){
	// 	console.log(token);	
	// })
	// .catch(function(err){
	// 	console.log('Error Occured');
	// });

messaging.onMessage(function(payload){
	console.log(payload);
});
