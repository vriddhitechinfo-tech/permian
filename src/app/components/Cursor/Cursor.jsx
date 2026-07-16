'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Cursor.module.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Hide cursor on mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;

    // Hide original cursor
    document.body.style.cursor = 'none';

    // GSAP quickTo for smooth performance
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.3, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.3, ease: 'power3' });

    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });

    const onMouseMove = (e) => {
      xTo(e.clientX - 16);
      yTo(e.clientY - 16);

      xDotTo(e.clientX - 3);
      yDotTo(e.clientY - 3);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Hover effects
    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 1.8, backgroundColor: 'rgba(227, 25, 55, 0.1)', borderColor: '#E31937', duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', borderColor: '#ffffff', duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, select, input, [role="button"]');
      targets.forEach((target) => {
        target.addEventListener('mouseenter', onMouseEnterLink);
        target.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    addHoverListeners();

    // Re-apply listeners if DOM changes (e.g. page changes)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'auto';
      observer.disconnect();
      const targets = document.querySelectorAll('a, button, select, input, [role="button"]');
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', onMouseEnterLink);
        target.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={cursorDotRef} className={styles.cursorDot} />
    </>
  );
}
