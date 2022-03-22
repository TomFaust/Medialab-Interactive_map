import React, {useState} from "react";
import Map from 'react-map-gl';

export default function App() {

    const [viewport,setViewport] = useState({
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
        width:"100vw",
        height:"100vh",
    })

    return (
        <div>
            <Map {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>test</Map>
        </div>
    );
}

