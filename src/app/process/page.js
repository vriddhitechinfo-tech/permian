'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FAQ from '../components/FAQ/FAQ.jsx';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── SVG Icons ── */
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M21.97 18.33c.06.64-.32 1.28-.87 1.62-1.07.68-2.3 1.05-3.6 1.05C8.27 21 3 15.73 3 6.5c0-1.3.37-2.53 1.05-3.6.34-.55.98-.93 1.62-.87l2.5.22c.56.05.97.47 1.02 1.03l.5 4.5c.05.47-.16.93-.55 1.18L7.4 10.3C8.6 12.9 11.1 15.4 13.7 16.6l1.44-1.74c.25-.39.71-.6 1.18-.55l4.5.5c.56.05.98.46 1.03 1.02l.12 1.5z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconClipboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <rect x="5" y="3" width="14" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 3v2a1 1 0 001 1h4a1 1 0 001-1V3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12h6M9 16h4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconDroplets = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M12 2C12 2 5 9.5 5 14a7 7 0 0014 0C19 9.5 12 2 12 2z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 14c0 2.21 1.79 4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M12 2L4 6v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V6l-8-4z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.8" width="48" height="48">
    <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 5.5h6c0-2-1-4-3.5-5.5z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2C7.5 2.5 3.5 6.5 3 11c0 0 4 0 6 2s2 6 2 6c4.5-.5 8.5-4.5 9-9 0 0-1-5-8-8z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 15l3-3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="14.5" cy="9.5" r="1.5" fill="#fbbf24"/>
  </svg>
);

const STEPS = [
  {
    icon: <IconPhone />,
    week: 'WEEK 0',
    num: '01',
    title: 'Discovery Call',
    desc: 'We start with a free on-site visit to understand your project, soil conditions, and goals. No pressure — just clarity.',
    bullets: ['Free on-site assessment', 'Project scope & fixed quote', 'Clear timeline agreement'],
  },
  {
    icon: <IconClipboard />,
    week: 'WEEK 1',
    num: '02',
    title: 'Design & Preparation',
    desc: 'Our crew handles all site prep — grading, forming, rebar placement, and base compaction — before a single drop is poured.',
    bullets: ['Excavation & grading', 'Form setting & rebar layout', 'Subgrade compaction'],
  },
  {
    icon: <IconDroplets />,
    week: 'WEEK 2',
    num: '03',
    title: 'The Pour',
    desc: 'We pour premium-grade concrete, screeding and finishing to your specified texture and grade. Precision from truck to slab.',
    bullets: ['Premium concrete delivery', 'Expert screeding & finishing', 'Textured or smooth surface'],
  },
  {
    icon: <IconShield />,
    week: 'WEEK 2-3',
    num: '04',
    title: 'Curing & Handoff',
    desc: 'Proper curing is applied and we walk through the finished project with you before handoff. Your warranty starts here.',
    bullets: ['Curing compound applied', '7-day & 28-day strength verification', 'Workmanship warranty provided'],
  },
];

