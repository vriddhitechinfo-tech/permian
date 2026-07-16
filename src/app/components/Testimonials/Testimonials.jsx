'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Testimonials.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    name: 'Robert & Maria Torres',
    project: 'Residential Driveway',
    quote:
      'Permian Concrete transformed our front yard with a beautiful stamped driveway. The crew was professional, on time, and the quality exceeded our expectations. Highly recommend!',
    stars: 5,
  },
  {
    name: 'David Mitchell',
    project: 'Commercial Foundation',
    quote:
      'We hired Permian Concrete for our warehouse foundation in Odessa. The project was completed ahead of schedule and the quality of work was outstanding. Alonso and his team are true professionals.',
    stars: 5,
  },
  {
    name: 'Jennifer & Carlos Ruiz',
    project: 'Backyard Patio',
    quote:
      'Our new patio is absolutely stunning. The team was meticulous with every detail and the finished product looks better than we imagined. Best concrete company in the Permian Basin!',
    stars: 5,
  },
  {
    name: 'Thompson Industrial Group',
    project: 'Industrial Flooring',
    quote:
      "We've used Permian Concrete for multiple commercial projects and they consistently deliver excellence. Their expertise in large-scale concrete work is unmatched in the region.",
    stars: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef = useRef(null);
  const intervalRef = useRef(null);
  const [active, setActive] = useState(0);

  /* ── GSAP heading reveal ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Slide transition ── */
  const animateIn = useCallback(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, []);

  /* ── Navigation helpers ── */
  const goTo = useCallback(
    (index) => {
      if (index === active) return;
      gsap.to(cardRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          setActive(index);
        },
      });
    },
    [active]
  );

  const next = useCallback(() => {
    goTo((active + 1) % testimonials.length);
  }, [active, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + testimonials.length) % testimonials.length);
  }, [active, goTo]);

  /* animate-in whenever active changes */
  useEffect(() => {
    animateIn();
  }, [active, animateIn]);

  /* ── Auto-advance ── */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  /* Reset auto-advance timer on manual interaction */
  const resetInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  }, []);

  const handlePrev = () => {
    prev();
    resetInterval();
  };

  const handleNext = () => {
    next();
    resetInterval();
  };

  const handleDot = (i) => {
    goTo(i);
    resetInterval();
  };

  const t = testimonials[active];

  return (
    <section id="testimonials" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Heading */}
        <div ref={headingRef} className={styles.headingWrapper}>
          <h2 className={styles.heading}>WHAT OUR CLIENTS SAY</h2>
          <div className={styles.accentLine} />
        </div>

        {/* Carousel */}
        <div className={styles.carousel}>
          {/* Prev arrow */}
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Card */}
          <div ref={cardRef} className={styles.card}>
            <span className={styles.quoteDecor}>&ldquo;</span>
            <p className={styles.quoteText}>{t.quote}</p>
            <div className={styles.stars}>
              {Array.from({ length: t.stars }).map((_, i) => (
                <span key={i} className={styles.star}>
                  ★
                </span>
              ))}
            </div>
            <h4 className={styles.clientName}>{t.name}</h4>
            <span className={styles.projectType}>{t.project}</span>
          </div>

          {/* Next arrow */}
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => handleDot(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
