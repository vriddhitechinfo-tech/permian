'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: '01',
    timeframe: 'DAY 1',
    icon: '💬',
    title: '01 Discovery & Site Survey',
    desc: 'We start with a deep-dive site inspection to analyze your soil density, slope pitch, and structural load requirements before any work begins.',
    bullets: [
      '30-minute site consultation & assessment',
      'Caliche base soil test & laser transit level',
      'Fixed, transparent quote & clear roadmap'
    ],
    align: 'left'
  },
  {
    num: '02',
    timeframe: 'DAY 2',
    icon: '📐',
    title: '02 Subgrade Prep & Formwork',
    desc: 'Our crew excavates loose topsoil, compacts West Texas caliche base to 98% density, and sets heavy-duty steel forms with optical transit levels.',
    bullets: [
      '98% Standard Proctor caliche compaction',
      'Laser-guided form setting for water runoff',
      'Grade-60 steel rebar matrix tied on chairs'
    ],
    align: 'right'
  },
  {
    num: '03',
    timeframe: 'DAY 3',
    icon: '🏗️',
    title: '03 High-PSI Concrete Pour',
    desc: 'Custom 3,500 - 4,500+ PSI engineered concrete mix dispatched on schedule, laser-screeded flat, and power-troweled for ultimate density.',
    bullets: [
      '4,000+ PSI fiber-reinforced concrete dispatch',
      'Somero laser screed precision flattening',
      'Multi-pass power trowel or broom finish'
    ],
    align: 'left'
  },
  {
    num: '04',
    timeframe: 'DAY 4+',
    icon: '🚀',
    title: '04 Curing & Quality Sign-Off',
    desc: 'Liquid chemical hydration seal applied immediately to double curing strength, followed by early-entry diamond sawed control joints to prevent cracks.',
    bullets: [
      'Hydration membrane chemical seal spray',
      'Precision diamond-blade sawed control joints',
      'Final quality audit & workmanship warranty sign-off'
    ],
    align: 'right'
  }
];

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const ctaProgressRef = useRef(null);

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
        ).fromTo(num,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.4)' },
          0.1
        ).fromTo(node,
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
            A streamlined 4-step journey from concept to a live, high-performing concrete pour — typically within 3–5 days. Scroll to walk the timeline.
          </p>
        </div>

        {/* TIMELINE TREE */}
        <div className="process-timeline-tree" style={{ position: 'relative', minHeight: '800px' }}>
          
          {/* Central Vertical Timeline Line */}
          <div style={{ position: 'absolute', top: '40px', bottom: '100px', left: '50%', width: '2px', background: 'rgba(255,255,255,0.08)', transform: 'translateX(-50%)', zIndex: 1 }}>
            <div ref={lineRef} style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #E31937 0%, #ff4d6d 100%)', boxShadow: '0 0 12px #E31937' }} />
          </div>

          {/* STEP ROWS */}
          {STEPS.map((s, idx) => {
            const isLeft = s.align === 'left';

            return (
              <div
                key={s.num}
                className={`process-step-row ${isLeft ? 'step-row-left' : 'step-row-right'}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 1fr',
                  alignItems: 'center',
                  marginBottom: '90px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* LEFT COLUMN */}
                <div style={{ display: 'flex', justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
                  {isLeft ? (
                    <StepCard step={s} />
                  ) : (
                    <WatermarkNum num={s.num} align="right" />
                  )}
                </div>

                {/* CENTER TIMELINE NODE */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="process-step-node" style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#E31937', border: '3px solid #000000', zIndex: 5 }} />
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ display: 'flex', justifyContent: !isLeft ? 'flex-start' : 'flex-end' }}>
                  {!isLeft ? (
                    <StepCard step={s} />
                  ) : (
                    <WatermarkNum num={s.num} align="left" />
                  )}
                </div>
              </div>
            );
          })}

        </div>

        {/* BOTTOM LAUNCH READINESS CTA BANNER */}
        <div className="launch-readiness-card" style={{
          marginTop: '60px',
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

      {/* Header Row: Icon Badge & Timeframe Pill */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(227, 25, 55, 0.15)', border: '1px solid rgba(227, 25, 55, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
          {step.icon}
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px', textTransform: 'uppercase' }}>
          {step.timeframe}
        </span>
      </div>

      {/* Step Title */}
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', marginBottom: '12px' }}>
        <span style={{ color: '#E31937', marginRight: '8px' }}>{step.num}</span>
        {step.title.replace(/^\d+\s*/, '')}
      </h3>

      {/* Description */}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.96rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, marginBottom: '24px' }}>
        {step.desc}
      </p>

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
