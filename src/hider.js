L.Control.ControlHider = L.Control.extend({
    initialize: function(controls) {
        this._controls = controls; //e.g. [zoomControl, locateControl];
        this._styles = [];
        this._showing = true;
    },

    onAdd: function(map) {
        var container = L.DomUtil.create('div', '');
        container.style.width = '20px';
        container.style.height = '20px';
        container.style['background-color'] = 'red';
        L.DomEvent.on(container, 'click', function(){
            this._toggle();
        }, this);
        return container;
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
        this._container.style['background-color'] = 'red';
    },
   
    _makeMenuShowable: function() {
        this._container.style['background-color'] = 'blue';
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
