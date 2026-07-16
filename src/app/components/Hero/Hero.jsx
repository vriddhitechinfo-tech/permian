'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HEADLINES = [
  {
    line: 'Concrete You Can Trust.',
    sub: 'We bring decades of expertise, premium materials, and unwavering commitment to every project across the Permian Basin.',
  },
  {
    line: 'Craftsmanship You Can Measure.',
    sub: 'From residential driveways to massive commercial foundations — every pour is backed by rigorous inspection and quality control.',
  },
  {
    line: 'Foundations We Own.',
    sub: 'Led by Alonso Cardenas, we take full ownership of every job. On time, on spec, and built to last in West Texas conditions.',
  },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const cardRef = useRef(null);
  const [active, setActive] = useState(0);
  const subTlRef = useRef(null);

  // Animate sub-text on active headline change
  useEffect(() => {
    if (!subRef.current) return;
    if (subTlRef.current) subTlRef.current.kill();
    const tl = gsap.timeline();
    subTlRef.current = tl;
    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bounce scroll indicator
      gsap.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.5 });
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.7,
      });

      // CTA fade up
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );

      // Stats fade in
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.1 }
        );
      }

      // Right card entrance
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
        );
      }

      // ScrollTrigger for sections below
      const sections = document.querySelectorAll('[data-reveal]');
      sections.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={sectionRef} className={styles.hero}>
      {/* Content grid */}
      <div className={styles.grid}>
        {/* LEFT: headline + sub + cta */}
        <div className={styles.left}>
          {/* Eyebrow */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLabel}>PERMIAN CONCRETE</span>
            <span className={styles.eyebrowArrow}>↓</span>
            <span className={styles.eyebrowSub}>STRENGTH · DURABILITY · PRECISION</span>
          </div>

          {/* Progressive interactive headlines */}
          <h1 className={styles.headlines}>
            {HEADLINES.map((h, i) => (
              <button
                key={i}
                className={[styles.headlineLine, active === i ? styles.headlineActive : styles.headlineDim].join(' ')}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                {h.line}
              </button>
            ))}
          </h1>

          {/* Animated sub-text */}
          <div className={styles.subWrapper}>
            <p ref={subRef} className={styles.sub}>
              {HEADLINES[active].sub}
            </p>
          </div>

          {/* CTA buttons */}
          <div ref={ctaRef} className={styles.ctas}>
            <Link href="/#contact" className={styles.btnPrimary}>
              Book a Free Estimate <span className={styles.arrow}>→</span>
            </Link>
            <Link href="/#services" className={styles.btnSecondary}>
              <span className={styles.playIcon}>▶</span> See Our Work
            </Link>
          </div>

          {/* Quick stats */}
          <div ref={statsRef} className={styles.stats}>
            {[
              { val: '15+', label: 'YEARS EXP.' },
              { val: '99.9%', label: 'SATISFACTION' },
              { val: '500+', label: 'PROJECTS' },
              { val: '24/7', label: 'SUPPORT' },
            ].map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statVal}>{s.val}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: floating trust card */}
        <div className={styles.right}>
          <div ref={cardRef} className={styles.trustCard}>
            {/* Card header */}
            <div className={styles.cardHeader}>
              <span className={styles.cardMono}>// strength.durability.precision</span>
              <div className={styles.cardBadge}>
                <span className={styles.beacon} />
                100% Guaranteed
              </div>
            </div>

            {/* SVG node graphic */}
            <div className={styles.cardGraphic}>
              <svg viewBox="0 0 400 220" className={styles.nodeSvg}>
                <defs>
                  <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E31937" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#E31937" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="200" cy="100" r="80" fill="url(#heroGlow)" />
                {/* Dashed connection lines */}
                <g stroke="#E31937" strokeWidth="1.25" strokeOpacity="0.25" strokeDasharray="3 3">
                  <line x1="200" y1="100" x2="110" y2="55" />
                  <line x1="200" y1="100" x2="290" y2="55" />
                  <line x1="200" y1="100" x2="120" y2="145" />
                  <line x1="200" y1="100" x2="280" y2="145" />
                </g>
                {/* Outer frame */}
                <g stroke="#E31937" strokeWidth="0.75" strokeOpacity="0.15">
                  <line x1="110" y1="55" x2="290" y2="55" />
                  <line x1="120" y1="145" x2="280" y2="145" />
                  <line x1="110" y1="55" x2="120" y2="145" />
                  <line x1="290" y1="55" x2="280" y2="145" />
                </g>
                {/* Corner nodes */}
                {[[110,55],[290,55],[120,145],[280,145]].map(([cx,cy], i) => (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="8" fill="#E31937" fillOpacity="0.15" />
                    <circle cx={cx} cy={cy} r="4.5" fill="#E31937" />
                  </g>
                ))}
                {/* Center shield icon */}
                <g transform="translate(178, 78)">
                  <circle cx="22" cy="22" r="26" stroke="#E31937" strokeWidth="1" strokeOpacity="0.3" fill="none" />
                  <path
                    d="M22 6 L9 11 V22 C9 29 14 35 22 37 C30 35 35 29 35 22 V11 L22 6 Z"
                    fill="#020617"
                    stroke="#E31937"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 21 L20 25 L28 16"
                    fill="none"
                    stroke="#E31937"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                {/* Bottom line */}
                <path d="M 30 195 H 370" stroke="#E31937" strokeWidth="1" strokeOpacity="0.15" />
                <path
                  d="M 30 195 C 100 192, 130 198, 200 195 C 270 192, 300 198, 370 195"
                  fill="none"
                  stroke="#E31937"
                  strokeWidth="2"
                  strokeOpacity="0.7"
                />
              </svg>
            </div>

            {/* Card footer */}
            <div className={styles.cardFooter}>
              <p className={styles.cardFooterText}>
                VERIFIED WORKMANSHIP — YOUR FOUNDATION, BUILT TO LAST.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll to explore</span>
        <span className={styles.scrollArrow}>↓</span>
      </div>
    </section>
  );
}
