import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WaveSurferPlayer = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!audioUrl) return;

    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#ddd',
      progressColor: '#ff5500',
      cursorColor: '#ff0000',
      barWidth: 3,
      responsive: true,
      height: 100,
    });

    wavesurfer.current.load(audioUrl);

    wavesurfer.current.on('ready', () => {
      setCurrentTime(0);
    });

    wavesurfer.current.on('seek', () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioUrl]);

  const handleAddComment = () => {
    setComments([...comments, { time: currentTime, text: newComment }]);
    setNewComment('');
  };

  return (
    <div>
      <div ref={waveformRef} style={{ width: '100%', marginBottom: '10px' }}></div>
      <button onClick={() => wavesurfer.current && wavesurfer.current.playPause()}>
        Play / Pause
      </button>

      <div>
        <h3>Lisa kommentaar</h3>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Sisesta kommentaar..."
        />
        <button onClick={handleAddComment}>Lisa</button>
      </div>

      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.time.toFixed(2)}s:</strong> {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaveSurferPlayer;
