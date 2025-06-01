let index = localStorage.getItem("postIndex");
let allSpots = JSON.parse(localStorage.getItem("spots"));
let spot = allSpots[index];

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

document.getElementById('postGroup').innerHTML = "/" + spot.group;
document.getElementById('postCategory').innerHTML = spot.category;
document.getElementById("postTitleText").innerHTML = spot.title;
document.getElementById("postCoords").innerHTML = `${spot.lat}°N ${spot.lon}°E`;
document.getElementById("postAccessibility").innerHTML = `Accessibility: ${spot.accessibility}`;
document.getElementById("postRating").innerHTML = `Rating: ${ratings[spot.rating]} (${spot.rating}/10)`
document.getElementById("postBody").innerHTML = spot.body;

loadComments();

var map = L.map('postMap', {attributionControl: false, zoomControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false}).setView([spot.lat, spot.lon], 17);

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

function addComment(event) {
    event.preventDefault();

    spot = allSpots[index];
    spot.comments[spot.comments.length] = {"username": "Pilot #" + Math.floor(Math.random() * 100000), // just randomly generates usernames because I don't have time to implement an account system, makes the whole thing seem a bit more alive
        "message": document.getElementById("commentInput").value};
    document.getElementById("commentInput").value = "";
    allSpots[index] = spot;
    localStorage.setItem("spots", JSON.stringify(allSpots));

    loadComments();
}

function loadComments() {
    allSpots = JSON.parse(localStorage.getItem("spots"));
    document.getElementById("comments").innerHTML = "";
    allSpots[index].comments.forEach(comment => {
    document.getElementById("comments").innerHTML += `
        <div class="comment">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="1" y="1" width="38" height="38" rx="19" stroke="#EBEBEB" stroke-width="2"/>
                <path d="M33.3333 36.6667H6.66663V33.3333C6.66663 28.731 10.3976 25 15 25H25C29.6023 25 33.3333 28.731 33.3333 33.3333V36.6667ZM20 21.6667C14.4771 21.6667 9.99996 17.1895 9.99996 11.6667C9.99996 6.14381 14.4771 1.66666 20 1.66666C25.5228 1.66666 30 6.14381 30 11.6667C30 17.1895 25.5228 21.6667 20 21.6667Z" fill="#EBEBEB"/>
            </svg>
            <div class="commentRight">
                <p class="commentUsername">${comment.username}</p>
                <p class="commentText">${comment.message}</p>
            </div>
        </div>
    `;
    });
}