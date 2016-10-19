L.Control.ControlHider = L.Control.extend({
	options: {
		position: 'topleft',
		tooltipOpen: 'Click to hide controls',
		tooltipClosed: 'Click to show controls'
	},
	
	initialize: function(controls, options) {
		L.setOptions(this, options);
        this._controls = controls; //e.g. [zoomControl, locateControl];
        this._styleTransform = [];
		this._styleDisplay = [];
        this._showing = true;
    },

    onAdd: function(map) {
        this._container = L.DomUtil.create('div', '');
		this._container.id = 'hider-control';
		var link = L.DomUtil.create('a', '', this._container);
		link.href="#";
		this._imgClosed = L.DomUtil.create('div', 'icon icon-closed', link);
        this._imgClosed.title = this.options.tooltipClosed;
		this._imgOpen = L.DomUtil.create('div', 'icon icon-open', link);
        this._imgOpen.title = this.options.tooltipOpen;
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
    },
   
    _makeMenuShowable: function() {
		L.DomUtil.addClass(this._container, 'closed');
		L.DomUtil.removeClass(this._container, 'open');
    },

    _hideControls: function() {
        this._makeMenuShowable();
        for (var i = 0; i < this._controls.length; i++) {
            var element = this._controls[i]._container;
			var right = element.getBoundingClientRect().right + 5;//random 5 for box shadows etc until I can work out how to reliably get them too
            this._styleTransform[i] = element.style.transform; //so we can put it back, just in case it's been set directly on the element
			this._styleDisplay[i] = element.style.display; //so we can put it back, just in case it's been set directly on the element
			element.style.transition = 'transform 0.3s ease';
            element.style.transform = 'translateX(-' + right + 'px)';
        }
		setTimeout(function() {
			for (var i = 0; i < this._controls.length; i++) {
				var element = this._controls[i]._container;
				element.style.display = 'none';
			}
		}.bind(this), 300);
    },

    _showControls: function() {
        this._makeMenuHideable();
        for (var i = 0; i < this._controls.length; i++) {
            var element = this._controls[i]._container;
            element.style.transform = this._styleTransform[i]; // if the style was empty string, then this is fine, it should clear it and revert to whatever css there was
			element.style.display = this._styleDisplay[i]; // if the style was empty string, then this is fine, it should clear it and revert to whatever css there was
        }
    }
});
