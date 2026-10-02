'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export default function EventVideo({ src, poster, title = 'Vídeo do evento' }) {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsPlaying(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Erro ao reproduzir vídeo:', err);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      togglePlay();
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div 
      className="event-video" 
      onClick={togglePlay}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={title}
    >
      {hasStarted ? (
        <video
          ref={videoRef}
          autoPlay
          className="event-card__video"
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          playsInline
          controls
        >
          <source src={src} type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      ) : (
        <>
          {poster && (
            <Image
              src={poster}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="event-card__video"
              style={{ objectFit: 'cover' }}
            />
          )}
          <button
            type="button"
            className="event-video__btn"
            aria-label={`Reproduzir ${title}`}
            tabIndex={0}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28a1 1 0 0 0-1.5.86z" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
