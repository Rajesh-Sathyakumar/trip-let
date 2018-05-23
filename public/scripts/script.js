let source = document.getElementById("tripLocationsTemplate").innerHTML;
let template = Handlebars.compile(source);
let html = template(coorgData);
document.getElementById('tripLocations').innerHTML  = html;