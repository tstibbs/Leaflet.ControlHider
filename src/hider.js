L.Control.ControlHider = L.Control.extend({
	options: {
		position: 'topleft',
		tooltipOpen: 'Click to hide controls',
		tooltipClosed: 'Click to show controls'
	},
	
	initialize: function(controls, options) {
		L.setOptions(this, options);
        this._controls = controls; //e.g. [zoomControl, locateControl];
        this._styles = [];
        this._showing = true;
    },

    onAdd: function(map) {
        this._container = L.DomUtil.create('div', '');
		this._container.id = 'hider-control';
		var link = L.DomUtil.create('a', '', this._container);
		link.href="#";
		this._img = L.DomUtil.create('div', 'icon', link);
		this._makeMenuHideable();
        L.DomEvent.on(link, 'click', function(){
            this._toggle();
        }, this);
        return this._container;
    },
   
    _toggle: function() {
        if (this._showing) {
            this._hideControls();
            this._showing = false;
        } else {
            this._showControls();
            this._showing = true;
        }
    },
   
    _makeMenuHideable: function() {
		L.DomUtil.addClass(this._container, 'open');
		L.DomUtil.removeClass(this._container, 'closed');
        this._img.title = this.options.tooltipOpen;
    },
   
    _makeMenuShowable: function() {
		L.DomUtil.addClass(this._container, 'closed');
		L.DomUtil.removeClass(this._container, 'open');
        this._img.title = this.options.tooltipClosed;
    },

    _hideControls: function() {
        this._makeMenuShowable();
        for (var i = 0; i < this._controls.length; i++) {
            var element = this._controls[i]._container;
            this._styles[i] = element.style.display; //so we can put it back, just in case it's been set directly on the element
            element.style.display = 'none';
        }
    },

    _showControls: function() {
        this._makeMenuHideable();
        for (var i = 0; i < this._controls.length; i++) {
            var element = this._controls[i]._container;
            element.style.display = this._styles[i]; // if the style was empty string, then this is fine, it should clear it and revert to whatever css there was
        }
    }
});
