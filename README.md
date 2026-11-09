[![License: AL2](https://img.shields.io/github/license/tstibbs/Leaflet.ControlHider)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/tstibbs/Leaflet.ControlHider.svg)](https://github.com/tstibbs/Leaflet.ControlHider/issues)

## What is this?

This is a simple control that enables the user to show and hide other controls (e.g. zoom, layers, scale) with a single click. Useful particularly on mobile devices where screen space is limited.

## How can I try it?

[Live demo](https://tstibbs.github.io/Leaflet.ControlHider/examples/index.html)

[Live demo with controls starting hidden](https://tstibbs.github.io/Leaflet.ControlHider/examples/hidden.html)

## How to use it

Import Leaflet and this module in an ES module context:
```js
import * as L from 'leaflet';
import { ControlHider } from 'leaflet-control-hider';

const zoom = new L.Control.Zoom();
const attr = new L.Control.Attribution();
const hider = new ControlHider([zoom, attr]);

hider.addTo(map);
zoom.addTo(map);
attr.addTo(map);
```

Note to use with default controls (e.g. zoom) you must first stop leaflet adding them for you, like this:
```js
const map = L.map('map', {
    zoomControl: false
});
```

## Contributing

PRs are very welcome, but for any big changes or new features please open an issue to discuss first.
