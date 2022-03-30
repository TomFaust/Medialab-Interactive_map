import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useRef, useEffect, useState } from 'react';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function App() {


    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {

        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/qwinsie/cl1c8li5l000m15s1p65hoex6',
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

            const importAll = require =>
                require.keys().reduce((acc, next) => {
                    acc[next.replace("./", "")] = require(next);
                    return acc;
                }, {});

            const images = importAll(
                require.context("./Assets/map-icons", false, /\.(png|jpe?g|svg)$/)
            );

            map.current.loadImage(
                images['industry.png'],
                (error, image) => {
                    if (error) throw error;

                    // Add the image to the map style.
                    map.current.addImage('icon', image);

                    // Add a data source containing one point feature.
                    map.current.addSource('point', {
                        'type': 'geojson',
                        'cluster': true,
                        'clusterMaxZoom': 21, // Max zoom to cluster points on
                        'clusterRadius': 50,
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [5.4135, 51.9669]
                                    },
                                    'properties':{
                                        'name':'a flag'
                                    }
                                },
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [5.5135, 51.9669]
                                    },
                                    'properties':{
                                        'name':'a flag'
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
                            'circle-color': '#26b4f4',
                            'circle-radius': 15,
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#109ede',
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
                            'text-size': 12,
                        },
                        paint: {
                            "text-color": "#ffffff"
                        }
                    });


                    // Add a layer to use the image to represent the data.
                    map.current.addLayer({
                        'id': 'unclustered-point',
                        'type': 'symbol',
                        'source': 'point', // reference the data source
                        'filter': ['!', ['has', 'point_count']],
                        'layout': {
                            'icon-image': 'icon', // reference the image
                            'icon-size': 0.1
                        }
                    });
                }
            );
        })

        map.current.on('click', 'unclustered-point', (e) => {
            const description = e.features[0].properties;
            console.log(description)
        });

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
