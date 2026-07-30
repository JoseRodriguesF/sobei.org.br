'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Variáveis globais para rastreamento e cancelamento instantâneo da rolagem automática
let currentAnimationId = null;
let cleanupInterruptListeners = null;

const stopCurrentScroll = () => {
  if (currentAnimationId !== null) {
    cancelAnimationFrame(currentAnimationId);
    currentAnimationId = null;
  }
  if (cleanupInterruptListeners) {
    cleanupInterruptListeners();
    cleanupInterruptListeners = null;
  }
};

// Curva de aceleração e desaceleração progressiva e suave (Ease-In-Out Quart)
const easeInOutQuart = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

const smoothScrollTo = (targetElement) => {
  if (!targetElement) return;

  // Interrompe imediatamente qualquer animação ativa anterior
  stopCurrentScroll();

  const isMobile = window.innerWidth <= 768;
  const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
  // Margem de respiro ajustada para mobile e desktop
  const offset = isMobile ? 16 : 40;

  const targetPosition = Math.max(
    0,
    targetElement.getBoundingClientRect().top + window.pageYOffset - offset - (isMobile ? headerHeight : 0)
  );
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;

  if (Math.abs(distance) < 5) return;

  // Duração mais cadenciada e suave (1100ms-1800ms no mobile, 1400ms-2200ms no desktop)
  const duration = isMobile
    ? Math.min(1800, Math.max(1100, Math.abs(distance) * 0.95))
    : Math.min(2200, Math.max(1400, Math.abs(distance) * 1.15));

  let startTime = null;

  // Desativa temporariamente o scroll-behavior CSS para evitar conflitos de animação dupla
  const docStyle = document.documentElement.style;
  const originalScrollBehavior = docStyle.scrollBehavior;
  docStyle.scrollBehavior = 'auto';

  const finishScroll = () => {
    stopCurrentScroll();
    docStyle.scrollBehavior = originalScrollBehavior;
  };

  // Eventos de toque, drag, scroll e teclado que indicam intervenção do usuário
  const interruptEvents = ['touchstart', 'touchmove', 'wheel', 'pointerdown', 'keydown'];

  const onUserInterrupt = () => {
    finishScroll();
  };

  interruptEvents.forEach((evt) => {
    window.addEventListener(evt, onUserInterrupt, { passive: true, once: true });
  });

  cleanupInterruptListeners = () => {
    interruptEvents.forEach((evt) => {
      window.removeEventListener(evt, onUserInterrupt);
    });
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = easeInOutQuart(progress);

    const currentPos = startPosition + distance * easeProgress;
    window.scrollTo(0, currentPos);

    if (progress < 1) {
      currentAnimationId = requestAnimationFrame(animation);
    } else {
      finishScroll();
    }
  };

  currentAnimationId = requestAnimationFrame(animation);
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
          smoothScrollTo(element);
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
          smoothScrollTo(element);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
