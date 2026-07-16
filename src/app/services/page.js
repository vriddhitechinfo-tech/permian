'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IconHouse = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBuilding = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <rect x="3" y="3" width="18" height="18" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 8h2m0 4H7m4-4h2m0 4h-2m4-4h2m0 4h-2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18h18" strokeLinecap="round"/>
  </svg>
);

const IconWarehouse = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M2 7L12 3l10 4v14H2V7z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 21V12h8v9" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 7h20" strokeLinecap="round"/>
  </svg>
);

const IconGrid = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const SECTIONS = [
  {
    group: 'PREPARATION & SITEWORK',
    desc: 'Subgrade and base preparation that ensures long-term slab stabilization.',
    items: [
      {
        icon: <IconGrid />,
        title: 'Sidewalks & Curbs',
        desc: 'ADA-compliant concrete curbs, pathways, gutter flowlines, and dumpster pads.',
        bullets: ['Transit-level grading verification', 'ADA ramp configurations', 'Clean control joint planning'],
        img: '/images/project-sidewalk.png'
      },
      {
        icon: <IconWarehouse />,
        title: 'Excavation & Base Grading',
        desc: 'Compaction of caliche and sand base structures to prevent structural settling and cracking.',
        bullets: ['Caliche layout compaction to 98%', 'Grade elevation checks', 'Forms set with structural steel pins'],
        img: '/images/commercial-warehouse.png'
      }
    ]
  },
  {
    group: 'STRUCTURAL POURS',
    desc: 'High-strength load bearing slabs engineered for heavy-duty storage and equipment.',
    items: [
      {
        icon: <IconBuilding />,
        title: 'Commercial Slabs',
        desc: 'Laser-screed warehouse floors, shop foundations, and retail flat floors.',
        bullets: ['Mix designs up to 4500 PSI', 'Fiber mesh & structural rebar chairs', 'Precision laser screed levelness'],
        img: '/images/project-foundation.png'
      },
      {
        icon: <IconBuilding />,
        title: 'Metal Building Slabs',
        desc: 'Heavy industrial shop pads with deep structural grade beams and anchor bolt placement.',
        bullets: ['Anchor bolt survey layout', 'Double-grade beam footings', 'Engineered rebar matrices'],
        img: '/images/project-commercial-floor.png'
      }
    ]
  },
  {
    group: 'CUSTOM FINISHES',
    desc: 'Custom concrete finishing for residential applications, driveways, and entries.',
    items: [
      {
        icon: <IconHouse />,
        title: 'Residential Driveways',
        desc: 'Compacted caliche base driveway pours capable of supporting large utility pickups.',
        bullets: ['Grade-60 steel reinforcement grid', 'Subgrade moisture vapor barriers', 'Broom or hand-troweled borders'],
        img: '/images/residential-driveway.png'
      },
      {
        icon: <IconHouse />,
        title: 'Decorative & Stamped Patios',
        desc: 'Aggregates, stamped textures, and concrete colors designed to withstand extreme climate shifts.',
        bullets: ['Custom stamped patterns', 'Weather-resistant colors', 'Liquid hydration sealer compound'],
        img: '/images/project-patio.png'
      }
    ]
  }
];

