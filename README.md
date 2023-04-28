## What is this?

This is a simple control that enables the user to show and hide other controls (e.g. zoom, layers, scale) with a single click. Useful particularly on mobile devices where screen space is limited.

## How can I try it?

[Live demo](https://tstibbs.github.io/Leaflet.ControlHider/examples/index.html)

[Live demo with controls starting hidden](https://tstibbs.github.io/Leaflet.ControlHider/examples/hidden.html)

## How to use it

Create the controls that you want to be controlled by the hider:
```
var zoom = new L.Control.Zoom();
var attr = new L.Control.Attribution();
```

Create the hider control:
```
var hider = new L.Control.ControlHider([zoom, attr]);
```

Now add the controls in the order you want them to appear (hider icons are designed assuming it is at the top but it can be put anywhere):
```
hider.addTo(map);
zoom.addTo(map);
attr.addTo(map);
```

Note to use with default controls (e.g. zoom) you must first stop leaflet adding them for you, like this:
```
var map = L.map('map', {
    zoomControl: false
});
```

## Contributing

PRs are very welcome, but for any big changes or new features please open an issue to discuss first.
