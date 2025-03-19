import { useRef, useEffect, useState } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import CommentSection from './CommentSection'; 

const WavesurferPlayer = ({ audioUrl }) => {
  const containerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [comments, setComments] = useState([]);

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    url: audioUrl,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    height: 100,
  });

  useEffect(() => {
    if (!wavesurfer) return;

    const interval = setInterval(() => {
      setCurrentTime(wavesurfer.getCurrentTime());
    }, 100);

    return () => clearInterval(interval);
  }, [wavesurfer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', marginBottom: '10px' }} />
      <div style={{ width: '100%', height: '3px', background: '#ddd', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: `${(currentTime / (wavesurfer?.getDuration() || 1)) * 100}%`,
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'black',
          }}
        />
      </div>
      <br />
      <button onClick={() => wavesurfer && wavesurfer.playPause()}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <p>{formatTime(currentTime)}</p>

      <CommentSection 
      onAddComment={handleAddComment}
      currentTime={formatTime(currentTime)} 
      />
    </div>
  );
};

export default WavesurferPlayer;