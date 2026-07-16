'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './Preloader.module.css';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const panelTopRef = useRef(null);
  const panelBottomRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);
  const tlRef = useRef(null);

  /* Stable reference for the callback */
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  /* Counter helper – updates innerText from 0→100 */
  const counterObj = useRef({ value: 0 });

  const updateCounter = useCallback(() => {
    if (counterRef.current) {
      counterRef.current.textContent = `${Math.round(counterObj.current.value)}%`;
    }
  }, []);

  useEffect(() => {
    /* Prevent body scroll while preloader is active */
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          /* Re‑enable scroll & remove preloader from flow */
          document.body.style.overflow = originalOverflow || '';
          if (preloaderRef.current) {
            preloaderRef.current.style.pointerEvents = 'none';
          }
          onCompleteRef.current?.();
        },
      });

      tlRef.current = tl;

      /* 1 ▸ Fade in logo (0.5s) */
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });

      /* 2 ▸ Red line sweep (1s) */
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 1,
        ease: 'power3.inOut',
      });

      /* 3 ▸ Counter 0→100 (1.5s) */
      tl.to(counterRef.current, {
        opacity: 1,
        duration: 0.2,
      });

      tl.to(
        counterObj.current,
        {
          value: 100,
          duration: 1.5,
          ease: 'power1.inOut',
          onUpdate: updateCounter,
        },
        '<',
      );

      /* 4 ▸ Fade out content, then split‑reveal (0.8s) */
      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });

      tl.to(panelTopRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      });

      tl.to(
        panelBottomRef.current,
        {
          yPercent: 100,
          duration: 0.8,
          ease: 'power4.inOut',
        },
        '<', // sync with top panel
      );
    }, preloaderRef);

    /* Cleanup */
    return () => {
      ctx.revert();
      document.body.style.overflow = originalOverflow || '';
    };
  }, [updateCounter]);

  return (
    <div ref={preloaderRef} className={styles.preloader} aria-hidden="true">
      {/* Two black panels that will split apart */}
      <div ref={panelTopRef} className={styles.panelTop} />
      <div ref={panelBottomRef} className={styles.panelBottom} />

      {/* Centered content layer */}
      <div ref={contentRef} className={styles.content}>
        <div ref={logoRef} className={styles.logoWrap}>
          <Image
            src="/images/logo-black.png"
            alt="Permian Concrete"
            width={300}
            height={100}
            priority
            className={styles.logo}
          />
        </div>

        <div className={styles.lineWrap}>
          <div ref={lineRef} className={styles.line} />
        </div>

        <span ref={counterRef} className={styles.counter}>
          0%
        </span>
      </div>
    </div>
  );
}
