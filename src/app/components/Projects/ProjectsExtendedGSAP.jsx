'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

const PROJECTS_DATA = [
  { id: 1, title: 'Odessa Energy Distribution Hub', category: 'INDUSTRIAL', psi: '5,000 PSI', sqft: '45,000 SQ FT', desc: 'Heavy structural slab pour for oilfield equipment storage.', img: '/images/commercial-warehouse.png' },
  { id: 2, title: 'Midland Retail Parking Structure', category: 'COMMERCIAL', psi: '4,000 PSI', sqft: '60,000 SQ FT', desc: 'Laser screed poured high-durability parking surface.', img: '/images/parking-lot-forming.png' },
  { id: 3, title: 'Luxury Stamped Pool Patio', category: 'RESIDENTIAL', psi: '3,500 PSI', sqft: '3,200 SQ FT', desc: 'Custom textured stamped concrete with protective seal.', img: '/images/stamped-pool-deck.png' },
  { id: 4, title: 'Permian Logistics Fleet Deck', category: 'INDUSTRIAL', psi: '4,500 PSI', sqft: '38,000 SQ FT', desc: 'Grade-60 rebar reinforced heavy vehicle slab.', img: '/images/after-warehouse-slab.png' },
  { id: 5, title: 'Subgrade Excavation & Formwork', category: 'CIVIL', psi: 'PREP', sqft: '75,000 SQ FT', desc: '98% compaction caliche subgrade mapping.', img: '/images/before-commercial-subgrade.png' },
  { id: 6, title: 'High-Flatness Laser Poured Floor', category: 'COMMERCIAL', psi: '4,500 PSI', sqft: '52,000 SQ FT', desc: 'Somero laser screed poured flat floor for distribution.', img: '/images/commercial-laser-screed.png' }
];

