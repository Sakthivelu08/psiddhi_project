import { Box, Button, Grid2, Paper, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactMapGL from "./React_Map_Gl";
import SearchableMap from "./mapRendering";
import { useDropzone } from "react-dropzone";

function MapRendering() {
    const [mode, setMode] = useState('options');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const {acceptedFiles, getRootProps, getInputProps, isDragActive, open} = useDropzone({
        onDrop: (files) => {
            console.log(files);
            setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        },
        accept: "image/*",
        multiple: true,
        noClick: true,
        noKeyboard: true,
        onDropAccepted: (files) => {
            console.log(files);
            setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        }
    });
    const [mapReference, setMapReference] = useState(null);
    const CalculateWidth = () => {
        if(useMediaQuery('(min-width:1000px)')) return 'calc(100%)';
        return 0;
    }
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
    ));

    const UploadFile = () => {
        return(
            <Paper
                variant="outlined"
                elevation={0}
                {...getRootProps()}
                sx={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    border: "2px dashed lightgrey",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isDragActive ? "#f0f0f0" : "white",    
                    cursor: "pointer"
                }}
                onDragOver={(event) => event.preventDefault()}
                onClick={open}
            >
                <input {...getInputProps()} />
                <Typography variant="body1">
                    {isDragActive ? "Drop the files here..." : "Drag & drop files here, or click to select files"}
                </Typography>
            </Paper>
        );
    }

    const getCanvas = () => {

    }

    useEffect(() => {
        console.log("files", files);
    }, [files]);

     useEffect(() => {
        console.log("from other comp",mapReference);
    }, [mapReference]);

    return(
        <Grid2 container direction={'column'} sx={{ height: '60vh', bottom: 0} }>
            <Grid2 container spacing={10} sx={{ padding: '50px 50px 0px 50px', justifyContent: 'center'}}>
            <Grid2 item xs={6}>
                <Box sx={{ width: '35vw', height: '50vh', textAlign: 'center',display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8e8e8', border: mode != 'upload' && '1px solid black' }}>
                    {mode === 'map' && (
                        <SearchableMap mapReference={mapReference} setMapReference={setMapReference} />
                    )}
                    {mode === 'upload' && <UploadFile />}
                    {mode === 'options' && 
                        <Typography>
                            <Button variant="primary" onClick={() => setMode('upload')}>
                                Upload From Device
                            </Button>
                            <span> or </span>
                            <Button variant="primary" onClick={() => setMode('map')}>
                                Upload from Map
                            </Button>
                        </Typography>
                    }
                </Box>
            </Grid2>
            <Grid2 item xs={6}>
                <Box sx={{ width: '35vw', height: '50vh', textAlign: 'center',display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8e8e8' }}>
                    {files && files.length > 0 &&
                        files.map((file, index) => (
                            <Typography key={file}>{file.size} bytes</Typography>
                        ))
                    }
                    {mode === 'options' && <Typography>Image Preview</Typography>}
                </Box>
            </Grid2>
        </Grid2>
        <Grid2 container spacing={10} sx={{ padding: '10px', justifyContent: 'center'}}>
            <Grid2 item xs={6}>
            <Box sx={{ width: '35vw', height: '50px', textAlign: 'center',display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8e8e8' }}>
                <Button variant="primary" disabled={!(mode === 'map')}>
                        Continue
                </Button>
                <Button variant="secondary" disabled={mode === 'options'} onClick={() => setMode('options')}>
                        Back
                </Button>
            </Box>
            </Grid2>
            <Grid2 item xs={6}>
                <Box sx={{ width: '35vw', height: '50px', textAlign: 'center',display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8e8e8' }}>
                </Box>
            </Grid2>
        </Grid2>
        </Grid2>
    );
}

export default MapRendering;