import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactMapGL, {
    Map,
    Marker,
    NavigationControl,
    FullscreenControl,
    AttributionControl,
    Popup,
    ScaleControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AttachmentContext } from '../../containers/contexts/AttachmentContext';

const token =
    'pk.eyJ1Ijoic2FrdGhpMDciLCJhIjoiY20ydTVvaTc4MDlxOTJrcHpyeWZvaW9vNiJ9.3k2BSxyfy9NiUOKXrvMs_A';

const homeLocation = {
    latitude: 13.120064,
    longitude: 80.063868
};

function MapRendering() {
    const { mapReference, setMapReference } = useContext(AttachmentContext);
    const [viewPort, setViewPort] = useState({});
    const [loading, setLoading] = useState(true);
    const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/satellite-streets-v12');
    const [showPopUp, setShowPopUp] = useState(true);
    const [searchResult, setSearchResult] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            console.log(pos);
            setViewPort({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 17
            });
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        console.log('View port', viewPort);
        console.log('loading', loading);
    }, [viewPort]);

    // useEffect(() => {
    //     const changeMapStyle = setTimeout(() => {
    //         setMapStyle("mapbox://styles/mapbox/streets-v12"); // not a satellite styling - for more stylings refer this - https://docs.mapbox.com/api/maps/styles/
    //         console.log('Changed map styling');
    //     }, 5000);

    //     return(() => clearTimeout(changeMapStyle));
    // }, []);

    const CurrentLocationButton = () => {
        return <Button>Hello</Button>;
    };

    useEffect(() => {
        if (mapRef.current) {
            const mapInstance = mapRef.current.getMap();
            setMapReference(mapInstance);
            console.log('mapReference', mapInstance);
        }
    }, [mapRef]);

    return (
        <>
            {!loading && (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        margin: 'auto',
                        // borderRadius: '15px',
                        // border: '2px solid black',
                        overflow: 'hidden',
                        position: 'relative'
                        // padding: '2px'
                    }}
                >
                    <Map
                        mapboxAccessToken={token}
                        ref={mapRef}
                        mapStyle={mapStyle}
                        // viewState={{ width: "100%", height: "100%"}} // I dont know for some reason, this causing the map not to move or zoom
                        initialViewState={viewPort}
                        onMove={event => setViewPort(event.viewState)} // Allow movement and zoom updates
                        attributionControl={false} // to remove open street map kind of texts
                        // projection={'winkelTripel'} // we can change the map rendering like globe, rectangle and there are many more shapes
                        renderWorldCopies={false} // to remove repetitive map rendering and it will render only one map like a actual globe
                        minZoom={3}
                        maxZoom={19}
                        style={{
                            width: '100%',
                            height: '100%'
                            // borderRadius: '15px',
                            // border: '2px solid black',
                            // margin: 'auto'
                        }}
                        onLoad={() => {
                            if (mapRef.current) {
                                const mapInstance = mapRef.current.getMap();
                                setMapReference(mapInstance);
                                console.log('mapReference', mapInstance);
                            }
                        }}
                    >
                        {/* <Marker latitude={homeLocation.latitude} longitude={homeLocation.longitude}>
                            <div style={{ color: "red", fontWeight: "bold" }}>Home</div>
                        </Marker> */}
                        {/* To enable the buttons like zoom in, zoom out, compass - which is used to tilt the map */}
                        <NavigationControl position="bottom-left" showCompass={false} showZoom={true} />
                        {/* To enable full screen of the map rendering */}
                        <FullscreenControl position="top-right" />
                        {/* To render custom attribution like open street map text under the map */}
                        {/* <AttributionControl customAttribution="Hi this is me" /> */}
                        {/* To show pop up when we click something / render pop up with some lattitude and logitude */}
                        {/* {showPopUp && (
                            <Popup
                                latitude={viewPort.latitude}
                                longitude={viewPort.longitude}
                                anchor="top"
                                onClose={() => setShowPopUp(false)}
                            >
                                You are here!
                            </Popup>
                        )} */}
                        {/* To show the height difference in ft, m */}
                        <ScaleControl unit="imperial" />
                    </Map>
                </Box>
            )}
        </>
    );
}

export default MapRendering;
