import './styles/general.scss'
import './styles/app.scss'
import React, { useRef, useEffect, useState } from 'react';
import { Compare } from './components/Compare';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import industry from './Assets/map-icons/industry.png'
import CompareIcon from './Assets/compare-icon.svg'
import MenuIcon from './Assets/menu-icon.svg'
import SearchIcon from './Assets/search-icon.svg'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [zoom, setZoom] = useState(9);

    const [countries, setCountries] = useState({})
    const [openCompare, setOpenCompare] = useState(false);
    const [isBaseCountry, setIsBaseCountry] = useState(true);
    const [baseData, setBaseData] = useState({});
    const [compareData, setCompareData] = useState({});

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

        document.getElementsByClassName('mapboxgl-ctrl-attrib-inner')[0].remove();
        document.querySelector('[aria-label="Mapbox logo"]').remove();

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

        // map.current.addControl(
        //     new MapboxGeocoder({
        //         accessToken: mapboxgl.accessToken,
        //         mapboxgl: mapboxgl
        //     }),
        //     'top-left'
        // );

        fetchCountries()
    }, []);

    // Call this function via an onClick on the mappositions
    // See what country is clicked, fetch the correct data and put it in state Base- or CompareCountry
    async function selectedData(location) {
        // Get the selected country data 
        let selectedCountry = countries.find(obj => {
            return obj.name === location
        }) 

        console.log(selectedCountry);

        // Check which country the user wants to change
        if (isBaseCountry)  {setBaseData(await fetchCountryWaterProps(selectedCountry.companies[0]._id))}
        else                {setCompareData(await fetchCountryWaterProps(selectedCountry.companies[0]._id))}
        
        // If the base country has changed, set the switch to false, so that the next chosen country will alter the compare country
        setIsBaseCountry(false)
    }

    // Fetch waterProperties from the first company of a country 
    async function fetchCountryWaterProps(id) {
        console.log('Pull the water Kronk');
        console.log('Fetch: ' + window.location.protocol + '//' + window.location.hostname + ':8000/api/company/' + id);

        let data
        await fetch(window.location.protocol + '//' + window.location.hostname + ':8000/api/company/' + id)
            .then((res) => res.json())
            .then((json) => data = json.company.waterProperties)

        console.log(data);
        return data
    }
    
    // GET all the countries and put them in state Countries
    async function fetchCountries() {
        console.log('Pull the countries Kronk');
        console.log('Fetch: ' + window.location.protocol + '//' + window.location.hostname + ':8000/api/country');

        let data
        await fetch(window.location.protocol + '//' + window.location.hostname + ':8000/api/country')
            .then((res) => res.json())
            .then((json) => data = json)

        console.log(data)
        setCountries(data)
    }

    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container">
            </div>

            <div id='menu-bar'>
                <div id='search'>
                    <img src={MenuIcon}/>
                    <p>Search a country</p>
                    <img src={SearchIcon}/>
                </div>
                <img src={CompareIcon} id='compare-icon' onClick={() => setOpenCompare(!openCompare)} />
            </div>
            <Compare open={openCompare} baseData={baseData} compareData={compareData} setIsBaseCountry={setIsBaseCountry}/>

            {/* temporary solution, the onClick needs to be corresponding to the location pins on the map. */}
            <div className='countries'> 
                <div onClick={()=> selectedData("Belgium")}> Belgium </div>
                <div onClick={()=> selectedData("Netherlands")}> Netherlands </div>
            </div>
        </div>
    );

}
