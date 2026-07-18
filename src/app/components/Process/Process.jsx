'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Process.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_STEPS = [
  {
    step: '01',
    phase: 'PREPARATION & TESTING',
    title: 'Site Survey & Caliche Soil Testing',
    duration: 'Day 1 Morning',
    desc: 'We inspect soil density and compaction. In West Texas, caliche and sandy soil require precise subgrade leveling and moisture conditioning before any formwork begins.',
    details: [
      'Subgrade compaction testing (95% Standard Proctor)',
      'Laser transit slope & elevation mapping',
      'Excavation of loose topsoil & debris'
    ],
    icon: '🏗️',
    img: '/images/before-commercial-subgrade.png'
  },
  {
    step: '02',
    phase: 'FORMWORK & GRADING',
    title: 'Precision Formwork & Laser Transit',
    duration: 'Day 1 Afternoon',
    desc: 'Steel & wooden forms are staked and locked using optical laser levels to ensure exact slope for water drainage away from your structure.',
    details: [
      'Optical laser transit leveling',
      'Double-staked steel form bracing',
      'Drainage pitch calculation (min 1/4" per foot)'
    ],
    icon: '📐',
    img: '/images/parking-lot-forming.png'
  },
  {
    step: '03',
    phase: 'REINFORCEMENT',
    title: 'Grade-60 Rebar Grid & Chairs',
    duration: 'Day 2 Morning',
    desc: 'We tie a heavy-duty #4 (1/2") or #5 Grade-60 rebar matrix spaced at 12" to 18" centers, elevated on rebar chairs so the steel sits exactly in the center of the pour.',
    details: [
      '#4 / #5 Grade-60 rebar grid',
      'Heavy-duty plastic chairs for center elevation',
      'Vapor barrier installation for indoor slabs'
    ],
    icon: '⚡',
    img: '/images/before-warehouse-rebar.png'
  },
  {
    step: '04',
    phase: 'BATCH & DISPATCH',
    title: 'Custom High-PSI Concrete Dispatch',
    duration: 'Day 2 Pouring',
    desc: 'We specify custom 4,000+ PSI mix designs with fiber mesh reinforcement and retarder additives to handle the West Texas summer heat during delivery.',
    details: [
      '4,000 - 5,000 PSI engineered mix',
      'Polypropylene synthetic fiber reinforcement',
      'Slump & temperature verification on site'
    ],
    icon: '🚛',
    img: '/images/industrial-concrete-pour.png'
  },
  {
    step: '05',
    phase: 'PLACEMENT & SCREEDING',
    title: 'Laser Screeding & Power Trowel',
    duration: 'Day 2 Finishing',
    desc: 'Using Somero laser screeds and ride-on power trowels, we consolidate the concrete and achieve glass-smooth or slip-resistant broom finishes.',
    details: [
      'Laser-guided vibratory screeding',
      'Multi-pass power trowel finishing',
      'Broom or polished finish option'
    ],
    icon: '✨',
    img: '/images/commercial-laser-screed.png'
  },
  {
    step: '06',
    phase: 'CURING & JOINTS',
    title: 'Hydration Sealing & Expansion Control Joints',
    duration: 'Day 3 & Beyond',
    desc: 'Early-entry saw cuts prevent random cracking while a deep-penetrating liquid curing compound locks in moisture for maximum 28-day compressive strength.',
    details: [
      'Precision diamond-blade sawed control joints',
      'Chemical membrane curing seal application',
      'Final inspection & clean site handover'
    ],
    icon: '🛡️',
    img: '/images/after-commercial-floor.png'
  }
];

