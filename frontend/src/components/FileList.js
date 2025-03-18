import React, { useEffect, useState } from 'react';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/files')
      .then(response => response.json())
      .then(data => {
        setFiles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading files...</p>;

  return (
    <div>
      <h2>Google Drive Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
