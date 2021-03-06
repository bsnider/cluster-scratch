var map, featureList = [];

$(document).on("click", ".feature-row", function(e) {
    $(document).off("mouseout", ".feature-row", clearHighlight);
    sidebarClick(parseInt($(this).attr("id"), 10));
});

$(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
});

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
    $("#aboutModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

$("#full-extent-btn").click(function() {
    map.fitBounds(locations.getBounds());
    $(".navbar-collapse.in").collapse("hide");
    return false;
});


$('#initModal').on('hidden.bs.modal', function() {
    map.fitBounds(locations.getBounds());
    //map.setMaxBounds(locations.getBounds());
    return false;
})

$("#legend-btn").click(function() {
    $("#legendModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

$("#login-btn").click(function() {
    $("#loginModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

$("#list-btn").click(function() {
    $('#sidebar').toggle();
    map.invalidateSize();
    return false;
});

$("#nav-btn").click(function() {
    $(".navbar-collapse").collapse("toggle");
    return false;
});

$("#sidebar-toggle-btn").click(function() {
    $("#sidebar").toggle();
    map.invalidateSize();
    return false;
});

$("#sidebar-hide-btn").click(function() {
    $('#sidebar').hide();
    map.invalidateSize();
});

function clearHighlight() {
    highlight.clearLayers();
}

function sidebarClick(id) {
    var layer = markerClusters.getLayer(id);
    map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
    layer.fire("click");
    /* Hide sidebar and go to the map on small screens */
    if (document.body.clientWidth <= 767) {
        $("#sidebar").hide();
        map.invalidateSize();
    }
}

function syncSidebar() {
    /* Empty sidebar features */
    $("#feature-list tbody").empty();
    $("#feature-listDisabled tbody").empty();
    /* Loop through locations layer and add only features which are in the map bounds */
    locations.eachLayer(function(layer) {
        //if (map.hasLayer(locationsLayer)) {
        if (map.getBounds().contains(layer.getLatLng())) {
            var afa =
                $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img height="24" src="assets/img/' + layer.feature.properties.marker_url + '"></td><td class="feature-name">' + layer.feature.properties.shortName + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
        } else {
            var afa1 =
                $("#feature-listDisabled tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" style="background-color: #E4E4E4;" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img height="24" class="nonActiveFeatureImage" src="assets/img/' + layer.feature.properties.marker_url + '"></td><td class="feature-name nonActiveFeatureText">' + layer.feature.properties.shortName + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
        }
        //}
    });

    /* Update list.js featureList */
    featureList = new List("features", {
        valueNames: ["feature-name"]
    });
    featureList.sort("feature-name", {
        order: "asc"
    });
}

/* Basemap Layers */
var accessToken = 'pk.eyJ1IjoiYmpzbmlkZXIiLCJhIjoiMjhkOWI0ZjM1MDZiMGQzYmY3YTU5ZWU1OTM2YjU1NDgifQ.paiaL8scv6VHN53ufTkpIQ';
// Replace 'examples.map-i87786ca' with your map id.
var mapBoxDark = L.tileLayer('https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=' + accessToken, {
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
});

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
    stroke: false,
    fillColor: "#00FFFF",
    fillOpacity: 0.3,
    radius: 30
};


/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 15
});

/* Empty layer placeholder to add to layer control for listening when to add/remove locations to markerClusters layer */
var locationsLayer = L.geoJson(null);
var locations = L.geoJson(null, {
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: "assets/img/" + feature.properties.marker_url,
                //iconSize: [40, 40],
                iconAnchor: [20, 20],
                shadowAnchor: [12, 28],
                popupAnchor: [0, -25]
            }),
            title: feature.properties.name,
            riseOnHover: true
        });
    },
    onEachFeature: function(feature, layer) {
        if (feature.properties) {
            if (feature.properties.bullet5) {
                var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>City</th><td>" + feature.properties.city + "</td></tr>" + "<tr><th>Date</th><td>" + feature.properties.timespan + "</td></tr>" + "<tr><th>Description</th><td><ul><li>" + feature.properties.bullet1 + "</li><li>" + feature.properties.bullet2 + "</li><li>" + feature.properties.bullet3 + "</li><li>" + feature.properties.bullet4 + "</li><li>" + feature.properties.bullet5 + "</li></ul></td></tr>" + "<table>";
            } else if (feature.properties.bullet4) {
                var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>City</th><td>" + feature.properties.city + "</td></tr>" + "<tr><th>Date</th><td>" + feature.properties.timespan + "</td></tr>" + "<tr><th>Description</th><td><ul><li>" + feature.properties.bullet1 + "</li><li>" + feature.properties.bullet2 + "</li><li>" + feature.properties.bullet3 + "</li><li>" + feature.properties.bullet4 + "</li></ul></td></tr>" + "<table>";
            } else if (feature.properties.bullet3) {
                var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>City</th><td>" + feature.properties.city + "</td></tr>" + "<tr><th>Date</th><td>" + feature.properties.timespan + "</td></tr>" + "<tr><th>Description</th><td><ul><li>" + feature.properties.bullet1 + "</li><li>" + feature.properties.bullet2 + "</li><li>" + feature.properties.bullet3 + "</li></ul></td></tr>" + "<table>";
            } else if (feature.properties.bullet2) {
                var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>City</th><td>" + feature.properties.city + "</td></tr>" + "<tr><th>Date</th><td>" + feature.properties.timespan + "</td></tr>" + "<tr><th>Description</th><td><ul><li>" + feature.properties.bullet1 + "</li><li>" + feature.properties.bullet2 + "</li></ul></td></tr>" + "<table>";
            } else if (feature.properties.bullet1) {
                var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>City</th><td>" + feature.properties.city + "</td></tr>" + "<tr><th>Date</th><td>" + feature.properties.timespan + "</td></tr>" + "<tr><th>Description</th><td><ul><li>" + feature.properties.bullet1 + "</li></ul></td></tr>" + "<table>";
            } else {
                var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>City</th><td>" + feature.properties.city + "</td></tr>" + "<tr><th>Date</th><td>" + feature.properties.timespan + "</td></tr>" + "<table>";
            }
            var title = feature.properties.position + " - <a href='" + feature.properties.url + "''>" + feature.properties.name + "</a>"
            layer.on({
                click: function(e) {
                    $("#feature-title").html(title);
                    $("#feature-info").html(content);
                    $("#featureModal").modal("show");
                    highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
                }
            });
            $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
        }
    }
});


