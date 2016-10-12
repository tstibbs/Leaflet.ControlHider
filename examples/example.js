var map = L.map('map', {
	center: [51.515, -0.13],
	zoom: 13,
	zoomControl: false,
	attributionControl: false
});

var zoom = new L.Control.Zoom();
var attr = new L.Control.Attribution();
var controls = [zoom, attr];
(new L.Control.ControlHider(controls)).addTo(map);
controls.forEach(function(control) {
	control.addTo(map);
});

