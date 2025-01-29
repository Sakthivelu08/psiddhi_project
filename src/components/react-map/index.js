import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactMapGL, {
    Map,
    Marker,
    NavigationControl,
    FullscreenControl,
    AttributionControl,
    Popup,
    ScaleControl,
    useMap
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AttachmentContext } from '../../containers/contexts/AttachmentContext';
import { Geocoder, SearchBox } from '@mapbox/search-js-react';
import {
    MapboxExportControl,
    Size,
    PageOrientation,
    Format,
    DPI
} from '@watergis/mapbox-gl-export';
import '@watergis/mapbox-gl-export/dist/mapbox-gl-export.css';
import "./style.css";
// import MapboxGeoCoder from 'mapbox-gl-geocoder';
// import Geocoder from "react-map-gl-geocoder";

const token =
    'pk.eyJ1Ijoic2FrdGhpMDciLCJhIjoiY20ydTVvaTc4MDlxOTJrcHpyeWZvaW9vNiJ9.3k2BSxyfy9NiUOKXrvMs_A';

const homeLocation = {
    latitude: 13.120064,
    longitude: 80.063868
};

function MapRendering() {
    const [viewPort, setViewPort] = useState({
        latitude: homeLocation.latitude,
        longitude: homeLocation.longitude,
        zoom: 10
    });
    const [loading, setLoading] = useState(true);
    const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/satellite-streets-v12');
    const [showPopUp, setShowPopUp] = useState(true);
    const [searchResult, setSearchResult] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const mapRef = useRef(null);
    const {
        mode,
        setMode,
        uploadedFiles,
        setUploadedFiles,
        currentUploadedFiles,
        mapReference,
        setMapReference
    } = useContext(AttachmentContext);

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setViewPort({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    zoom: 17,
                    transitionDuration: 100
                });
                setLoading(false);
            },
            (err) => {
                console.error("Error retrieving location:", err);
                setLoading(false);
            }
        );
    };

    const handleRetrive = (result) => {
        setLoading(true);
        try {
            if (result && result.geometry?.coordinates) {
                const { coordinates } = result.geometry;
                setViewPort({
                    ...viewPort,
                    latitude: coordinates[1],
                    longitude: coordinates[0],
                    zoom: 17,
                    transitionDuration: 100
                });
            }
        } catch (error) {
            console.error("Error in handleRetrieve:", error);
        }
        setLoading(false);
    }

    const getImageFromMap = async () => {
        // if (mapRef.current) {
        //     const exportControl = mapRef.current?._controls?.find(
        //         (ctrl) => ctrl instanceof MapboxExportControl
        //     );

        //     console.log("exportControl", exportControl);

        //     if (exportControl) {
        //         const base64Image = await exportControl.getMapImage(); // Get map image as base64
        //         setUploadedFiles(base64Image);
        //     }
        // }
        console.log("exportControl");
        if (mapRef.current && mapRef.current.exportControl) {
            const base64Image = await mapRef.current.exportControl.getMapImage();
            setUploadedFiles(base64Image);
        }



        // if (mapRef?.current) {
        //     const canvas = mapRef.current.getCanvas();
        //     const gl = canvas.getContext("webgl");
        //     console.log(gl ? "WebGL is supported" : "WebGL is not supported");

        //     setTimeout(() => {
        //         console.log(mapRef.current.getCanvas().toDataURL());
        //         const imageURL = mapRef.current.getCanvas().toDataURL();
        //         console.log(imageURL);
        //     }, 1000);

        //     const imageURL = mapRef.current.getCanvas().toDataURL();
        //     console.log(imageURL);
        //     setUploadedFiles([imageURL]);
        //     console.log(mapRef.current.getCanvas().toDataURL());

        //     requestAnimationFrame(() => {
        //     const canvas = mapRef.current.getCanvas();
        //     console.log("canvas", canvas);
        //     const imageURL = canvas.toDataURL('image/png');
        //     console.log("imageURL", imageURL);

        //         // Trigger download
        //     const link = document.createElement('a');
        //     link.href = imageURL;
        //     link.download = 'map-image.png';
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        //     })

        //     console.log("Map image captured successfully!");
        // }
    }

    useEffect(() => {
        getCurrentLocation();
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

    const onMapLoad = () => {
        // console.log("Map has fully loaded");
        // console.log(mapRef.current.getCanvas().toDataURL());
        if (mapRef.current) {
            const mapInstance = mapRef.current.getMap();
            setMapReference(mapInstance);

            // const exportControl = new MapboxExportControl({
            //     dpi: 300, // Set resolution
            //     format: "png", // Image format
            //     crossOrigin: "anonymous",
            //     preventDownload: true, // Prevent auto-download
            //     accessToken: token,
            // });
            // mapInstance.addControl(exportControl, 'top-right');

            // adding export control to the map
            // mapInstance.addControl(
            //     new MapboxExportControl({
            //         PageSize: Size.A4,               // A4 size
            //         PageOrientation: PageOrientation.Landscape,
            //         Format: Format.PNG,              // Export as PNG
            //         DPI: DPI[300],                    // High resolution
            //         Crosshair: true,                  // Show crosshair on map
            //         PrintableArea: true,             // Show print guides
            //         accessToken: token,
            //         removeAttribution: true,           // Remove Mapbox attribution text
            //         preventDownload: true
            //     }),
            //     'top-right'  // Position on the map
            // );

            // mapInstance.exportControl = new MapboxExportControl({
            //     dpi: 300,
            //     format: "png",
            //     crossOrigin: "anonymous",
            //     preventDownload: true, // Avoid auto-download
            // });

            // const exportControl = new MapboxExportControl({
            //     dpi: 300,
            //     format: "png",
            //     crossOrigin: "anonymous",
            //     preventDownload: true, // Prevent auto-download
            // });

            // mapRef.current.exportControl = exportControl;

            // console.log("Export control initialized:", mapRef.current.exportControl);
            console.log('Mapbox export control added');
        }
    }

    useEffect(() => {
        // console.log("map ref", mapRef);
        if (mapRef.current) {
            const mapInstance = mapRef.current.getMap();
            setMapReference(mapInstance);
            // console.log('mapReference', mapInstance);
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
                    <Box>
                        {/* <SearchBox
                            accessToken={token}
                            options={{
                                proximity: {
                                    lng: viewPort.longitude,
                                    lat: viewPort.latitude,
                                },
                            }}
                            value={searchValue}
                            onChange={(value) => setSearchValue(value)}
                            onClear={getCurrentLocation}
                            onRetrieve={handleRetrive}
                        /> */}
                        <Geocoder
                            accessToken={token}
                            options={{
                                proximity: {
                                    lng: viewPort.longitude,
                                    lat: viewPort.latitude,
                                }
                            }}
                            value={searchValue}
                            onChange={(value) => setSearchValue(value)}
                            onClear={getCurrentLocation}
                            onRetrieve={handleRetrive}
                            popoverOptions={{
                                placement: 'top-start',
                                flip: true,
                                offset: 5
                            }}
                            onClick={(e) => {
                                console.log('Clicked on suggestion', e);
                            }}
                        />
                        <button onClick={getImageFromMap} style={{ margin: "10px" }}>
                            GET IMAGE
                        </button>
                        {/* <Button onClick={getImageFromMap}>Get image</Button> */}
                        {/* <button id="customExportBtn">Download Map</button> */}
                    </Box>
                    <Map
                        mapboxAccessToken={token}
                        ref={mapRef}
                        {...viewPort}
                        mapStyle={mapStyle}
                        // viewState={{ width: "100%", height: "100%"}} // I dont know for some reason, this causing the map not to move or zoom
                        initialViewState={viewPort}
                        // one of the route to access searched place but not efficient on zooming - viewState={viewPort}
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
                        onLoad={onMapLoad}
                    >
                        {/* <Marker latitude={homeLocation.latitude} longitude={homeLocation.longitude}>
                            <div style={{ color: "red", fontWeight: "bold" }}>Home</div></Marker> */}
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