map = L.map("map", {
    zoom: 2,
    center: [39.828175, -98.5795],
    layers: [mapBoxDark, markerClusters, highlight],
    zoomControl: false,
    attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
    //if (e.layer === locationsLayer) {
    markerClusters.addLayer(locations);
    syncSidebar();
    //}
});

map.on("overlayremove", function(e) {
    //if (e.layer === locationsLayer) {
    markerClusters.removeLayer(locations);
    syncSidebar();
    //}
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function(e) {
    syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
    highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
    $.each(map._layers, function(index, layer) {
        if (layer.getAttribution) {
            $("#attribution").html((layer.getAttribution()));
        }
    });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
    position: "bottomright"
});
attributionControl.onAdd = function(map) {
    var div = L.DomUtil.create("div", "leaflet-control-attribution");
    div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://bryanmcbride.com'>bryanmcbride.com</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
    return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
    position: "topright"
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
    var isCollapsed = true;
} else {
    var isCollapsed = false;
}

var baseLayers = {
    "Street Map": mapBoxDark,
};

var groupedOverlays = {
    "Points of Interest": {
        "<img src='assets/img/theater.png' width='24' height='28'>&nbsp;Locations": locationsLayer
    }
};



$.getJSON("data/map1.geojson", function(data) {
    locations.addData(data);
    map.addLayer(locationsLayer);
});

$("#featureModal").on("hidden.bs.modal", function(e) {
    $(document).on("mouseout", ".feature-row", clearHighlight);
});

$(document).one("ajaxStop", function() {
    $("#loading").hide();
});
