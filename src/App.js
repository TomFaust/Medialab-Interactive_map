import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import React, {useRef, useEffect, useState} from 'react';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [zoom, setZoom] = useState(9);

    let dummyData = {}

    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
            center: [lng, lat],
            zoom: zoom
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                map.current.jumpTo({
                    center: [
                        position.coords.longitude,
                        position.coords.latitude
                    ],
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });

            });
        }

        map.current.on('move', () => {
            setLng(parseFloat(map.current.getCenter().lng.toFixed(4)));
            setLat(parseFloat(map.current.getCenter().lat.toFixed(4)));
            setZoom(parseFloat(map.current.getZoom().toFixed(2)));
        });

        document.getElementsByClassName('mapboxgl-control-container')[0].remove();

        map.current.on('load', () => {

            map.current.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
                (error, image) => {
                    if (error) throw error;

                    // Add the image to the map style.
                    map.current.addImage('cat', image);

                    // Add a data source containing one point feature.
                    map.current.addSource('point', {
                        'type': 'geojson',
                        'cluster': true,
                        'clusterMaxZoom': 14, // Max zoom to cluster points on
                        'clusterRadius': 50,
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [5.4135, 51.9669]
                                    }
                                },
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [5.5135, 51.9669]
                                    }
                                }
                            ]
                        }
                    });

                    map.current.addLayer({
                        id: 'clusters',
                        type: 'circle',
                        source: 'point',
                        filter: ['has', 'point_count'],
                        paint: {
                            'circle-color': [
                                'step',
                                ['get', 'point_count'],
                                '#51bbd6',
                                100,
                                '#f1f075',
                                750,
                                '#f28cb1'
                            ],
                            'circle-radius': [
                                'step',
                                ['get', 'point_count'],
                                20,
                                100,
                                30,
                                750,
                                40
                            ]
                        }
                    });

                    map.current.addLayer({
                        id: 'cluster-count',
                        type: 'symbol',
                        source: 'point',
                        filter: ['has', 'point_count'],
                        layout: {
                            'text-field': '{point_count_abbreviated}',
                            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                            'text-size': 12
                        }
                    });


                    // Add a layer to use the image to represent the data.
                    map.current.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        'source': 'point', // reference the data source
                        'filter': ['!', ['has', 'point_count']],
                        'layout': {
                            'icon-image': 'cat', // reference the image
                            'icon-size': 0.25
                        }
                    });
                }
            );
        })

    });

    return (
        <div className='container'>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container">
            </div>
        </div>
    );

}
