function get_data() {
  // check if the name is empty
  name = document.getElementById("search").value;

  url =
    "https://query-manager.herokuapp.com/search?lat=" +
    40.7128 +
    "&lon=" +
    -74.006 +
    "&query=" +
    name;

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", url, false);

  xmlHttp.send();
  result = JSON.parse(xmlHttp.responseText);
  search_places(result);
}
function search_places(result) {
  document.getElementById("places_result").style.display = "none";
  document.getElementById("places_result").innerHTML = "";
  document.getElementById("places_result").style.display = "block";

  for (i = 0; i < result.length; i++) {
    var node = document.createElement("h3");
    node.className = "place_result";
    node.textContent = result[i]["document"];
    node.setAttribute("lat", result[i]["location.lat"]);
    node.setAttribute("lon", result[i]["location.lon"]);
    node.setAttribute("name", result[i]["document"]);

    node.onclick = function (e) {
      document.getElementById("places_result").style.display = "none";
      document.getElementById("places_result").innerHTML = "";
      L.marker([e.target.getAttribute("lat"), e.target.getAttribute("lon")])
        .addTo(map)
        .bindPopup(e.target.getAttribute("name"))
        .openPopup();

      map.setView([e.target.getAttribute("lat"), e.target.getAttribute("lon")]);
    };
    document.getElementById("places_result").appendChild(node);
  }

  for (var index = 0; index < result.length; index++) {
    L.marker([result[index]["location.lat"], result[index]["location.lon"]])
      .addTo(map)
      .bindPopup(result[index]["document"]);
  }
}
