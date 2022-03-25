import './styles/general.scss'
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Compare } from './components/Compare';

mapboxgl.accessToken = 'pk.eyJ1IjoidG9tLWZhdXN0IiwiYSI6ImNsMTI3M2JkbzAzcG8za3BkZG42ZWF6cTEifQ.6QbYKTRSF5IXZKKpXXKyaA';

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [compareOpen, setCompareOpen] = useState(false);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    function switchCompare(){
        setCompareOpen(!compareOpen)
    }

    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />

            <div id='open-compare' onClick={switchCompare}>&gt;</div>
            <Compare open={compareOpen} />
        </div>
    );

}

