/*
 * Leaflet zoom control with a home button for resetting the view.
 *
 * Distributed under the CC-BY-SA-3.0 license. See the file "LICENSE"
 * for details.
 *r
 * Based on code by toms (https://gis.stackexchange.com/a/127383/48264).
 */
(function () {
    "use strict";

    L.Control.CustomControl = L.Control.extend({
      options: { position: 'topleft' },


      onAdd: function (map) {
          var container = L.DomUtil.create('div', 'test');
          container.style.backgroundColor = 'white';
          container.style.backgroundImage = 'url(http://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)';
          container.style.backgroundSize = '30px 30px';
          container.style.width = '30px';
          container.style.height = '100px';
          container.style.margin = '0px';
          container.id = 'sideBarTab';
          container.onclick = function () {
              console.log('buttonClicked');
              $('#sidebar').toggle();
              map.invalidateSize();
          };
          return container;
      },

        _customControl: function (e) {
          //$("#sidebar").toggle();

            //jshint unused:false
            //this._map.setView(this.options.homeCoordinates, this.options.homeZoom);
        }
    });
    // window.addEventListener('DOMContentLoaded', readyState);

    L.Control.customControl = function (options) {
        return new L.Control.CustomControl(options);
    };
}());
