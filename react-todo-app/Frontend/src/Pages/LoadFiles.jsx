import axios from 'axios';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile) {
          console.log('Selected file:', selectedFile);
          const file = selectedFile;
    
          // Opciones para redimensionar la imagen
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 300,
            useWebWorker: true,
          };
    
          try {
            const compressedFile = await imageCompression(file, options);
    
            // Obtener la extensión del archivo original
            const extension = compressedFile.name.split('.').pop();
            // Crear un nuevo nombre usando la fecha y hora actuales
            const newName = `${Date.now()}.${extension}`;
            // Crear un nuevo archivo Blob con el nuevo nombre
            const renamedFile = new File([compressedFile], newName, { type: compressedFile.type });
    
            const data = new FormData();
            data.append("file", renamedFile);
            data.append("upload_preset", "preset_test");
    
            const response = await axios.post("https://api.cloudinary.com/v1_1/dlx1sufu4/image/upload", data);
            setPreview(response.data.secure_url);
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        } else {
          console.log('No file selected');
        }
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {preview && (
                <div>
                    <p>File name: {selectedFile.name}</p>
                    <p>File type: {selectedFile.type}</p>
                    <p>File size: {selectedFile.size} bytes</p>
                    <img src={preview} alt="Preview" style={{ maxHeight: '500px', maxWidth: '500px' }} />
                </div>
            )}
        </div>
    );
};

export default FileUpload;
