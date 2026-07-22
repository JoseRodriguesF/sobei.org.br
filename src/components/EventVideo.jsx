'use client';

import { useRef, useState } from 'react';

export default function EventVideo({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="event-video" onClick={togglePlay}>
      <video
        ref={videoRef}
        preload="metadata"
        className="event-card__video"
        onEnded={handleEnded}
        playsInline
        muted
      >
        <source src={src} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>
      <button
        className={`event-video__btn ${isPlaying ? 'event-video__btn--playing' : ''}`}
        aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
        tabIndex={-1}
      >
        {isPlaying ? (
          /* Pause icon */
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          /* Play icon */
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28a1 1 0 0 0-1.5.86z" />
          </svg>
        )}
      </button>
    </div>
  );
}
