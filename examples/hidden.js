var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
});

var map = L.map('map', {
	center: [51.515, -0.13],
	zoom: 13,
	layers: [streets],
	zoomControl: false,
	attributionControl: false
});

var layerControl = new L.Control.Layers([streets], null, {position: 'topleft'});
var zoom = new L.Control.Zoom();
var attr = new L.Control.Attribution();
var controls = [zoom, attr];
(new L.Control.ControlHider(controls, {
	visibleByDefault: false
})).addTo(map);

zoom.addTo(map);
layerControl.addTo(map);//non-hideable
attr.addTo(map);
