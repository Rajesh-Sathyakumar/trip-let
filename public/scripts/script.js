let fetchWeatherData = function (position) {
	if (position < coorgData.length) {
		fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + coorgData[position].lat + '&lon=' +
			coorgData[position].long + '&APPID=92ea4ed22a08e46a6efa3f2e70bdcafc')
			.then(function (response) {
				return response.json();
			})
			.then(function (weather) {
				coorgData[position].Temperature = (weather.main.temp - 273.15).toFixed(2) + "<sup>o</sup>C";
				coorgData[position].Weather = weather.weather[0].description;
				fetchWeatherData(position + 1);
			});
	} else {
		let source = document.getElementById("tripLocationsTemplate").innerHTML;
		let template = Handlebars.compile(source);
		let html = template(coorgData);
		document.getElementById('tripLocations').innerHTML = html;
	}
};

fetchWeatherData(0);



if ('serviceWorker' in navigator) {
	try {
		navigator.serviceWorker.register('sw.js');
		console.log('SW Registered');
	} catch (error) {
		console.log('SW reg failed');
	}
}
