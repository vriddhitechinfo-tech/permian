'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { value: 15,  suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 1,   suffix: 'M+', label: 'Sq. Ft. Poured' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

const TIMELINE_EVENTS = [
  {
    year: '2009',
    title: 'Founding of Permian Concrete',
    desc: 'Alonso Cardenas established Permian Concrete with a single mixer truck and a vision to supply top-tier residential concrete services to families in Midland and Odessa.',
  },
  {
    year: '2014',
    title: 'Expansion into Commercial Subdivisions',
    desc: 'With a growing team, we started pouring commercial sidewalks, curbs, and foundations for new shopping centers and residential housing subdivisions.',
  },
  {
    year: '2019',
    title: 'Industrial Slabs & Warehouse Specialization',
    desc: 'We invested in heavy-duty commercial equipment and laser screeds, enabling us to handle massive warehouse foundations and heavy industrial flooring loads.',
  },
  {
    year: '2024 & Beyond',
    title: 'Leading Contractor in West Texas',
    desc: 'Today, Permian Concrete is recognized as one of the most reliable concrete contractor services in the Permian Basin, built on quality materials and trusted handshakes.',
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const contentRef = useRef(null);
  const statsRef   = useRef(null);
  const timelineRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Image clip-path reveal ───────────────── */
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* ── Text stagger reveal ──────────────────── */
      const textEls = contentRef.current.children;
      gsap.fromTo(
        textEls,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* ── Stat cards fade-in ───────────────────── */
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* ── Number counter animations ────────────── */
      STATS.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'power1.out',
          snap: { val: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onUpdate() {
            el.textContent = `${obj.val}${stat.suffix}`;
          },
        });
      });

      /* ── Timeline items reveal ────────────────── */
      if (timelineRef.current) {
        const events = timelineRef.current.children;
        Array.from(events).forEach((ev) => {
          // ignore the vertical line divider
          if (ev.classList.contains(styles.timelineLine)) return;

          gsap.fromTo(
            ev,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ev,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {/* ── Split layout ──────────────────────── */}
        <div className={styles.split}>
          {/* Left — Image */}
          <div className={styles.imageWrap} ref={imageRef}>
            <Image
              src="/images/about-team.png"
              alt="Permian Concrete team on site"
              width={640}
              height={480}
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>

          {/* Right — Content */}
          <div className={styles.content} ref={contentRef}>
            <span className={styles.label}>ABOUT US</span>
            <h2 className={styles.heading}>
              Permian Basin&apos;s Trusted Concrete Experts
            </h2>
            <p className={styles.paragraph}>
              Led by Alonso Cardenas, Permian Concrete has been serving the
              Midland-Odessa area with top-quality concrete work. From
              residential driveways to massive commercial foundations, we bring
              decades of expertise, premium materials, and unwavering commitment
              to every project.
            </p>
            <p className={styles.paragraph}>
              Our team understands the unique challenges of building in West
              Texas — from the extreme heat to the demanding soil conditions. We
              deliver concrete solutions that stand the test of time.
            </p>
          </div>
        </div>

        {/* ── Stats row ─────────────────────────── */}
        <div className={styles.statsRow} ref={statsRef}>
          {STATS.map((stat, i) => (
            <div className={styles.statCard} key={stat.label}>
              <div
                className={styles.statNumber}
                ref={(el) => { numberRefs.current[i] = el; }}
              >
                0{stat.suffix}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── Vertical Timeline ─────────────────── */}
        <div className={styles.timelineSection}>
          <span className={styles.timelineLabel}>OUR HISTORY</span>
          <h3 className={styles.timelineTitle}>THE TIMELINE</h3>

          <div ref={timelineRef} className={styles.timelineTrack}>
            <div className={styles.timelineLine} aria-hidden="true" />

            {TIMELINE_EVENTS.map((event) => (
              <div key={event.year} className={styles.timelineEvent}>
                {/* Year marker pill/circle */}
                <div 
                  className={styles.yearMarker}
                  style={{
                    width: event.year.length > 4 ? 'auto' : '80px',
                    borderRadius: event.year.length > 4 ? '40px' : '50%',
                    padding: event.year.length > 4 ? '0 20px' : '0',
                  }}
                >
                  <span className={styles.yearText}>{event.year}</span>
                </div>

                <div className={styles.timelineBody}>
                  <h4 className={styles.eventTitle}>{event.title}</h4>
                  <p className={styles.eventDesc}>{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
