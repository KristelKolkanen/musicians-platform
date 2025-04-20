import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WavesurferPlayer = ({ audioUrl }) => {
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!audioUrl || !containerRef.current) return;

    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    const ws = WaveSurfer.create({
      container: containerRef.current,
      url: audioUrl,
      waveColor: [
        "#FFFFFF",
        "#717171",
        "#515151",
        "#B3D3B7",
        "#88A38B",
      ],
      progressColor: [
        "green",
        "#40534C",
        "#61BEBE",
        "#1A3636",
        "#316464",
      ],
      barWidth: 1.5,
      barGap: 2,
      barRadius: 3,
      height: 100,
    });

    wavesurferRef.current = ws;

    ws.on('audioprocess', () => {
      setCurrentTime(ws.getCurrentTime());
    });

    ws.on('finish', () => {
      setIsPlaying(false);
    });

    return () => {
      ws.destroy();
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const ws = wavesurferRef.current;
    if (!ws) return;
    ws.playPause();
    setIsPlaying(ws.isPlaying());
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', marginBottom: '10px' }} />
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <p>{formatTime(currentTime)}</p>
    </div>
  );
};

export default WavesurferPlayer;
