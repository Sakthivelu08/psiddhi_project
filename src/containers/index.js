import { Box, Button, Grid2, Paper, Typography, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ReactMapGL from '../components/react-map/React_Map_Gl';
import SearchableMap from '../components/react-map';
import UploadFile from '../components/file-upload';
import { AttachmentContext } from './contexts/AttachmentContext';
import ImageEditor from '../components/image-editor';
import ImageCrop from '../components/image-crop';

function AttachmentModule() {
    // const [mode, setMode] = useState('options');
    const {
        mode,
        setMode,
        uploadedFiles,
        setUploadedFiles,
        currentUploadedFiles
    } = useContext(AttachmentContext);

    const CalculateWidth = () => {
        if (useMediaQuery('(min-width:1000px)')) return 'calc(100%)';
        return 0;
    };

    useEffect(() => {
        console.log('mode', mode);
        console.log('uploadedFiles', uploadedFiles);
        console.log('currentUploadedFiles', currentUploadedFiles);
    }, [mode, uploadedFiles]);

    return (
        <Box>
            <Box
                sx={{
                    width: '100%',
                    height: '40vh'
                }}
            ></Box>
            <Grid2 container direction={'column'}>
                <Grid2
                    container
                    spacing={10}
                    sx={{ padding: '50px 50px 0px 50px', justifyContent: 'center' }}
                >
                    <Grid2 xs={6}>
                        <Box
                            sx={{
                                width: '35vw',
                                height: '50vh',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#e8e8e8',
                                border: mode !== 'upload' && '1px solid black'
                            }}
                        >
                            {mode === 'map' && (
                                <SearchableMap />
                            )}
                            {mode === 'upload' && <UploadFile />}
                            {mode === 'options' && (
                                <Typography>
                                    <Button variant="primary" onClick={() => setMode('upload')}>
                                        Upload From Device
                                    </Button>
                                    <span> or </span>
                                    <Button variant="primary" onClick={() => setMode('map')}>
                                        Upload from Map
                                    </Button>
                                </Typography>
                            )}
                        </Box>
                    </Grid2>
                    <Grid2 xs={6}>
                        <Box
                            sx={{
                                width: '35vw',
                                height: '50vh',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#e8e8e8'
                            }}
                        >
                            {mode === 'options' ? (
                                <Typography>Image Preview</Typography>
                            ) : (
                                // <></>
                                // uploadedFiles && uploadedFiles.map((file, index) => {
                                //     return (
                                //         <Box sx={{ width: '100%', height: '100%' }}>
                                //             {/* this box is not needed as the same width and height is set to image */}
                                //             <img key={index} src={URL.createObjectURL(file)} width='100%' height='100%' />
                                //         </Box>
                                //     );
                                // })
                                // <ImageEditor />
                                uploadedFiles?.length > 0 ? (
                                    // <ImageEditor />
                                    <ImageCrop />
                                ) : (
                                    <Typography>Upload image to preview the file</Typography>
                                )
                            )}
                        </Box>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={10} sx={{ padding: '10px', justifyContent: 'center' }}>
                    <Grid2 xs={6}>
                        <Box
                            sx={{
                                width: '35vw',
                                height: '50px',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#e8e8e8'
                            }}
                        >
                            <Button variant="primary" disabled={!(mode === 'map')}>
                                Continue
                            </Button>
                            <Button
                                variant="secondary"
                                disabled={mode === 'options'}
                                onClick={() => setMode('options')}
                            >
                                Back
                            </Button>
                        </Box>
                    </Grid2>
                    <Grid2 xs={6}>
                        <Box
                            sx={{
                                width: '35vw',
                                height: '50px',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#e8e8e8'
                            }}
                        ></Box>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default AttachmentModule;
