import React from 'react';
import FileList from './components/FileList';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Google Drive File Viewer</h1>
      <FileList />
    </div>
  );
}

export default App;
