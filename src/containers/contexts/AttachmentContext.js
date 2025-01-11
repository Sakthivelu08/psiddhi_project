import React, { createContext, useState } from "react";

export const AttachmentContext = createContext();

function AttachmentProvider({ children }) {
    const [mode, setMode] = useState('options');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [currentUploadedFiles, setCurrentUploadedFiles] = useState([]);
    const [mapReference, setMapReference] = useState(null);

    return (
        <AttachmentContext.Provider
            value={{
                mode,
                setMode,
                uploadedFiles,
                setUploadedFiles,
                currentUploadedFiles,
                setCurrentUploadedFiles,
                mapReference,
                setMapReference
            }}
        >
            {children}
        </AttachmentContext.Provider>
    );
}

export default AttachmentProvider;