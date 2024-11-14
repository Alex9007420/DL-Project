import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Submit.css";

interface SubmittedFile {
  id: number;
  fileName: string;
  fileSize: string;
  tabName: string;
}

const tabs = ['Left/Right Task', 'Saccade Task', 'Fixation Task', 'Segmentation Task', 'Scanpath Task', 'Path Task']; // Define tab names

const Submit = () => {
  const [activeTab, setActiveTab] = useState<string>('Left/Right Task');
  const [submittedFiles, setSubmittedFiles] = useState<SubmittedFile[]>([]);
  const [file, setFile] = useState<File | null>(null);

  // Fetch files from the submissions endpoint on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/submissions/', {
          headers: { Authorization: `Token ${token}` },
        });
        
        const files = (response.data as any).map((file: any) => ({
          id: file.id,
          fileName: file.file.split('/').pop(),
          fileSize: `${(file.size / 1024).toFixed(2)} KB`,
          tabName: file.tab_name || 'Left/Right Task', // Assumes each file has a tab name attribute
        }));
        
        setSubmittedFiles(files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  // Handle file upload to the submissions endpoint
  const handleUpload = async () => {
    if (!file) return;

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tab_name', activeTab); // Include the tab name

    try {
      const response: any = await axios.post('http://127.0.0.1:8000/api/submissions/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      });
      
      const uploadedFile = {
        id: response.data.id,
        fileName: response.data.file.split('/').pop(),
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
        tabName: activeTab,
      };
      
      setSubmittedFiles(prevFiles => [...prevFiles, uploadedFile]);
      setFile(null); // Clear the file input after upload

    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Handle file deletion
  const handleDelete = async (fileId: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/submissions/${fileId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setSubmittedFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // Filter files based on active tab
  const filesForActiveTab = submittedFiles.filter(file => file.tabName === activeTab);

  return (
    <div className="submit-page">
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <h1>{activeTab}</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="file" onChange={handleFileChange} />
          <button type="button" onClick={handleUpload} disabled={!file}>Upload</button>
        </form>

        <div className="file-list">
          <h2>Submitted Files</h2>
          {filesForActiveTab.map((submittedFile) => (
            <div key={submittedFile.id} className="file-details">
              <p>File Name: {submittedFile.fileName}</p>
              <p>File Size: {submittedFile.fileSize}</p>
              <div className="file-actions">
                <button onClick={() => handleDelete(submittedFile.id)} className="delete-button">
                  Delete File
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Submit;
