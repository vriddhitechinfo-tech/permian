'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './TransitionProvider.module.css';

export default function TransitionProvider({ children }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [savedPathname, setSavedPathname] = useState(pathname);
  const overlayRef = useRef(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip transition on first render
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (pathname !== savedPathname) {
      const overlay = overlayRef.current;
      
      // Page transition timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayChildren(children);
          setSavedPathname(pathname);
          window.scrollTo(0, 0);
          
          // Animate overlay out
          gsap.to(overlay, {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            duration: 0.6,
            ease: 'power3.inOut',
          });
        }
      });

      // Animate overlay in
      tl.to(overlay, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.6,
        ease: 'power3.inOut',
      });
    }
  }, [pathname, children, savedPathname]);

  // Update display children when they change on non-route update
  useEffect(() => {
    if (pathname === savedPathname) {
      setDisplayChildren(children);
    }
  }, [children, pathname, savedPathname]);

  return (
    <>
      <div 
        ref={overlayRef} 
        className={styles.overlay} 
        style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }} 
      />
      <div className={styles.pageContent}>
        {displayChildren}
      </div>
    </>
  );
}
