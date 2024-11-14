import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Data.css";

interface UploadedFile {
  id: number;
  fileName: string;
  fileSize: string;
  fileURL: string;
}

const Data = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  // const [file, setFile] = useState<File | null>(null);

  // Fetch files from the server on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/files/');
        
        const files = (response.data as any).map((file: any) => ({
          id: file.id,
          fileName: file.file.split('/').pop(), // Extract filename
          fileSize: `${(file.size / 1024).toFixed(2)} KB`,
          fileURL: file.file_url  // Use the URL from Django response
        }));
        
        setUploadedFiles(files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  // Handle file selection
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFile(event.target.files ? event.target.files[0] : null);
  // };

  // // Handle file upload to the server
  // const handleUpload = async () => {
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     try {
  //       const response = await axios.post('http://127.0.0.1:8000/api/files/', formData, {
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //       });
        
  //       const uploadedFile = {
  //         id: (response.data as any).id,
  //         fileName: (response.data as any).fileName,
  //         fileSize: `${(file.size / 1024).toFixed(2)} KB`,
  //         fileURL: `http://127.0.0.1:8000${(response.data as any).file}`
  //       };
        
  //       setUploadedFiles(prevFiles => [...prevFiles, uploadedFile]);
  //       setFile(null);  // Clear the file input
  //     } catch (error) {
  //       console.error("Error uploading file:", error);
  //     }
  //   }
  // };

  // Handle file removal
  // const handleRemoveFile = async (fileId: number) => {
  //   try {
  //     await axios.delete(`http://127.0.0.1:8000/api/data/${fileId}/`);
  //     setUploadedFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //   }
  // };

  return (
    <div className="data-page">
      <h1>Uploaded Data</h1>

      {/* <form onSubmit={(e) => e.preventDefault()}>
        <input type="file" onChange={handleFileChange} />
        <button type="button" onClick={handleUpload} disabled={!file}>Upload</button>
      </form> */}

      {/* Display uploaded files */}
      <div className="file-list">
        {uploadedFiles.map((uploadedFile) => (
          <div key={uploadedFile.id} className="file-details">
            <h3>{uploadedFile.fileName}</h3>
            {/* <p>File Name: {uploadedFile.fileName}</p> */}
            {/* <p>File Size: {uploadedFile.fileSize}</p> */}
            <div className="file-actions">
              {/* Download button */}
              <a href={uploadedFile.fileURL} download={uploadedFile.fileName} className="download-button">
                Download File
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
