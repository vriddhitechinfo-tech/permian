'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Project data ───────────────────────────────── */
const PROJECTS = [
  { title: 'Custom Driveway',      category: 'Residential', src: '/images/residential-driveway.png' },
  { title: 'Backyard Patio',       category: 'Residential', src: '/images/project-patio.png' },
  { title: 'Warehouse Foundation', category: 'Commercial',  src: '/images/project-foundation.png' },
  { title: 'Concrete Sidewalk',    category: 'Residential', src: '/images/project-sidewalk.png' },
  { title: 'Commercial Flooring',  category: 'Commercial',  src: '/images/project-commercial-floor.png' },
  { title: 'Industrial Warehouse', category: 'Commercial',  src: '/images/commercial-warehouse.png' },
];

const FILTERS = ['All', 'Residential', 'Commercial'];

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const gridRef    = useRef(null);
  const cardRefs   = useRef([]);

  const [activeFilter, setActiveFilter] = useState('All');

  /* ── Filter handler ───────────────────────────── */
  const handleFilter = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  /* ── Scroll-triggered entrance animations ─────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header reveal */
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* Card staggered clip-path reveal */
      const visibleCards = cardRefs.current.filter(Boolean);
      gsap.fromTo(
        visibleCards,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Determine which cards to show ────────────── */
  const filtered = PROJECTS.map((project) => ({
    ...project,
    visible: activeFilter === 'All' || project.category === activeFilter,
  }));

  return (
    <section id="projects" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {/* ── Header ────────────────────────────── */}
        <div className={styles.header} ref={headerRef}>
          <h2 className={styles.heading}>OUR PROJECTS</h2>
          <span className={styles.accentLine} />
          <p className={styles.subheading}>
            A showcase of our finest work across the Permian Basin
          </p>
        </div>

        {/* ── Filter tabs ───────────────────────── */}
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={
                activeFilter === f ? styles.filterBtnActive : styles.filterBtn
              }
              onClick={() => handleFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Grid ──────────────────────────────── */}
        <div className={styles.grid} ref={gridRef}>
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className={`${styles.card} ${!project.visible ? styles.cardHidden : ''}`}
              ref={(el) => { cardRefs.current[i] = el; }}
            >
              <Image
                src={project.src}
                alt={project.title}
                width={640}
                height={480}
                className={styles.cardImage}
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Hover overlay — slides up */}
              <div className={styles.overlay}>
                <span className={styles.overlayTitle}>{project.title}</span>
                <span className={styles.overlayCategory}>
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
