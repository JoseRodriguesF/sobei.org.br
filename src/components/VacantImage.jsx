'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function VacantImage({ src, alt, className = '' }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setAttemptIndex(0);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    const candidates = [];
    if (src) {
      if (src.endsWith('.jpg')) {
        candidates.push(src.replace(/\.jpg$/, '.jpeg'));
        candidates.push(src.replace(/\.jpg$/, '.png'));
      } else if (src.endsWith('.jpeg')) {
        candidates.push(src.replace(/\.jpeg$/, '.jpg'));
        candidates.push(src.replace(/\.jpeg$/, '.png'));
      }
    }

    if (attemptIndex < candidates.length) {
      setCurrentSrc(candidates[attemptIndex]);
      setAttemptIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div className={`vacant-image-placeholder ${className}`}>
        <div className="vacant-image-placeholder__content">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="vacant-image-placeholder__icon"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="vacant-image-placeholder__title">Espaço para Imagem</span>
          <span className="vacant-image-placeholder__filename">public{src}</span>
          <span className="vacant-image-placeholder__hint">Adicione a foto nesta pasta com este nome</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      key={currentSrc}
      src={currentSrc}
      alt={alt || 'Imagem'}
      fill
      className={className}
      priority
      onError={handleError}
    />
  );
}
