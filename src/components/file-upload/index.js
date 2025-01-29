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

    const handleFileRejection = fileRejections => {
        // managing file rejections based on the file type.
        // we can add snackbar msg saying invalid file type. files should be uploaded only with these (.txt, .jpg) kinda message.
        // console.log("File rejection", fileRejections);
    }

    const onDrop = (acceptedFiles, fileRejections) => {
        setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]); // this is not needed as we will store these confirmed files in the blob.
        setCurrentUploadedFiles(acceptedFiles);
        if (fileRejections.length > 0) handleFileRejection(fileRejections);
    };

    const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop: onDrop,
        accept: {
            "text/plain": [".txt"],
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "image/*": [".png", ".jpg", ".jpeg"]
        },
        multiple: true,
        noClick: true,
        noKeyboard: true
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