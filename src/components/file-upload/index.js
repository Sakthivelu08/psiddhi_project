import { useDropzone } from "react-dropzone";
import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { AttachmentContext } from "../../containers/contexts/AttachmentContext";

function UploadFile() {
    const {
        uploadedFiles,
        setUploadedFiles,
        currentUploadedFiles,
        setCurrentUploadedFiles
    } = useContext(AttachmentContext);

    const onDrop = (files) => {
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        setCurrentUploadedFiles(files);
    };

    const { acceptedFiles, getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop: onDrop,
        accept: ['.png', '.jpg', '.jpeg', '.zip'],
        multiple: true,
        noClick: true,
        noKeyboard: true,
        // onDropAccepted: (files) => {
        //     console.log(files);
        //     setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        // }
    });

    return (
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

export default UploadFile;