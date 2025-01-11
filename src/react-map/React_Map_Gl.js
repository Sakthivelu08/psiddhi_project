import React, { useEffect, useState } from "react";
import { GeolocateControl, Map, Marker } from "react-map-gl";

function ReactMapGLComponent() {

    const [viewPort, setViewPort] = useState({
        lattitude: 0,
        longitude: 0,
        zoom: 1
    });

    useEffect(() => {   
        navigator.geolocation.getCurrentPosition((pos) => {
            setViewPort({
                lattitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 3.5
            });
        });
    }, []);

    console.log("Viewport",viewPort);

    return (
        <Map
        mapboxAccessToken="pk.eyJ1Ijoic2FrdGhpMDciLCJhIjoiY20ydTVvaTc4MDlxOTJrcHpyeWZvaW9vNiJ9.3k2BSxyfy9NiUOKXrvMs_A"
        // initialViewState={{
        //     longitude: -100,
        //     latitude: 40,
        //     zoom: 3.5,
        //   }}
        initialViewState={viewPort}
        style={{ height: '50vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v11"
    >
        <Marker
            longitude={viewPort.longitude}
            latitude={viewPort.lattitude}
        />
        {/* GeolocateControl used to render a button which helps to go to our current location manually */}
        <GeolocateControl
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
        />
    </Map>
    );
}

export default ReactMapGLComponent;