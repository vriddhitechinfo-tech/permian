'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Marquee.module.css';

export default function Marquee({ items = [], speed = 25 }) {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    // Create a seamless infinite loop animation using GSAP
    const animation = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: speed,
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, [speed]);

  // Duplicate items array to make the loop seamless
  const marqueeItems = [...items, ...items];

  return (
    <div className={styles.marquee} role="marquee">
      <div ref={trackRef} className={styles.track}>
        {marqueeItems.map((item, idx) => (
          <span key={idx} className={styles.item}>
            <span className={styles.text}>{item}</span>
            <span className={styles.dot} aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