export default function ProcessPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in hero elements
      gsap.fromTo('.process-hero-anim',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );

      // Animate vertical timeline progress line
      gsap.fromTo('.timeline-progress',
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 35%',
            end: 'bottom 65%',
            scrub: true
          }
        }
      );

      // Animate alternating steps rows
      gsap.utils.toArray('.timeline-row').forEach((row) => {
        const card = row.querySelector('.timeline-card');
        const number = row.querySelector('.timeline-hollow-number');
        const node = row.querySelector('.timeline-node-circle');
        const isLeft = row.querySelector('.timeline-col-left').contains(card);

        // Slide card in
        gsap.fromTo(card,
          { x: isLeft ? -45 : 45, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
              once: true
            }
          }
        );

        // Move giant step numbers in
        gsap.fromTo(number,
          { x: isLeft ? 35 : -35, opacity: 0 },
          {
            x: 0,
            opacity: 0.55,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
              once: true
            }
          }
        );

        // Active state trigger for color fills
        ScrollTrigger.create({
          trigger: row,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => {
            row.classList.add('active-step');
            if (node) gsap.to(node, { background: '#E31937', borderColor: '#E31937', scale: 1.25, duration: 0.25 });
          },
          onLeaveBack: () => {
            row.classList.remove('active-step');
            if (node) gsap.to(node, { background: '#000000', borderColor: 'rgba(255,255,255,0.2)', scale: 1.0, duration: 0.25 });
          }
        });
      });

      // Animate Launch Readiness progress line on scroll (linked scrub)
      gsap.fromTo('.launch-progress-fill',
        { width: '0%' },
        {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.launch-readiness-box',
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: true
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .process-container { min-height: 100vh; background: #000000; padding: 140px 24px 80px; position: relative; overflow: hidden; }
        .process-hero-box { text-align: center; max-width: 800px; margin: 0 auto 90px; }
        .process-eyebrow { display: inline-flex; align-items: center; gap: 8px; border: 1px solid #E31937; border-radius: 999px; padding: 6px 18px; color: #E31937; font-family: var(--font-heading); font-size: 12.5px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; box-shadow: 0 0 10px rgba(227, 25, 55, 0.2); }
        .process-title { font-family: var(--font-heading); font-size: clamp(2.5rem, 5vw, 4.2rem); font-weight: 900; text-transform: uppercase; line-height: 1.1; margin-bottom: 24px; color: #ffffff; }
        .process-title .red { color: #E31937; text-shadow: 0 0 20px rgba(227, 25, 55, 0.45); }
        .process-subtitle { font-family: var(--font-body); font-size: 16px; color: rgba(255, 255, 255, 0.55); line-height: 1.7; max-width: 600px; margin: 0 auto; }

        /* Timeline structure */
        .timeline-container { position: relative; max-width: 1200px; margin: 0 auto 100px; padding: 40px 0; }
        .timeline-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: rgba(255, 255, 255, 0.06); transform: translateX(-50%); }
        .timeline-progress { position: absolute; left: 50%; top: 0; width: 2px; background: #E31937; transform: translateX(-50%); transform-origin: top; height: 0%; box-shadow: 0 0 12px #E31937; }
        
        .timeline-row { display: grid; grid-template-columns: 1fr 120px 1fr; margin-bottom: 120px; position: relative; align-items: center; }
        .timeline-row:last-child { margin-bottom: 40px; }
        
        .timeline-col-left { display: flex; justify-content: flex-end; padding-right: 20px; }
        .timeline-col-center { display: flex; justify-content: center; align-items: center; position: relative; height: 100%; }
        .timeline-col-right { display: flex; justify-content: flex-start; padding-left: 20px; }

        .timeline-node-circle { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.2); background: #000000; z-index: 5; box-shadow: 0 0 0 4px #000000; transition: box-shadow 0.3s, background 0.3s, border-color 0.3s; }
        
        /* Step Card */
        .timeline-card { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 24px; padding: 40px; width: 100%; max-width: 480px; transition: border-color 0.3s, box-shadow 0.3s; position: relative; overflow: hidden; }
        .timeline-card-top-accent { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #E31937, transparent); opacity: 0.9; box-shadow: 0 2px 10px rgba(227, 25, 55, 0.4); }
        .timeline-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
        .timeline-card-icon-wrapper { width: 44px; height: 44px; border-radius: 12px; background: rgba(227, 25, 55, 0.08); border: 1px solid rgba(227, 25, 55, 0.2); display: flex; align-items: center; justify-content: center; color: #E31937; box-shadow: 0 0 10px rgba(227, 25, 55, 0.1); }
        .timeline-card-week { font-family: monospace; font-size: 12.5px; color: #E31937; font-weight: 700; letter-spacing: 1px; }
        
        .timeline-card-step-num { font-family: var(--font-heading); font-size: 12.5px; font-weight: 900; color: #E31937; letter-spacing: 2px; text-transform: uppercase; display: block; margin-bottom: 8px; }
        .timeline-card-title { font-family: var(--font-heading); font-size: 22px; font-weight: 900; color: #ffffff; text-transform: uppercase; margin: 0 0 16px; }
        .timeline-card-desc { font-family: var(--font-body); font-size: 15.5px; color: rgba(255, 255, 255, 0.5); line-height: 1.6; margin: 0 0 24px; }
        
        .timeline-card-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 20px; }
        .timeline-card-list-item { display: flex; align-items: center; gap: 10px; font-family: var(--font-body); font-size: 14.5px; color: rgba(255, 255, 255, 0.7); }
        .timeline-card-list-dot { width: 5px; height: 5px; border-radius: 50%; background: #E31937; }

        /* Hollow Numbers (Opacity increased for high visibility) */
        .timeline-hollow-number { font-family: var(--font-heading); font-size: clamp(8rem, 16vw, 20rem); font-weight: 900; line-height: 1; -webkit-text-stroke: 2px rgba(255, 255, 255, 0.22); -webkit-text-fill-color: transparent; text-shadow: 0 0 40px rgba(227, 25, 55, 0.02); user-select: none; pointer-events: none; transition: -webkit-text-stroke 0.3s, text-shadow 0.3s; opacity: 0.65; }
        
        /* Active State glows */
        .timeline-row.active-step .timeline-card { border-color: rgba(227, 25, 55, 0.5); box-shadow: 0 10px 45px rgba(227, 25, 55, 0.12); }
        .timeline-row.active-step .timeline-node-circle { border-color: #E31937; background: #E31937; box-shadow: 0 0 20px #E31937, 0 0 0 4px #000000; }
        .timeline-row.active-step .timeline-hollow-number { -webkit-text-stroke: 2.2px rgba(227, 25, 55, 0.95); text-shadow: 0 0 50px rgba(227, 25, 55, 0.55); opacity: 1; }

        /* Launch Readiness Section Box */
        .launch-readiness-box { max-width: 1100px; margin: 0 auto 100px; background: rgba(12, 12, 12, 0.95); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 28px; padding: 64px 48px; position: relative; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.6); }
        .launch-readiness-glow-bg { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at 80% 25%, rgba(227,25,55,0.14) 0%, transparent 60%); }
        .launch-eyebrow { font-family: var(--font-heading); font-size: 12.5px; font-weight: 700; color: rgba(255,255,255,0.4); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; display: block; text-align: center; }
        
        .launch-progress-track { width: 280px; height: 3px; background: rgba(255,255,255,0.08); margin: 0 auto 36px; border-radius: 2px; overflow: hidden; position: relative; }
        .launch-progress-fill { height: 100%; width: 0%; background: linear-gradient(90deg, #E31937, #f97316); border-radius: 2px; box-shadow: 0 0 10px rgba(227, 25, 55, 0.6); }

        .launch-title { font-family: var(--font-heading); font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 900; color: #ffffff; text-align: center; text-transform: uppercase; line-height: 1.1; margin: 0 0 12px; }
        .launch-subtitle { font-family: var(--font-body); font-size: 16px; color: rgba(255,255,255,0.5); text-align: center; margin: 0 0 36px; }
        
        .launch-bullets { display: flex; justify-content: center; flex-wrap: wrap; gap: 32px; list-style: none; padding: 0; margin: 0 0 48px; }
        .launch-bullet-item { display: flex; align-items: center; gap: 10px; font-family: var(--font-body); font-size: 15.5px; color: rgba(255,255,255,0.85); }
        .launch-bullet-check { width: 18px; height: 18px; border-radius: 50%; background: rgba(227,25,55,0.12); border: 1px solid rgba(227,25,55,0.35); display: flex; align-items: center; justify-content: center; color: #E31937; font-size: 11px; font-weight: 900; }
        
        .launch-btn-wrapper { display: flex; justify-content: center; }
        .launch-cta-btn { display: inline-flex; align-items: center; gap: 10px; padding: 18px 48px; border-radius: 40px; background: linear-gradient(135deg, #E31937 0%, #a80f24 100%); color: #ffffff; fontFamily: var(--font-body); fontSize: 16px; fontWeight: 700; textTransform: uppercase; letterSpacing: 1px; textDecoration: none; boxShadow: 0 8px 32px rgba(227, 25, 55, 0.45); transition: transform 0.25s, box-shadow 0.25s; }
        .launch-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(227, 25, 55, 0.65); }
        .launch-cta-btn:active { transform: translateY(0); }

        .rocket-icon-container { position: absolute; top: 32px; right: 40px; opacity: 0.85; }

        @media(max-width: 850px) {
          .timeline-line, .timeline-progress { left: 24px; transform: none; }
          .timeline-row { grid-template-columns: 1fr; gap: 0; margin-bottom: 60px; }
          .timeline-col-left, .timeline-col-right { display: block; padding-left: 56px; padding-right: 0; justify-content: flex-start; }
          .timeline-col-center { position: absolute; left: 16px; top: 32px; width: auto; height: auto; }
          .timeline-hollow-number { display: none; }
          .timeline-card { max-width: 100%; }
          .launch-readiness-box { padding: 48px 24px; }
          .rocket-icon-container { display: none; }
          .launch-bullets { flex-direction: column; align-items: flex-start; gap: 16px; max-width: 260px; margin: 0 auto 36px; }
        }
      `}</style>

      <div ref={containerRef} className="process-container">
        {/* HERO */}
        <div className="process-hero-box">
          <div className="process-eyebrow process-hero-anim">Our Workflow</div>
          <h1 className="process-title process-hero-anim">Our Concrete <span className="red">Process</span></h1>
          <p className="process-subtitle process-hero-anim">
            A streamlined 4-step journey from concept to final compaction — typically completed within 1–3 weeks. Scroll to walk the timeline.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="timeline-container">
          <div className="timeline-line" />
          <div className="timeline-progress" />

          {STEPS.map((step, idx) => {
            const isLeftCard = idx % 2 === 0;

            return (
              <div key={idx} className="timeline-row">
                {/* Left Side */}
                <div className="timeline-col-left">
                  {isLeftCard ? (
                    <div className="timeline-card">
                      <div className="timeline-card-top-accent" />
                      <div className="timeline-card-header">
                        <div className="timeline-card-icon-wrapper">
                          {step.icon}
                        </div>
                        <span className="timeline-card-week">{step.week}</span>
                      </div>
                      <span className="timeline-card-step-num">Step {step.num}</span>
                      <h3 className="timeline-card-title">{step.title}</h3>
                      <p className="timeline-card-desc">{step.desc}</p>
                      <ul className="timeline-card-list">
                        {step.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="timeline-card-list-item">
                            <span className="timeline-card-list-dot" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="timeline-hollow-number">{step.num}</div>
                  )}
                </div>

                {/* Center Node */}
                <div className="timeline-col-center">
                  <div className="timeline-node-circle" />
                </div>

                {/* Right Side */}
                <div className="timeline-col-right">
                  {!isLeftCard ? (
                    <div className="timeline-card">
                      <div className="timeline-card-top-accent" />
                      <div className="timeline-card-header">
                        <div className="timeline-card-icon-wrapper">
                          {step.icon}
                        </div>
                        <span className="timeline-card-week">{step.week}</span>
                      </div>
                      <span className="timeline-card-step-num">Step {step.num}</span>
                      <h3 className="timeline-card-title">{step.title}</h3>
                      <p className="timeline-card-desc">{step.desc}</p>
                      <ul className="timeline-card-list">
                        {step.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="timeline-card-list-item">
                            <span className="timeline-card-list-dot" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="timeline-hollow-number">{step.num}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* NEW SECTION: LAUNCH READINESS BOX */}
        <div className="launch-readiness-box">
          <div className="launch-readiness-glow-bg" />
          <div className="rocket-icon-container">
            <RocketIcon />
          </div>

          <span className="launch-eyebrow">Launch Readiness</span>
          <div className="launch-progress-track">
            <div className="launch-progress-fill" />
          </div>

          <h2 className="launch-title">Ready to Start Your Project?</h2>
          <p className="launch-subtitle">Let's build something incredible together.</p>

          <ul className="launch-bullets">
            <li className="launch-bullet-item">
              <span className="launch-bullet-check">✓</span>
              Free consultation
            </li>
            <li className="launch-bullet-item">
              <span className="launch-bullet-check">✓</span>
              Fast delivery
            </li>
            <li className="launch-bullet-item">
              <span className="launch-bullet-check">✓</span>
              Satisfaction guaranteed
            </li>
          </ul>

          <div className="launch-btn-wrapper">
            <Link href="/contact" className="launch-cta-btn">
              Let's Talk →
            </Link>
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <FAQ />
      </div>
    </>
  );
}