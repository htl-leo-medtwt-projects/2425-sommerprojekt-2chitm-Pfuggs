let defaultCoords = [];

const ratings = [
  "Very Bad",    // 0
  "Bad",        // 1
  "Poor",       // 2
  "Below Avg",  // 3
  "Weak",       // 4
  "OK",         // 5
  "Good",       // 6
  "Very Good",  // 7
  "Great",      // 8
  "Excellent",  // 9
  "Exceptional" // 10
];

document.getElementById("bigMap").style.display = "none";
document.getElementById("addMap").style.display = "";

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
var bigMap = L.map('bigMap', {attributionControl: false, zoomControl: false}).setView(defaultCoords, zoomLevel);

function updateMapPos() {
    let newCoords = [document.getElementById("latInput").value, document.getElementById("lonInput").value];
    if (newCoords[0] != null && newCoords[1] != null) {
        map.setView(newCoords, zoomLevel);
        bigMap.setView(newCoords, zoomLevel);
    }
}

function openBigMap() {
    document.getElementById("bigMap").style.display = "";
    document.getElementById("addMap").style.display = "none";
}

function setCoords(lat, lng) {
    let newCoords = [lat, lng];
    if (newCoords[0] != null && newCoords[1] != null) {
        map.setView(newCoords, zoomLevel);
        bigMap.setView(newCoords, zoomLevel);
    }
    document.getElementById("latInput").value = lat;
    document.getElementById("lonInput").value = lng;
    document.getElementById("bigMap").style.display = "none";
    document.getElementById("addMap").style.display = "";
}

function onMapClick(e) {
    setCoords(e.latlng.lat, e.latlng.lng);
}

bigMap.on('click', onMapClick);

// Satellite imagery layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Imagery © Esri',
    maxZoom: 19
}).addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Imagery © Esri',
    maxZoom: 19
}).addTo(bigMap);

// Labels and country outlines layer
L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Labels © Esri',
    maxZoom: 19
}).addTo(map);
L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Labels © Esri',
    maxZoom: 19
}).addTo(bigMap);

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

    if (localStorage.getItem("currentIndex") == null) {
        localStorage.setItem("currentIndex", "0");
    }

    let spot = {
        "index": localStorage.getItem("currentIndex"),
        "title": document.getElementById("titleInput").value,
        "body": document.getElementById("bodyInput").value,
        "lat": document.getElementById("latInput").value,
        "lon": document.getElementById("lonInput").value,
        "accessibility": document.getElementById("accessibilityInput").value,
        "group": document.getElementById("groupSelect").value,
        "category": document.getElementById("categorySelect").value,
        "rating": document.getElementById("ratingInput").value,
        "comments": []
    }

    localStorage.setItem("currentIndex", parseInt(localStorage.getItem("currentIndex"))+1);

    let spots = loadSpots();
    if (spots == null) {
        spots = [spot];
    } else {
        spots[spots.length] = spot;
    }
    localStorage.setItem('spots', JSON.stringify(spots));

    window.history.go(-1);
}

function updateRating(value) {
    document.getElementById("ratingTitle").innerHTML = `Rating: ${ratings[value]}`;
}