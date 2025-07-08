

// this is for testing only, when used with property call this function from show.ejs and pass the coordinates of the property if stored.
initShowMap(28.7041, 77.1025, "Delhi");
initShowMap(18.9582,  72.8321 , "Mumbai");
initShowMap(12.9629 , 77.5775,  "banglore");


function initShowMap(lat, lng, title) {
  console.log("map added")
  // Ensure #map div exists
  const mapElement = document.getElementById("map");
  if (!mapElement) {
    console.error("Map container with id 'map' not found.");
    return;
  }

  // Convert to numbers if passed as strings
  lat = Number(lat);
  lng = Number(lng);

  // Check for valid coordinates
  if (isNaN(lat) || isNaN(lng)) {
    console.error("Invalid coordinates provided to initShowMap.");
    return;
  }

  // Initialize Leaflet map
  const map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Add marker
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(title || "Listing Location")
    .openPopup();
}

