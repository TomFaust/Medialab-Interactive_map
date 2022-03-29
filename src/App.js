import './styles/general.scss'
import './styles/app.scss'
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

    const [openCompare, setOpenCompare] = useState(false);
    const [waterData, setWaterData] = useState({});
    const [baseData, setBaseData] = useState({
        'location': 'Nederland',
        'temp': 9,
        'hardness': 20
    });
    const [compareData, setCompareData] = useState({
        'location': 'Frankrijk',
        'temp': 7,
        'hardness': 24
    });

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        fetchWaterData()
    }, []);

    // Call this function via an onClick on the mappositions
    function selectedData(location) {
        // Get the waterdata belonging to the location from waterData

        // Check if this is for the baseData or compareData 
        // Put the data in the correct state
    }

    function fetchWaterData() {
        // Fetch waterdata from API & setWaterData()
        console.log('Pull the data Kronk');
    }

    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />

            <div id='open-compare' onClick={() => setOpenCompare(!openCompare)}>&gt;&gt;</div>
            <Compare open={openCompare} baseData={baseData} compareData={compareData} />
        </div>
    );

}

