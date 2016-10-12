var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
});

var map = L.map('map', {
	center: [51.515, -0.13],
	zoom: 13,
	layers: [streets],
	zoomControl: false
});

var zoom = new L.Control.Zoom();
zoom.addTo(map);
(new L.Control.ControlHider([zoom])).addTo(map);
