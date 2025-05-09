function loadSpots() {
    let spots = JSON.parse(localStorage.getItem('spots'));
    if (spots == '') {
        localStorage.setItem('spots', []);
        spots = [];
    }
    return spots;
}

/* Setup Map */
var map = L.map('contentMap', {attributionControl: false, zoomControl: false}).setView([48.268258, 14.252061], 12);

// Satellite imagery layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Imagery © Esri',
    maxZoom: 19
}).addTo(map);

// Labels and country outlines layer
L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Labels © Esri',
    maxZoom: 19
}).addTo(map);

/* Initialize markers */
function loadMarkers() {
    let markers = [];
    let spots = loadSpots();
    if (spots != null) {
        for (let i = 0; i < spots.length; i++) {
            markers[i] = L.marker([spots[i].lat, spots[i].lon]).addTo(map);
        }
    }
}

loadMarkers();

/* Popup to add spot */
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`<div onclick="addSpotMenu(${e.latlng.lat}, ${e.latlng.lng})">Add Spot</div>`)
        .openOn(map);
}

map.on('click', onMapClick);

/* Open "Add spot" menu */
function addSpotMenu(lat=-2000, lon=-2000) {
    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', lon);
    window.location.href = 'pages/add.html';
}