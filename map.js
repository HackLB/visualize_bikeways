mapboxgl.accessToken = 'pk.eyJ1Ijoicm9nZXJob3dhcmQiLCJhIjoiY2lrOXlnZHFvMGc5ZnY0a3ViMHkyYTE0dyJ9.CWAOOChPtxviw8fVB0R1mQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/basic-v9',
    center: [-118.1478038, 33.7960355],
    zoom: 11.6
});


map.on('load', function() {
    // Load geojson and handle it
    d3.json('bikescore.geojson', function(err, data) {
        if (err) throw err;
    
        // Create parcels data source
        map.addSource('parcels', {
            'type': 'geojson',
            'data': data
        });

        // Add parcels layer, using bikescore to color parcels
        map.addLayer({
            'id': 'parcels-bikes',
            'type': 'fill',
            'source': 'parcels',
            'paint': {
                'fill-color': {
                    property: 'bikesc',
                    stops: [
                        [100.0, '#00ff00'],
                        [2000.0, '#ff0000']
                    ]
                }
            }
        });
    });
});