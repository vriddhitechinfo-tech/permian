'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Comparison.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const THEM = [
  'No-show crews and missed deadlines',
  'Inconsistent mixes, poor curing practices',
  'Surprise charges after the job starts',
  'One-size-fits-all solutions',
  'No warranty, no accountability',
  'You chase them for updates',
];

const US = [
  'Show up on time, every time — guaranteed',
  'Premium-grade concrete, precision mixed for West Texas heat',
  'Fixed, transparent quotes before work begins',
  'Custom solutions for each soil condition and use case',
  'Every project backed by workmanship warranty',
  "Weekly updates — you're always in the loop",
];

export default function Comparison() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Heading */}
        <div className={styles.heading} data-reveal>
          <span className={styles.badge}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
            The Difference
          </span>
          <h2 className={styles.title}>
            Contractors Got{' '}
            <span className={styles.strikethrough}>Slow</span>. We Got{' '}
            <span className={styles.highlight}>Smarter.</span>
          </h2>
        </div>

        {/* Comparison grid */}
        <div className={styles.grid}>
          {/* LEFT: Traditional */}
          <div ref={leftRef} className={styles.cardLeft}>
            <h3 className={styles.cardTitle}>The Typical Contractor</h3>
            <ul className={styles.list}>
              {THEM.map((item, i) => (
                <li key={i} className={styles.listItem}>
                  <span className={styles.crossIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </span>
                  <span className={styles.listText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* VS Badge */}
          <div className={styles.vsBadge} aria-hidden="true">VS</div>

          {/* RIGHT: Permian Concrete */}
          <div ref={rightRef} className={styles.cardRight}>
            <h3 className={styles.cardTitleRight}>Permian Concrete</h3>
            <ul className={styles.list}>
              {US.map((item, i) => (
                <li key={i} className={styles.listItem}>
                  <span className={styles.checkIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <span className={styles.listText}>{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/#contact" className={styles.cta}>
              Start Your Project →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
