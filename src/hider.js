L.Control.ControlHider = L.Control.extend({
	options: {
		position: 'topleft',
		tooltipOpen: 'Click to hide controls',
		tooltipClosed: 'Click to show controls',
		visibleByDefault: true // whether all controls should be visible on startup or not 
	},
	
	initialize: function(controls, options) {
		L.setOptions(this, options);
        this._controls = controls; //e.g. [zoomControl, locateControl];
        this._styleTransform = [];
		this._styleDisplay = [];
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
		if (this.options.visibleByDefault) {
			this._makeMenuHideable();
			this._showing = true;
		} else {
            this._makeMenuShowable();
            this._showing = false;
            this._listenForControlsAdded();
		}
        L.DomEvent.on(link, 'click', function(){
            this._toggle();
        }, this);
        return this._container;
    },
	
	_listenForControlsAdded: function() {
		for (var i = 0; i < this._controls.length; i++) {
			(function(i) {
				var control = this._controls[i];
				if (control.getContainer() != null) {
					//already added
					var element = control.getContainer();
					this._hideControl(element, i);
					element.style.display = 'none';
				} else {
					//not added yet and no way to listen for control added events, so we have to inject one ourselves
					var oldAddTo = control.addTo;
					control.addTo = function (map) {
						var context = oldAddTo.call(control, map);
						this._hideControl(control.getContainer(), i);
						control.getContainer().style.display = 'none';
						control.addTo = oldAddTo;
						return context;
					}.bind(this);
				}
			}.bind(this))(i);//just scoping
		}
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
		this._forEachControl(function(element, i) {
			this._hideControl(element, i);
		}.bind(this));//this._hideControl.bind(this));
		//fallback for browsers that don't support the translate - but wait until the transition has completed before we hide the elements
		setTimeout(function() {
			this._forEachControl(function(element, i) {
				element.style.display = 'none';
			}.bind(this));
		}.bind(this), 300);
    },
	
	_hideControl: function(element, i) {
		var top = this._container.getBoundingClientRect().top
		var bounds = element.getBoundingClientRect();
		var xOffset = 0 - (bounds.right + 5);//random 5 for box shadows etc until I can work out how to reliably get them too
		var yOffset = top - bounds.top;
		this._styleTransform[i] = element.style.transform; //so we can put it back, just in case it's been set directly on the element
		this._styleDisplay[i] = element.style.display; //so we can put it back, just in case it's been set directly on the element
		element.style.transition = 'transform 0.3s ease';
		element.style.transform = 'translate(' + xOffset + 'px, ' + yOffset + 'px)';
	},

    _showControls: function() {
        this._makeMenuHideable();
		this._forEachControl(function(element, i) {
			element.style.display = this._styleDisplay[i]; // if the style was empty string, then this is fine, it should clear it and revert to whatever css there was
		}.bind(this));
		//give the browser chance to redraw the elements before we try and slide them back in
		setTimeout(function() {
			this._forEachControl(function(element, i) {
				element.style.transform = this._styleTransform[i]; // if the style was empty string, then this is fine, it should clear it and revert to whatever css there was
			}.bind(this));
		}.bind(this));
    },
	
	_forEachControl: function(action) {
		for (var i = 0; i < this._controls.length; i++) {
			var element = this._controls[i].getContainer();
			action(element, i);
		}
	}
});