export default function ServicesPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in header elements
      gsap.fromTo('.services-hero-anim',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );

      // Stagger section card reveals
      gsap.utils.toArray('.services-group-section').forEach((section) => {
        gsap.fromTo(section.querySelectorAll('.services-card'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              once: true
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .services-container { min-height: 100vh; background: #000000; padding: 140px 24px 100px; position: relative; }
        .services-hero-box { text-align: center; max-width: 800px; margin: 0 auto 80px; }
        .services-eyebrow { display: inline-flex; align-items: center; gap: 8px; border: 1px solid #E31937; border-radius: 999px; padding: 6px 18px; color: #E31937; font-family: var(--font-heading); font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
        .services-title { font-family: var(--font-heading); font-size: clamp(2.5rem, 5vw, 4.2rem); font-weight: 900; text-transform: uppercase; line-height: 1.1; margin-bottom: 24px; color: #ffffff; }
        .services-title .red { color: #E31937; }
        .services-subtitle { font-family: var(--font-body); font-size: 16px; color: rgba(255, 255, 255, 0.55); line-height: 1.7; max-width: 600px; margin: 0 auto; }
        
        .services-group-section { max-width: 1200px; margin: 0 auto 90px; }
        .services-group-header { display: flex; align-items: baseline; gap: 16px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 16px; margin-bottom: 32px; }
        .services-group-badge { background: #E31937; color: #ffffff; font-family: var(--font-heading); font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 4px; letter-spacing: 1px; }
        .services-group-title { font-family: var(--font-heading); font-size: 18px; font-weight: 900; color: #ffffff; letter-spacing: 1px; text-transform: uppercase; }
        .services-group-desc { font-family: var(--font-body); font-size: 13px; color: rgba(255, 255, 255, 0.4); margin-left: auto; }
        @media(max-width: 768px) {
          .services-group-header { flex-direction: column; align-items: flex-start; gap: 8px; }
          .services-group-desc { margin-left: 0; }
        }

        .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        @media(max-width: 850px) { .services-grid { grid-template-columns: 1fr; gap: 24px; } }

        .services-card { background: rgba(255, 255, 255, 0.01); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; min-height: 480px; position: relative; overflow: hidden; transition: border-color 0.3s, box-shadow 0.3s; }
        .services-card:hover { border-color: rgba(227, 25, 55, 0.25); box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
        
        .services-card-top { display: flex; flex-direction: column; gap: 24px; position: relative; z-index: 2; }
        .services-card-icon-wrapper { width: 48px; height: 48px; border-radius: 12px; background: rgba(227, 25, 55, 0.08); border: 1px solid rgba(227, 25, 55, 0.25); display: flex; align-items: center; justify-content: center; color: #E31937; }
        
        .services-card-title { font-family: var(--font-heading); font-size: 24px; font-weight: 900; color: #ffffff; text-transform: uppercase; margin: 0; letter-spacing: 0.5px; }
        .services-card-desc { font-family: var(--font-body); font-size: 14.5px; color: rgba(255, 255, 255, 0.5); line-height: 1.6; margin: 0; }
        
        .services-card-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; position: relative; z-index: 2; }
        .services-card-list-item { display: flex; alignItems: center; gap: 10px; font-family: var(--font-body); font-size: 13.5px; color: rgba(255, 255, 255, 0.7); }
        .services-card-list-dot { width: 5px; height: 5px; border-radius: 50%; background: #E31937; }

        .services-card-image-bg { position: absolute; inset: 0; z-index: 1; opacity: 0.03; transition: opacity 0.3s ease; }
        .services-card:hover .services-card-image-bg { opacity: 0.08; }
      `}</style>

      <div ref={containerRef} className="services-container">
        <div className="services-hero-box">
          <div className="services-eyebrow services-hero-anim">What We Do</div>
          <h1 className="services-title services-hero-anim">Services That <span className="red">Deliver</span></h1>
          <p className="services-subtitle services-hero-anim">
            From residential driveways to industrial flat floors — we build structural concrete solutions to the highest standards.
          </p>
        </div>

        {SECTIONS.map((section, sIdx) => (
          <div key={sIdx} className="services-group-section">
            <div className="services-group-header">
              <span className="services-group-badge">{section.group.split(' ')[0]}</span>
              <h2 className="services-group-title">{section.group}</h2>
              <span className="services-group-desc">{section.desc}</span>
            </div>

            <div className="services-grid">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="services-card">
                  {/* Real construction background loaded inside card */}
                  <div className="services-card-image-bg">
                    <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} quality={70} />
                  </div>

                  <div className="services-card-top">
                    <div className="services-card-icon-wrapper">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="services-card-title">{item.title}</h3>
                      <p style={{ height: '8px' }} />
                      <p className="services-card-desc">{item.desc}</p>
                    </div>
                  </div>

                  <ul className="services-card-list">
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="services-card-list-item">
                        <span className="services-card-list-dot" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* BOTTOM CTA */}
        <section style={{ padding: '80px 0 0', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '16px' }}>
            Ready to start your layout?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.5)', maxWidth: '580px', margin: '0 auto 32px', lineHeight: 1.6 }}>
            Speak directly with Alonso Cardenas to review excavation, forms setting, and concrete delivery estimates.
          </p>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '16px 36px', borderRadius: '40px', background: '#E31937', color: '#fff',
            fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, textDecoration: 'none',
            boxShadow: '0 8px 30px rgba(227, 25, 55, 0.35)', transition: 'transform 0.25s'
          }} className="btn-hover-scale">
            Request a Free Estimate →
          </Link>
        </section>
      </div>
    </>
  );
}