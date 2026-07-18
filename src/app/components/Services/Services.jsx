'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const servicesData = [
  {
    title: 'RESIDENTIAL',
    image: '/images/residential-driveway.png',
    imageAlt: 'Residential concrete driveway project by Permian Concrete',
    description:
      'Your home deserves a foundation built to last. From smooth, durable driveways to inviting patios, we bring craftsmanship and precision to every residential project across the Permian Basin.',
    items: ['Driveways', 'Sidewalks', 'Foundations', 'Patios'],
  },
  {
    title: 'COMMERCIAL & INDUSTRIAL',
    image: '/images/commercial-warehouse.png',
    imageAlt: 'Commercial warehouse concrete flooring by Permian Concrete',
    description:
      'We understand the demands of commercial and industrial construction. Our team delivers high-strength concrete solutions engineered for heavy loads, high traffic, and long-term performance.',
    items: [
      'Warehouse Floors',
      'Commercial Foundations',
      'Industrial Slabs',
      'Parking Structures',
    ],
  },
];

const HEADING_TEXT = 'OUR SERVICES';

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Scroll-scrub heading reveal (word by word) ---
      const words = headingRef.current.querySelectorAll(`.${styles.word}`);
      gsap.fromTo(
        words,
        { opacity: 0.2, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // --- Subheading reveal ---
      gsap.fromTo(
        subheadingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subheadingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // --- Cards slide in from left / right ---
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const fromX = i === 0 ? -100 : 100;

        gsap.fromTo(
          card,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientX - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="services" ref={sectionRef} className={styles.services}>
      {/* Texture overlay */}
      <div className={styles.textureOverlay} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section header */}
        <div className={styles.header}>
          <h2 ref={headingRef} className={styles.heading}>
            <span className={styles.headingText}>
              {HEADING_TEXT.split(' ').map((word, i) => (
                <span key={i} className={styles.word}>
                  {word}{' '}
                </span>
              ))}
            </span>
            <span className={styles.accentLine} />
          </h2>
          <p ref={subheadingRef} className={styles.subheading}>
            From residential driveways to industrial warehouses, we deliver
            excellence in every pour.
          </p>
        </div>

        {/* Cards grid */}
        <div className={styles.grid}>
          {servicesData.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className={styles.card}
              onMouseMove={handleMouseMove}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.cardImage}
                />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                <ul className={styles.serviceList}>
                  {service.items.map((item) => (
                    <li key={item} className={styles.serviceItem}>
                      <span className={styles.bullet} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