// ───────────────────────────────────────────────────────────────────
// 1. WORK FILTER CATEGORY GRID (GSAP Staggered Layout Transition)
// ───────────────────────────────────────────────────────────────────
export function WorkFilterCategoryGrid() {
  const [filter, setFilter] = useState('ALL');
  const gridRef = useRef(null);
  const isMobile = useIsMobile();

  const filteredItems = filter === 'ALL'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === filter);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.work-filter-card');
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.8, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
    );
  }, [filter]);

  return (
    <section style={{ padding: '100px 0', background: '#000000' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
        
        {/* HEADER & FILTER TABS */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', letterSpacing: '3px', color: '#E31937', fontWeight: 900, textTransform: 'uppercase' }}>✦ PORTFOLIO SHOWCASE</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', margin: '6px 0 0' }}>
              Selected <span style={{ color: '#E31937' }}>Work</span>
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['ALL', 'COMMERCIAL', 'INDUSTRIAL', 'RESIDENTIAL'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  padding: isMobile ? '8px 14px' : '10px 22px', borderRadius: '30px',
                  background: filter === tab ? '#E31937' : 'rgba(255,255,255,0.05)',
                  border: filter === tab ? '1px solid #E31937' : '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 900,
                  letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.25s ease'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '20px' : '32px' }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="work-filter-card"
              style={{
                background: 'rgba(12, 12, 12, 0.95)',
                border: '1px solid rgba(227, 25, 55, 0.25)',
                borderRadius: '24px', overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                transition: 'transform 0.3s ease, border-color 0.3s ease'
              }}
            >
              <div style={{ position: 'relative', height: '240px' }}>
                <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} quality={85} />
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 900, color: '#E31937', background: 'rgba(0,0,0,0.85)', border: '1px solid #E31937', padding: '6px 14px', borderRadius: '20px', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'rgba(255,255,255,0.5)', fontWeight: 800 }}>
                  <span>💪 {item.psi}</span>
                  <span>📐 {item.sqft}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 2. WORK PINNED STICKY OVERLAPPING DECK STACK
// ───────────────────────────────────────────────────────────────────
export function WorkPinnedStickyOverlappingCards() {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.sticky-deck-card');

      cards.forEach((card, idx) => {
        if (idx === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top top+=100',
            end: 'bottom top+=100',
            scrub: true
          }
        });
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={containerRef} style={{ padding: '120px 0', background: '#050505' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', letterSpacing: '3px', color: '#E31937', fontWeight: 900, textTransform: 'uppercase' }}>✦ FEATURED CASE STUDIES</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', margin: '6px 0 0' }}>
            Stacked <span style={{ color: '#E31937' }}>Excellence</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '30px' : '60px' }}>
          {[
            { step: 'PROJECT 01', title: 'Permian Oilfield Equipment Storage Slab', cat: '5,000 PSI HEAVY SLAB', desc: 'Engineered high-compaction slab designed for 100,000+ lb oil rig equipment transport trucks in Midland, TX.', img: '/images/commercial-warehouse.png' },
            { step: 'PROJECT 02', title: 'Somero Laser Screed Industrial Warehouse Floor', cat: 'FLAT FLOOR TOLERANCE', desc: 'Achieved glass-smooth flat floor tolerances across a 48,000 sq ft logistics distribution facility in Odessa, TX.', img: '/images/after-warehouse-slab.png' },
            { step: 'PROJECT 03', title: 'Custom Stamped Luxury Pool Patio & Deck', cat: 'DECORATIVE RESIDENTIAL', desc: 'Precision hand-stamped concrete patio with UV-resistant sealer and slip-resistant surface coating.', img: '/images/stamped-pool-deck.png' }
          ].map((card, i) => (
            <div
              key={i}
              className="sticky-deck-card"
              style={{
                position: isMobile ? 'relative' : 'sticky', top: isMobile ? '0px' : '120px',
                background: 'rgba(12, 12, 12, 0.98)',
                border: '1px solid rgba(227, 25, 55, 0.3)',
                borderRadius: isMobile ? '20px' : '28px', padding: isMobile ? '24px' : '40px',
                display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? '20px' : '40px', alignItems: 'center',
                boxShadow: '0 30px 80px rgba(0,0,0,0.95)'
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 900, color: '#E31937', letterSpacing: '2px', textTransform: 'uppercase' }}>{card.step} — {card.cat}</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.3rem' : '2rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: '12px 0' }}>{card.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '24px' }}>{card.desc}</p>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '30px', background: '#E31937', color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Request Similar Project →
                </Link>
              </div>

              <div style={{ position: 'relative', height: isMobile ? '200px' : '320px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Image src={card.img} alt={card.title} fill style={{ objectFit: 'cover' }} quality={85} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 3. WORK SPEC MATRIX COUNTER (Animated Counters on Parallax Image)
// ───────────────────────────────────────────────────────────────────
export function WorkSpecMatrixCounter() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  return (
    <section ref={sectionRef} style={{ position: 'relative', padding: '140px 0', background: '#000000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
        <Image src="/images/industrial-concrete-pour.png" alt="Concrete Pour Metrics Background" fill style={{ objectFit: 'cover' }} quality={80} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '16px' : '32px' }}>
          {[
            { val: '4,500+', label: 'COMPRESSIVE PSI STRENGTH' },
            { val: '98%', label: 'CALICHE COMPACTION DENSITY' },
            { val: '500,000+', label: 'TOTAL SQ FT POURED' },
            { val: '100%', label: 'ON-TIME DISPATCH GUARANTEE' }
          ].map((stat, i) => (
            <div key={i} style={{ background: 'rgba(10,10,10,0.85)', border: '1px solid rgba(227,25,55,0.3)', borderRadius: '24px', padding: isMobile ? '30px 16px' : '40px 24px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, color: '#E31937', display: 'block', marginBottom: '8px' }}>
                {stat.val}
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Master Export
export default function ProjectsExtendedGSAP() {
  return (
    <>
      <WorkFilterCategoryGrid />
      <WorkPinnedStickyOverlappingCards />
      <WorkSpecMatrixCounter />
    </>
  );
}
