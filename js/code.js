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

initMap = (data) => {

    let map = L.map('map', {
        minZoom: -3
    })

    let geoJson = L.geoJson(data, {
        style: getStyle
    }).addTo(map);


    map.fitBounds(geoJson.getBounds());
};


fetchData();