const fetchData = async () => {
    const url = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
    const res = await fetch(url)
    const data = await res.json()

    initMap(data)
};

// GeoJSON style: ensure weight: 2 as requested
function getStyle(feature) {
    return {
        weight: 2
    };
}

function bindTooltip(feature, layer) {
    if (feature.properties && feature.properties.name) {
        layer.bindTooltip(feature.properties.name);
    }
}


initMap = (data) => {

    let map = L.map('map', {
        minZoom: -3
    })

    let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(map);


    let geoJson = L.geoJson(data, {
        style: getStyle,
        onEachFeature: bindTooltip
    }).addTo(map);

    let baseMaps = {
        "OpenStreetMap": osm
    };


    map.fitBounds(geoJson.getBounds());
};


fetchData();