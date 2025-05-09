let defaultCoords = [];

if (localStorage.getItem("lat") == null || localStorage.getItem("lon") == null || (localStorage.getItem("lat") == -2000 && localStorage.getItem("lon") == -2000)) {
    defaultCoords = [48.268258, 14.252061];
} else {
    defaultCoords = [localStorage.getItem("lat"), localStorage.getItem("lon")];
    document.getElementById("latInput").value = localStorage.getItem("lat");
    document.getElementById("lonInput").value = localStorage.getItem("lon");
}

localStorage.removeItem("lat");
localStorage.removeItem("lon");

let zoomLevel = 12;
var map = L.map('addMap', {attributionControl: false, zoomControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false}).setView(defaultCoords, zoomLevel);

function updateMapPos() {
    let newCoords = [document.getElementById("latInput").value, document.getElementById("lonInput").value];
    if (newCoords[0] != null && newCoords[1] != null) {
        map.setView(newCoords, zoomLevel);
    }
}

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

function loadSpots() {
    let spots = JSON.parse(localStorage.getItem('spots'));
    if (spots == '') {
        localStorage.setItem('spots', []);
        spots = [];
    }
    return spots;
}

function addSpot(event) {
    event.preventDefault();
    let spot = {
        "title": document.getElementById("titleInput").value,
        "body": document.getElementById("bodyInput").value,
        "lat": document.getElementById("latInput").value,
        "lon": document.getElementById("lonInput").value
    }

    let spots = loadSpots();
    if (spots == null) {
        spots = [spot];
    } else {
        spots[spots.length] = spot;
    }
    localStorage.setItem('spots', JSON.stringify(spots));

    window.history.go(-1);
}