'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Check if the link contains a hash
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const targetPath = href.substring(0, hashIndex);
      const targetHash = href.substring(hashIndex);

      // Normalize paths to check if it's the same page
      const normalizePath = (path) => {
        if (!path || path === '/' || path === '') return '/';
        return path.replace(/\/$/, ''); // Remove trailing slash
      };

      const cleanTargetPath = normalizePath(targetPath);
      const cleanCurrentPath = normalizePath(window.location.pathname);

      // If the link points to a hash on the current page
      if (cleanTargetPath === cleanCurrentPath) {
        const id = targetHash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', targetHash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Handle scrolling after cross-page navigation to a hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
