'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: '01',
    phase: 'PREPARATION & TESTING',
    timeframe: 'Day 1 Morning',
    icon: '🏗️',
    title: 'Site Survey & Caliche Soil Testing',
    desc: 'We inspect soil density and compaction. In West Texas, caliche and sandy soil require precise subgrade leveling and moisture conditioning before any formwork begins.',
    bullets: [
      'Subgrade compaction testing (95% Standard Proctor)',
      'Laser transit slope & elevation mapping',
      'Excavation of loose topsoil & debris'
    ],
    img: '/images/before-commercial-subgrade.png',
    align: 'left'
  },
  {
    num: '02',
    phase: 'FORMWORK & GRADING',
    timeframe: 'Day 1 Afternoon',
    icon: '📐',
    title: 'Precision Formwork & Laser Transit',
    desc: 'Steel & wooden forms are staked and locked using optical laser levels to ensure exact slope for water drainage away from your structure.',
    bullets: [
      'Optical laser transit leveling',
      'Double-staked steel form bracing',
      'Drainage pitch calculation (min 1/4" per foot)'
    ],
    img: '/images/parking-lot-forming.png',
    align: 'right'
  },
  {
    num: '03',
    phase: 'REINFORCEMENT',
    timeframe: 'Day 2 Morning',
    icon: '⚡',
    title: 'Grade-60 Rebar Grid & Chairs',
    desc: 'We tie a heavy-duty #4 (1/2") or #5 Grade-60 rebar matrix spaced at 12" to 18" centers, elevated on rebar chairs so the steel sits exactly in the center of the pour.',
    bullets: [
      '#4 / #5 Grade-60 rebar grid',
      'Heavy-duty plastic chairs for center elevation',
      'Vapor barrier installation for indoor slabs'
    ],
    img: '/images/before-warehouse-rebar.png',
    align: 'left'
  },
  {
    num: '04',
    phase: 'BATCH & DISPATCH',
    timeframe: 'Day 2 Pouring',
    icon: '🚛',
    title: 'Custom High-PSI Concrete Dispatch',
    desc: 'We specify custom 4,000+ PSI mix designs with fiber mesh reinforcement and retarder additives to handle the West Texas summer heat during delivery.',
    bullets: [
      '4,000 - 5,000 PSI engineered mix',
      'Polypropylene synthetic fiber reinforcement',
      'Slump & temperature verification on site'
    ],
    img: '/images/industrial-concrete-pour.png',
    align: 'right'
  },
  {
    num: '05',
    phase: 'PLACEMENT & SCREEDING',
    timeframe: 'Day 2 Finishing',
    icon: '✨',
    title: 'Laser Screeding & Power Trowel',
    desc: 'Using Somero laser screeds and ride-on power trowels, we consolidate the concrete and achieve glass-smooth or slip-resistant broom finishes.',
    bullets: [
      'Laser-guided vibratory screeding',
      'Multi-pass power trowel finishing',
      'Broom or polished finish option'
    ],
    img: '/images/commercial-laser-screed.png',
    align: 'left'
  },
  {
    num: '06',
    phase: 'CURING & JOINTS',
    timeframe: 'Day 3 & Beyond',
    icon: '🛡️',
    title: 'Hydration Sealing & Expansion Control Joints',
    desc: 'Early-entry saw cuts prevent random cracking while a deep-penetrating liquid curing compound locks in moisture for maximum 28-day compressive strength.',
    bullets: [
      'Precision diamond-blade sawed control joints',
      'Chemical membrane curing seal application',
      'Final inspection & clean site handover'
    ],
    img: '/images/after-commercial-floor.png',
    align: 'right'
  }
];

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const ctaProgressRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 800);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Line Progress Animation
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, ease: 'none',
          scrollTrigger: {
            trigger: '.process-timeline-tree',
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 1
          }
        }
      );

      // 2. CTA Progress Bar Fill on Scroll into view
      if (ctaProgressRef.current) {
        gsap.fromTo(ctaProgressRef.current,
          { width: '0%' },
          {
            width: '100%', ease: 'none',
            scrollTrigger: {
              trigger: '.launch-readiness-card',
              start: 'top 90%',
              end: 'top 40%',
              scrub: true
            }
          }
        );
      }

      // 3. Timeline Step Card Reveals
      gsap.utils.toArray('.process-step-row').forEach((row) => {
        const card = row.querySelector('.process-step-card');
        const num = row.querySelector('.process-step-num');
        const node = row.querySelector('.process-step-node');
        const isLeft = row.classList.contains('step-row-left');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            once: true
          }
        });

        tl.fromTo(card,
          { opacity: 0, x: isLeft ? -60 : 60 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
          0
        );

        if (num) {
          tl.fromTo(num,
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.4)' },
            0.1
          );
        }

        tl.fromTo(node,
          { scale: 0, boxShadow: '0 0 0px #E31937' },
          { scale: 1, boxShadow: '0 0 25px #E31937', duration: 0.5, ease: 'back.out(2)' },
          0.2
        );
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: '120px 0', background: '#000000', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
        
        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '13px', letterSpacing: '2px', color: '#E31937', textTransform: 'lowercase', display: 'block', marginBottom: '12px' }}>
            // permian.build.sequence — from consultation to pour
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', marginBottom: '16px' }}>
            Our <span style={{ color: '#E31937' }}>Process</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7 }}>
            A streamlined 6-step journey from concept to a live, high-performing concrete pour — typically within 3–5 days. Scroll to walk the timeline.
          </p>
        </div>

        {/* TIMELINE TREE */}
        <div className="process-timeline-tree" style={{ position: 'relative', minHeight: '800px' }}>
          
          {/* Central Vertical Timeline Line */}
          <div style={{
            position: 'absolute',
            top: '40px',
            bottom: '100px',
            left: isMobile ? '24px' : '50%',
            width: '2px',
            background: 'rgba(255,255,255,0.08)',
            transform: isMobile ? 'none' : 'translateX(-50%)',
            zIndex: 1
          }}>
            <div ref={lineRef} style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #E31937 0%, #ff4d6d 100%)', boxShadow: '0 0 12px #E31937' }} />
          </div>

          {/* STEP ROWS */}
          {STEPS.map((s, idx) => {
            const isLeft = s.align === 'left';

            return (
              <div
                key={s.num}
                className={`process-step-row ${isLeft ? 'step-row-left' : 'step-row-right'}`}
                style={isMobile ? {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  paddingLeft: '56px',
                  marginBottom: '60px',
                  position: 'relative',
                  zIndex: 2,
                  width: '100%'
                } : {
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 1fr',
                  alignItems: 'center',
                  marginBottom: '90px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* LEFT COLUMN */}
                {!isMobile && (
                  <div style={{ display: 'flex', justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
                    {isLeft ? (
                      <StepCard step={s} />
                    ) : (
                      <WatermarkNum num={s.num} align="right" />
                    )}
                  </div>
                )}

                {/* CENTER TIMELINE NODE */}
                <div style={isMobile ? {
                  position: 'absolute',
                  left: '24px',
                  top: '36px',
                  transform: 'translateX(-50%)',
                  zIndex: 5
                } : {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <div className="process-step-node" style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#E31937', border: '3px solid #000000', zIndex: 5 }} />
                </div>

                {/* RIGHT COLUMN */}
                <div style={isMobile ? {
                  width: '100%'
                } : {
                  display: 'flex',
                  justifyContent: !isLeft ? 'flex-start' : 'flex-end'
                }}>
                  {isMobile ? (
                    <StepCard step={s} />
                  ) : !isLeft ? (
                    <StepCard step={s} />
                  ) : (
                    <WatermarkNum num={s.num} align="left" />
                  )}
                </div>
              </div>
            );
          })}

        </div>

        {/* PROCESS FAQS */}
        <ProcessFaqSection />

        {/* BOTTOM LAUNCH READINESS CTA BANNER */}
        <div className="launch-readiness-card" style={{
          marginTop: '100px',
          background: 'rgba(10, 10, 10, 0.95)',
          border: '1px solid rgba(227, 25, 55, 0.35)',
          borderRadius: '28px',
          padding: '56px 40px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(227,25,55,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Progress Indicator Bar at Top */}
          <div style={{ width: '280px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '20px', overflow: 'hidden', position: 'relative' }}>
            <div ref={ctaProgressRef} style={{ width: '0%', height: '100%', background: 'linear-gradient(90deg, #E31937, #ff4d6d)', borderRadius: '2px', boxShadow: '0 0 12px #E31937' }} />
          </div>

          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', letterSpacing: '3px', color: '#E31937', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 800 }}>
            LAUNCH READINESS
          </span>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', margin: '0 0 12px' }}>
            Ready to Start Your Project?
          </h3>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '520px', margin: '0 0 32px', lineHeight: 1.6 }}>
            Let's build something incredible together. Get a direct, transparent quote from Alonso Cardenas today.
          </p>

          {/* Checklist Bullets */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '36px' }}>
            {['Free consultation', 'Fast turnaround', 'Satisfaction guaranteed'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>✓</span>
                {item}
              </div>
            ))}
          </div>

          {/* Action CTA Button */}
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              borderRadius: '40px',
              background: 'linear-gradient(135deg, #E31937, #c5122b)',
              color: '#ffffff',
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 900,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 10px 30px rgba(227, 25, 55, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            Get A Free Quote →
          </Link>
        </div>

      </div>
    </section>
  );
}

// ── Helper Component: Step Card ─────────────────────────────────────
function StepCard({ step }) {
  return (
    <div
      className="process-step-card"
      style={{
        width: '100%',
        maxWidth: '460px',
        background: 'rgba(12, 12, 12, 0.95)',
        border: '1px solid rgba(227, 25, 55, 0.25)',
        borderRadius: '24px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Top Red Glow Accent Bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #E31937, rgba(227,25,55,0.2))' }} />

      {/* Header Row: Phase Tag & Timeframe Pill */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '12px' }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 900, letterSpacing: '1.5px', color: '#E31937', textTransform: 'uppercase' }}>
          {step.phase}
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 900, letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          {step.timeframe}
        </span>
      </div>

      {/* Step Title */}
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>{step.icon}</span>
        <span>{step.title}</span>
      </h3>

      {/* Description */}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.96rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, marginBottom: '20px' }}>
        {step.desc}
      </p>

      {/* Image Preview */}
      {step.img && (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '180px',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '20px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <Image
            src={step.img}
            alt={step.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      )}

      {/* Bullet Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {step.bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900, flexShrink: 0, marginTop: '2px' }}>✓</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.4 }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Helper Component: Giant Watermark Number ────────────────────────
function WatermarkNum({ num, align }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="process-step-num"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(6rem, 12vw, 11rem)',
        fontWeight: 900,
        lineHeight: 1,
        color: isHovered ? 'rgba(227, 25, 55, 0.22)' : 'rgba(227, 25, 55, 0.10)',
        WebkitTextStroke: isHovered ? '1.5px rgba(227, 25, 55, 0.8)' : '1.5px rgba(227, 25, 55, 0.45)',
        textShadow: isHovered
          ? '0 0 25px rgba(227, 25, 55, 0.5), 0 0 45px rgba(227, 25, 55, 0.3)'
          : '0 0 12px rgba(227, 25, 55, 0.2)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        userSelect: 'none',
        pointerEvents: 'auto',
        padding: '0 20px',
        textAlign: align === 'left' ? 'left' : 'right'
      }}
    >
      {num}
    </div>
  );
}

// ── Helper Component: Process Specific FAQs ──────────────────────────
function ProcessFaqSection() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
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

  return (
    <div className="faq-section" style={{ maxWidth: '800px', margin: '120px auto 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 800, color: '#E31937', letterSpacing: '2px' }}>
          GOT QUESTIONS?
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', marginTop: '8px', textTransform: 'uppercase' }}>
          Frequently Asked Questions
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <div
              key={i}
              className="faq-item"
              onClick={() => setOpenFaq(isOpen ? null : i)}
              style={{
                background: isOpen ? 'rgba(227, 25, 55, 0.05)' : 'rgba(12, 12, 12, 0.6)',
                border: isOpen ? '1px solid #E31937' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '20px 24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: 0, textTransform: 'uppercase' }}>
                  {faq.q}
                </h3>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#E31937' }}>
                  {isOpen ? '−' : '+'}
                </span>
              </div>
              {isOpen && (
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  lineHeight: 1.6,
                  marginTop: '14px',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
