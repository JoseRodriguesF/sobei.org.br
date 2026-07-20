'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

const smoothScrollTo = (targetElement, duration = 2000) => {
  if (!targetElement) return;
  // Margem de respiro no topo para o título não bater no teto da tela
  const offset = 40;
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition);
    }
  };

  requestAnimationFrame(animation);
};

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Verifica se o link contém um hash
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const targetPath = href.substring(0, hashIndex);
      const targetHash = href.substring(hashIndex);

      // Normaliza caminhos
      const normalizePath = (path) => {
        if (!path || path === '/' || path === '') return '/';
        return path.replace(/\/$/, '');
      };

      const cleanTargetPath = normalizePath(targetPath);
      const cleanCurrentPath = normalizePath(window.location.pathname);

      if (cleanTargetPath === cleanCurrentPath) {
        const id = targetHash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          smoothScrollTo(element, 3000);
          window.history.pushState(null, '', targetHash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Trata rolagem após navegação entre páginas com hash na URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          smoothScrollTo(element, 3000);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