const FAQS = [
  {
    q: 'How long before I can drive on my new concrete driveway?',
    a: 'We recommend waiting 24-48 hours for foot traffic, 7 days for passenger vehicles, and 28 days for heavy trucks or equipment.'
  },
  {
    q: 'Why is rebar placed on chairs instead of laid on the ground?',
    a: 'Rebar on the ground provides zero tensile strength. Raising rebar on chairs positions the steel in the middle third of the slab where it resists tension forces.'
  },
  {
    q: 'What PSI concrete do you use for commercial shop floors?',
    a: 'We pour 4,000 to 5,000 PSI concrete mixed with synthetic fiber mesh for high load capacity and abrasion resistance in heavy equipment shops.'
  },
  {
    q: 'How do you handle hot West Texas summer pours?',
    a: 'We use hydration-retarding admixtures, iced mix water, and early morning pour schedules to control setting times and eliminate cold joints.'
  }
];

export default function Process() {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const stepCardRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Hero Title Reveal
      gsap.fromTo(
        '.process-hero-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // 2. Timeline Progress Line Animation
      gsap.fromTo(
        progressBarRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );

      // 3. Staggered Step Cards Slide-in
      stepCardRefs.current.forEach((card, index) => {
        if (!card) return;
        const isEven = index % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isEven ? -60 : 60, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
              onEnter: () => setActiveStep(index),
            },
          }
        );
      });

      // 4. FAQ Reveal
      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq-section',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroBadge}>✦ PROVEN 6-STAGE PROTOCOL</div>
        <h1 className={`${styles.heroTitle} process-hero-title`}>
          THE <span className={styles.redText}>PERMIAN</span> POUR PROCESS
        </h1>
        <p className={styles.heroSubtitle}>
          From soil compaction to final diamond joint cutting — see how Alonso Cardenas and team guarantee long-lasting concrete across West Texas.
        </p>
      </section>

      {/* TIMELINE SECTION */}
      <section className={styles.timelineSection}>
        <div className={`${styles.timelineContainer} timeline-container`}>
          {/* Central Progress Bar Line */}
          <div className={styles.lineBg}>
            <div ref={progressBarRef} className={styles.lineFill} />
          </div>

          {PROCESS_STEPS.map((s, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={s.step}
                ref={(el) => (stepCardRefs.current[idx] = el)}
                className={`${styles.stepRow} ${isEven ? styles.rowLeft : styles.rowRight}`}
                onClick={() => setActiveStep(idx)}
              >
                {/* Step Node Circle */}
                <div className={`${styles.nodeCircle} ${activeStep === idx ? styles.activeNode : ''}`}>
                  <span>{s.step}</span>
                </div>

                {/* Step Content Card */}
                <div className={styles.stepCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.phaseTag}>{s.phase}</span>
                    <span className={styles.durationTag}>{s.duration}</span>
                  </div>

                  <h3 className={styles.stepTitle}>
                    {s.icon} {s.title}
                  </h3>
                  <p className={styles.stepDesc}>{s.desc}</p>

                  <div className={styles.imagePreview}>
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      className={styles.stepImg}
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>

                  <ul className={styles.detailsList}>
                    {s.details.map((d, i) => (
                      <li key={i} className={styles.detailItem}>
                        <span className={styles.checkIcon}>✓</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className={`${styles.faqSection} faq-section`}>
        <div className={styles.faqHeader}>
          <span className={styles.faqEyebrow}>GOT QUESTIONS?</span>
          <h2 className={styles.faqTitle}>FREQUENTLY ASKED QUESTIONS</h2>
        </div>

        <div className={styles.faqGrid}>
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className={`faq-item ${styles.faqCard} ${isOpen ? styles.faqOpen : ''}`}
                onClick={() => setOpenFaq(isOpen ? null : i)}
              >
                <div className={styles.faqQuestionRow}>
                  <h3 className={styles.faqQuestion}>{faq.q}</h3>
                  <span className={styles.faqToggleBtn}>{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && <p className={styles.faqAnswer}>{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <h2>Ready to Start Your Concrete Pour?</h2>
        <p>Get a direct, transparent quote from Alonso Cardenas for your residential or commercial project.</p>
        <Link href="/contact" className={styles.ctaBtn}>
          Request Your Free Estimate →
        </Link>
      </section>
    </div>
  );
}
