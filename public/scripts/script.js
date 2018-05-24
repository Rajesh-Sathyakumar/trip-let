let source = document.getElementById("tripLocationsTemplate").innerHTML;
let template = Handlebars.compile(source);
let html = template(coorgData);
document.getElementById('tripLocations').innerHTML  = html;

if('serviceWorker' in navigator){
	try{
		navigator.serviceWorker.register('sw.js');
		console.log('SW Registered');
	}catch(error){
		console.log('SW reg failed');
	}
}