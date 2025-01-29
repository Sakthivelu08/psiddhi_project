import { Box, Dialog, DialogContent } from "@mui/material";
import { useContext, useEffect, useState } from "react";
// react-easy-crop
import Cropper from 'react-easy-crop';
import { AttachmentContext } from "../../containers/contexts/AttachmentContext";

function ImageCrop() {
    const {
        uploadedFiles,
        currentUploadedFiles,
        mapReference
    } = useContext(AttachmentContext);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cropDialogOpen, setCropDialogOpen] = useState(true);

    const onCropChange = cropValue => {
        setCrop(cropValue);
    }

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        // console.log(croppedArea, croppedAreaPixels);
    }

    const onMediaLoaded = mediaSize => {
        // console.log(mediaSize);
    }

    useEffect(() => {
        console.log("map ref from image crop", mapReference);
    }, [mapReference]);

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <img src={uploadedFiles[0]} alt="image" />
            {/* <Dialog
                open={cropDialogOpen}
                onClose={() => setCropDialogOpen(false)}
                maxWidth="xl"
                sx={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <DialogContent> */}
            {/* <Cropper
                image={URL.createObjectURL(uploadedFiles[0])}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={onCropChange}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onMediaLoaded={onMediaLoaded}
                objectFit="contain"
            /> */}
            {/* </DialogContent>
            </Dialog> */}
        </Box>
    );
}

export default ImageCrop;