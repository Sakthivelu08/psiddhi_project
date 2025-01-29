import { Box, Typography } from '@mui/material';
import { AttachmentContext } from '../../containers/contexts/AttachmentContext';
import { useContext, useEffect, useState } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import * as fabric from 'fabric';
import { FabricImage } from 'fabric';
// react-photo-editor
// import { ReactPhotoEditor } from 'react-photo-editor';
// import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
// import 'react-photo-editor/dist/style.css';

function ImageEditor() {
    const {
        mode,
        setMode,
        uploadedFiles,
        currentUploadedFiles
    } = useContext(AttachmentContext);
    const { editor, onReady } = useFabricJSEditor();

    const addImage = async () => {
        if (true || editor?.canvas) {
            console.log(uploadedFiles[0]);
            const imageUrl = URL.createObjectURL(uploadedFiles[0]);
            console.log(imageUrl);
            // const imageUrl = 'https://www.searchenginejournal.com/wp-content/uploads/2019/07/the-essential-guide-to-using-images-legally-online.png';
            // fabric.Image.fromURL(imageUrl, (img) => {
            //     if (!img) {
            //         console.error('Error loading image');
            //         return;
            //     }
            //     img.set({
            //         left: 50,
            //         top: 50,
            //         selectable: true,  // Ensure image can be selected
            //     });
            //     editor.canvas.add(img);
            //     editor.canvas.renderAll();  // Refresh canvas after adding
            // }, { crossOrigin: 'anonymous' });
            // const image = await FabricImage.fromURL(imageUrl);
            const image = await fabric.Image.fromURL(imageUrl);
            // const image = await FabricImage.fromURL(imageUrl, (img) => {
            //     img.set({
            //         left: 50,
            //         top: 50,
            //         selectable: true, // Ensure the image is selectable
            //     });
            // });
            // console.log("image", image);
            editor.canvas.add(image);
            editor?.canvas?.renderAll();
        }
    }

    useEffect(() => {
        // addImage();
        // if (!editor) {
        //     return;
        // }
        // fabric.Image.fromURL(URL.createObjectURL(uploadedFiles[0]), img => {
        //     editor.canvas.backgroundImage(
        //         URL.createObjectURL(uploadedFiles[0]),
        //         editor.canvas.renderAll.bind(editor.canvas),
        //         {
        //             scaleX: editor.canvas.width / img.width,
        //             scaleY: editor.canvas.height / img.height,
        //         }
        //     )
        // })

    }, [uploadedFiles]);

    // useEffect(() => {
    //     console.log("useeffect of image");
    // }, [editor.canvas?.backgroundImage]);

    // react-photo-editor - crop, color change like brightness, saturation, contrast, rotate, flip
    // const [showModal, setShowModal] = useState(true);
    // const handleClose = () => {
    //     setShowModal(false);
    // }
    // const handleSaveImage = (editedFile) => {
    //     console.log(editedFile);
    // }
    // return (
    //     <Box>
    //         {uploadedFiles && uploadedFiles.length > 0 && (
    //             <ReactPhotoEditor
    //                 file={uploadedFiles[0]}
    //                 open={showModal}
    //                 onClose={handleClose}
    //                 onSaveImage={handleSaveImage}
    //             />
    //         )}
    //     </Box>
    // );
    const onAddCircle = () => {
        editor?.addCircle()
    }

    return (
        <Box sx={{
            // width: '100%',
            // height: '100%'
        }}>
            <button onClick={onAddCircle}>Add circle</button>
            <button onClick={addImage}>Add image</button>
            <FabricJSCanvas className='fabric-canvas' onReady={onReady} />
        </Box>
    );
}

export default ImageEditor;