import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageSelector from './ImageSelector';  // Import ImageSelector

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');
    const [files, setFiles] = useState([]);

    const fetchFiles = async () => {
        try {
            const response = await axios.get('http://localhost:5001/files/');
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileType(e.target.name);
    };

    const onUpload = async () => {
        const formData = new FormData();
        formData.append(fileType, file);

        let uploadURL = '';
        if (fileType === 'image') {
            uploadURL = 'http://localhost:5001/upload-image';
        } else if (fileType === 'video') {
            uploadURL = 'http://localhost:5001/upload-video';
        }

        try {
            const response = await axios.post(uploadURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File Uploaded:', response.data);
            fetchFiles();
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleImageSelect = (path) => {
        console.log('Selected Image Path:', path);
    };

    const onDelete = async (filename) => {
        // ... [existing delete code]
    };
  

    return (
        <div>
        
            {/* Upload section */}
            <h3>Upload Image</h3>
            <input type="file" name="image" accept="image/*" onChange={onFileChange} />
            <h3>Upload Video</h3>
            <input type="file" name="video" accept="video/*" onChange={onFileChange} />
            <button onClick={onUpload}>Upload</button>

            {/* List of files */}
            <div>
                {files.map((file) => (
                    <div key={file._id}>
                        {file.filename} <button onClick={() => onDelete(file.filename)}>Delete</button>
                    </div>
                    
                ))}
            </div>
            <ImageSelector images={files.filter(file => file.type === 'image')} onSelect={handleImageSelect} />
        </div>
    );
};

export default FileUpload;


