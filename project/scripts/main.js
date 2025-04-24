document.getElementById("mapClosed").style.display = "flex";
document.getElementById("hubClosed").style.display = "none";
document.getElementById("mapOpen").style.display = "none";
document.getElementById("hubOpen").style.display = "none";

function openMap() {
    document.getElementById("mapClosed").style.display = "none";
    document.getElementById("hubClosed").style.display = "none";
    document.getElementById("mapOpen").style.display = "inline-flex";
    document.getElementById("hubOpen").style.display = "none";
}

function closeMap() {
    document.getElementById("mapClosed").style.display = "flex";
    document.getElementById("hubClosed").style.display = "none";
    document.getElementById("mapOpen").style.display = "none";
    document.getElementById("hubOpen").style.display = "none";
}

function openHub() {
    document.getElementById("mapClosed").style.display = "none";
    document.getElementById("hubClosed").style.display = "none";
    document.getElementById("mapOpen").style.display = "none";
    document.getElementById("hubOpen").style.display = "inline-flex";
}

function closeHub() {
    document.getElementById("mapClosed").style.display = "none";
    document.getElementById("hubClosed").style.display = "flex";
    document.getElementById("mapOpen").style.display = "none";
    document.getElementById("hubOpen").style.display = "none";
}