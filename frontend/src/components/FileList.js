import React, { useEffect, useState } from 'react';
import WavesurferPlayer from './WaveSurferPlayer';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAudioUrl, setSelectedAudioUrl] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/files').then(response => response.json())
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
          <li key={file.id}>
            {file.name}
            <br />
            <button onClick={() => setSelectedAudioUrl(`http://localhost:8080/api/proxy?id=${file.id}`)}>
              Ava
            </button>
          </li>
        ))}
      </ul>
      {selectedAudioUrl && <WavesurferPlayer audioUrl={selectedAudioUrl} />}
    </div>
  );
};

export default FileList;
