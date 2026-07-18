'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Hook to detect mobile viewport
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

// Dummy Project & Service Data
const OPCOMM_IMAGES_ROW1 = [
  { id: 1, title: 'Permian Logistics Hub', badge: 'INDUSTRIAL', img: '/images/commercial-warehouse.png' },
  { id: 2, title: 'Odessa Energy Slab', badge: 'COMMERCIAL', img: '/images/after-warehouse-slab.png' },
  { id: 3, title: 'Midland Retail Center', badge: 'COMMERCIAL', img: '/images/project-commercial-floor.png' },
  { id: 4, title: 'Heavy Fleet Parking', badge: 'INDUSTRIAL', img: '/images/parking-lot-forming.png' },
  { id: 5, title: 'High-PSI Crane Pad', badge: 'HEAVY CIVIL', img: '/images/industrial-concrete-pour.png' },
];

const OPCOMM_IMAGES_ROW2 = [
  { id: 6, title: 'Laser Screed Finish', badge: 'EQUIPMENT', img: '/images/commercial-laser-screed.png' },
  { id: 7, title: 'Grade-60 Rebar Matrix', badge: 'STRUCTURE', img: '/images/before-warehouse-rebar.png' },
  { id: 8, title: 'Stamped Luxury Patio', badge: 'RESIDENTIAL', img: '/images/stamped-pool-deck.png' },
  { id: 9, title: 'Subgrade Excavation', badge: 'PREPARATION', img: '/images/before-commercial-subgrade.png' },
  { id: 10, title: 'Custom Entryway Slab', badge: 'RESIDENTIAL', img: '/images/luxury-driveway-entry.png' },
];

const HUB_NODES = [
  {
    id: 'commerce',
    name: 'COMMERCIAL SLABS',
    category: 'Commercial Floor',
    subtitle: 'Warehouse & Logistics Flooring',
    desc: 'Connect heavy-load slabs, laser screed leveling, and high-abrasion power trowel finishes for 50,000+ sq ft industrial facilities.',
    bullets: ['4,500+ PSI engineered concrete', '98% Standard Proctor soil compaction', 'Somero laser screed flatness tolerance'],
    icon: '🛒',
    img: '/images/after-warehouse-slab.png'
  },
  {
    id: 'saas',
    name: 'SOIL & SUBGRADE PREP',
    category: 'Earthworks',
    subtitle: 'West Texas Caliche Conditioning',
    desc: 'Excavate loose topsoil, condition caliche road base, and verify compaction density before stake setting.',
    bullets: ['95%-98% Standard Proctor compaction', 'Laser transit elevation mapping', 'Caliche stabilization treatment'],
    icon: '📐',
    img: '/images/before-commercial-subgrade.png'
  },
  {
    id: 'crm',
    name: 'REBAR MATRIX Tying',
    category: 'Reinforcement',
    subtitle: 'Grade-60 Steel Grid System',
    desc: 'Tie Grade-60 #4 & #5 rebar matrix on chairs positioned in the center third of the slab to resist high tensile forces.',
    bullets: ['Grade-60 #4/#5 steel rebar', '12" to 18" center grid spacing', 'Heavy-duty plastic chairs elevation'],
    icon: '⚡',
    img: '/images/before-warehouse-rebar.png'
  },
  {
    id: 'ai',
    name: 'LASER SCREED POURING',
    category: 'Precision Pouring',
    subtitle: 'High-Output Flat Floor Tech',
    desc: 'Vibratory laser screed heads consolidate mix and establish ultra-flat floor tolerances in single-pass pours.',
    bullets: ['3D laser screed levelling', 'Polypropylene synthetic fiber mesh', 'Immediate slump & slump test verify'],
    icon: '🤖',
    img: '/images/commercial-laser-screed.png'
  },
  {
    id: 'comm',
    name: 'HYDRATION SEALING',
    category: 'Chemical Curing',
    subtitle: 'Evaporation Retarder & Curing',
    desc: 'Apply deep-penetrating liquid hydration sealing membrane immediately to preserve water in dry West Texas heat.',
    bullets: ['Chemical hydration seal spray', 'Prevents thermal shock surface crazing', 'Guarantees 28-day 5,000 PSI cure'],
    icon: '✉️',
    img: '/images/industrial-concrete-pour.png'
  },
  {
    id: 'data',
    name: 'SAW-CUT CONTROL JOINTS',
    category: 'Crack Prevention',
    subtitle: 'Diamond-Blade Early Entry',
    desc: 'Early-entry diamond saw cutting relieves internal shrinkage stress along pre-calculated stress distribution lines.',
    bullets: ['Precision diamond saw joint cuts', 'Sub-1/4 slab depth cut ratio', 'Polyurea sealant joint filling'],
    icon: '🛢️',
    img: '/images/after-commercial-floor.png'
  }
];

// ───────────────────────────────────────────────────────────────────
// 1. DUAL-ROW OPPOSING SCROLL MARQUEE (User Directive #1)
// ───────────────────────────────────────────────────────────────────
export function DualRowOpposingScrollMarquee() {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous infinite loop — Row 1 moves right to left
      gsap.to(row1Ref.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });

      // Continuous infinite loop — Row 2 moves left to right
      gsap.fromTo(row2Ref.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 40,
          ease: 'none',
          repeat: -1,
        }
      );

      // Scroll boost — speed up row 1 on scroll
      gsap.to(row1Ref.current, {
        x: '-=300',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });

      // Scroll boost — speed up row 2 in opposite direction on scroll
      gsap.to(row2Ref.current, {
        x: '+=300',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '100px 0', background: '#000000', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto 60px', padding: '0 32px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', letterSpacing: '3px', color: '#E31937', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '16px' }}>
          ✦ CONTINUOUS GALLERY IN MOTION
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase' }}>
          West Texas <span style={{ color: '#E31937' }}>Concrete In Motion</span>
        </h2>
      </div>

      {/* ROW 1: LEFT TO RIGHT */}
      <div style={{ overflow: 'hidden', marginBottom: '24px' }}>
        <div ref={row1Ref} style={{ display: 'flex', gap: '24px', width: 'max-content', willChange: 'transform' }}>
          {[...OPCOMM_IMAGES_ROW1, ...OPCOMM_IMAGES_ROW1].map((item, i) => (
            <div key={i} style={{ width: '380px', height: '240px', position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(227,25,55,0.25)', boxShadow: '0 20px 40px rgba(0,0,0,0.8)', flexShrink: 0 }}>
              <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} quality={85} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', letterSpacing: '2px', color: '#E31937', fontWeight: 900, textTransform: 'uppercase' }}>{item.badge}</span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', margin: '4px 0 0' }}>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2: RIGHT TO LEFT */}
      <div style={{ overflow: 'hidden' }}>
        <div ref={row2Ref} style={{ display: 'flex', gap: '24px', width: 'max-content', willChange: 'transform' }}>
          {[...OPCOMM_IMAGES_ROW2, ...OPCOMM_IMAGES_ROW2].map((item, i) => (
            <div key={i} style={{ width: '380px', height: '240px', position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.8)', flexShrink: 0 }}>
              <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} quality={85} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', letterSpacing: '2px', color: '#E31937', fontWeight: 900, textTransform: 'uppercase' }}>{item.badge}</span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', margin: '4px 0 0' }}>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 2. INTERACTIVE SERVICE NODE HUB (From Screenshots 1 & 2)
// ───────────────────────────────────────────────────────────────────
export function InteractiveServiceNodeHub() {
  const [activeId, setActiveId] = useState('commerce');
  const activeNode = HUB_NODES.find(n => n.id === activeId) || HUB_NODES[0];
  const isMobile = useIsMobile();

  return (
    <section style={{ padding: '120px 0', background: '#050505', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase' }}>
            Concrete Operations <br />
            <span style={{ color: '#E31937' }}>Integration Hub.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', maxWidth: '620px', marginTop: '16px', lineHeight: 1.6 }}>
            We synchronize subgrade testing, steel rebar matrix, laser screed pouring, and chemical curing. Hover over any system node to visualize the architecture.
          </p>
        </div>

        {/* HUB GRID: LEFT SPOTLIGHT + RIGHT NODE ECOSYSTEM */}
        <div className="hub-grid-columns">
          
          {/* LEFT SPOTLIGHT CARD */}
          <div style={{
            background: 'rgba(12, 12, 12, 0.95)',
            border: '1px solid rgba(227, 25, 55, 0.35)',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 30px 70px rgba(0,0,0,0.9)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #E31937, rgba(227,25,55,0.2))' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(227, 25, 55, 0.15)', border: '1px solid rgba(227, 25, 55, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                {activeNode.icon}
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', letterSpacing: '2px', color: '#E31937', textTransform: 'uppercase', fontWeight: 900 }}>
                  {activeNode.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
                  {activeNode.name}
                </h3>
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.96rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '24px' }}>
              {activeNode.desc}
            </p>

            <div style={{ position: 'relative', height: '180px', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Image src={activeNode.img} alt={activeNode.name} fill style={{ objectFit: 'cover' }} quality={85} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {activeNode.bullets.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900 }}>✓</span>
                  {b}
                </div>
              ))}
            </div>

            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 26px', borderRadius: '30px',
              background: 'rgba(227, 25, 55, 0.15)', border: '1px solid #E31937',
              color: '#ffffff', fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 800,
              letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.25s'
            }}>
              Explore Integration Options →
            </Link>
          </div>

          {/* RIGHT NODE ECOSYSTEM INTERACTIVE GRAPH */}
          <div className="hub-node-container">
            
            {/* CENTRAL HUB NODE */}
            <div className="hub-center-node">
              <span style={{ fontSize: '24px', marginBottom: '2px' }}>🏗️</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
                PERMIAN HUB
              </span>
            </div>

            {/* SURROUNDING SYSTEM NODES */}
            <div className="hub-node-grid">
              {HUB_NODES.map((node, i) => {
                const isActive = node.id === activeId;
                return (
                  <div
                    key={node.id}
                    className={`hub-card ${isActive ? 'active' : ''}`}
                    onMouseEnter={() => setActiveId(node.id)}
                    onClick={() => setActiveId(node.id)}
                  >
                    <span style={{ fontSize: '20px' }}>{node.icon}</span>
                    <div>
                      <h4 className="hub-card-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 900, color: isActive ? '#E31937' : '#fff', margin: 0, textTransform: 'uppercase' }}>
                        {node.name}
                      </h4>
                      <span className="hub-card-subtitle" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                        {node.subtitle}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 3. PROJECTS IN MOTION HORIZONTAL SCROLL SHOWCASE (From Screenshots 3 & 4)
// ───────────────────────────────────────────────────────────────────
export function ProjectsInMotionHorizontalScroll() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth - 60,
        ease: 'none',
        scrollTrigger: {
          trigger: targetRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalWidth}`
        }
      });
    }, targetRef.current);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={targetRef} style={{ background: '#000000', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      {/* SECTION HEADER */}
      <div style={{ maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '40px 32px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
          Projects In <span style={{ color: '#E31937' }}>Motion</span>
        </h2>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', textTransform: 'lowercase' }}>
          Keep scrolling — the showcase slides sideways →
        </span>
      </div>

      {/* HORIZONTAL SCROLL TRACK */}
      <div style={{ overflow: 'hidden', padding: '20px 0 60px' }}>
        <div ref={trackRef} style={{ display: 'flex', gap: isMobile ? '20px' : '36px', paddingLeft: '32px', willChange: 'transform' }}>
          {[
            { id: 1, title: 'Permian Energy Logistics Hub', cat: 'INDUSTRIAL', desc: 'Heavy-duty 5,000 PSI concrete slab pour engineered for heavy machinery and transport trucks.', img: '/images/commercial-warehouse.png' },
            { id: 2, title: 'Midland Retail Plaza Subgrade', cat: 'COMMERCIAL', desc: 'Precision laser transit formwork with Grade-60 rebar grid on chairs.', img: '/images/parking-lot-forming.png' },
            { id: 3, title: 'Luxury Stamped Pool Deck', cat: 'RESIDENTIAL', desc: 'Slip-resistant stamped concrete deck with custom color hardeners and sealer.', img: '/images/stamped-pool-deck.png' },
            { id: 4, title: 'Odessa Storage Facility', cat: 'COMMERCIAL', desc: 'Somero laser screed poured slab with high-pass power trowel polish.', img: '/images/commercial-laser-screed.png' },
            { id: 5, title: 'West Texas Entry Driveway', cat: 'RESIDENTIAL', desc: 'Durable residential driveway with expansion saw-cut joints.', img: '/images/residential-driveway.png' },
          ].map((item) => (
            <div key={item.id} style={{
              width: isMobile ? '290px' : '540px',
              height: isMobile ? '385px' : '500px',
              flexShrink: 0,
              background: 'rgba(12, 12, 12, 0.95)',
              border: '1px solid rgba(227, 25, 55, 0.25)',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
              position: 'relative'
            }}>
              <div style={{ position: 'relative', height: isMobile ? '180px' : '280px', width: '100%' }}>
                <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} quality={85} />
                <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 900, letterSpacing: '2px', color: '#E31937', background: 'rgba(0,0,0,0.85)', border: '1px solid #E31937', padding: '6px 14px', borderRadius: '20px', textTransform: 'uppercase' }}>
                    {item.cat}
                  </span>
                </div>
              </div>

              <div style={{ padding: isMobile ? '16px' : '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.05rem' : '1.35rem', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', margin: '0 0 10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '0.82rem' : '0.94rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>

                <Link href="/projects" style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 900, color: '#E31937', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px' }}>
                  View case on the Work page →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 4. BEFORE / AFTER INTERACTIVE COMPARISON SLIDER
// ───────────────────────────────────────────────────────────────────
export function BeforeAfterCompareSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);

  const handleMove = (clientX, rect) => {
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <section style={{ padding: '100px 0', background: '#080808' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', letterSpacing: '3px', color: '#E31937', textTransform: 'uppercase', fontWeight: 900, display: 'block', marginBottom: '12px' }}>
            ✦ PROVEN QUALITY TRANSFORMATION
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase' }}>
            Subgrade Prep vs. <span style={{ color: '#E31937' }}>Finished Pour</span>
          </h2>
        </div>

        {/* COMPARISON CONTAINER */}
        <div
          onMouseMove={(e) => handleMove(e.clientX, e.currentTarget.getBoundingClientRect())}
          onTouchMove={(e) => {
            if (e.touches && e.touches[0]) {
              handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
            }
          }}
          style={{ position: 'relative', width: '100%', height: '520px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(227,25,55,0.3)', userSelect: 'none', cursor: 'ew-resize', boxShadow: '0 30px 80px rgba(0,0,0,0.9)' }}
        >
          {/* AFTER IMAGE (Right Side) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <Image src="/images/after-warehouse-slab.png" alt="After Finished Concrete Slab" fill style={{ objectFit: 'cover' }} quality={90} />
            <span style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10, fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 900, letterSpacing: '2px', color: '#fff', background: '#E31937', padding: '8px 18px', borderRadius: '20px', textTransform: 'uppercase' }}>AFTER: 4,500 PSI FINISHED</span>
          </div>

          {/* BEFORE IMAGE (Left Side - Clipped via clipPath) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            borderRight: '3px solid #E31937'
          }}>
            <Image src="/images/before-warehouse-rebar.png" alt="Before Rebar Matrix Prep" fill style={{ objectFit: 'cover' }} quality={90} />
            <span style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10, fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 900, letterSpacing: '2px', color: '#fff', background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 18px', borderRadius: '20px', textTransform: 'uppercase' }}>BEFORE: REBAR MATRIX PREP</span>
          </div>

          {/* SLIDER HANDLE LINE INDICATOR */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPos}%`,
            width: '3px',
            background: '#E31937',
            boxShadow: '0 0 10px #E31937',
            zIndex: 3,
            pointerEvents: 'none'
          }} />

          {/* SLIDER HANDLE HANDLE BAR */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderPos}%`, transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 4 }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#E31937', boxShadow: '0 0 25px #E31937', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '16px' }}>↔</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 5. SERVICE SPOTLIGHT HOVER ACCORDION PANELS
// ───────────────────────────────────────────────────────────────────
export function ServiceSpotlightHoverAccordion() {
  const [activeIdx, setActiveIdx] = useState(0);
  const isMobile = useIsMobile();

  const panels = [
    { title: 'Commercial Floors', subtitle: '50,000+ SQ FT CAPACITY', img: '/images/project-commercial-floor.png' },
    { title: 'Foundation Slabs', subtitle: 'INDUSTRIAL GRADE-60 STEEL', img: '/images/industrial-concrete-pour.png' },
    { title: 'Laser Screeding', subtitle: 'SOMERO 3D ACCURACY', img: '/images/commercial-laser-screed.png' },
    { title: 'Stamped Patios', subtitle: 'CUSTOM TEXTURED FINISHES', img: '/images/stamped-pool-deck.png' },
  ];

  return (
    <section style={{ padding: '100px 0', background: '#000000' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase' }}>
            Specialized <span style={{ color: '#E31937' }}>Service Pillars</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '12px' : '16px', height: isMobile ? 'auto' : '480px' }}>
          {panels.map((p, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveIdx(idx)}
                style={{
                  flex: isMobile ? 'none' : (isActive ? 4 : 1),
                  height: isMobile ? (isActive ? '280px' : '80px') : 'auto',
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'flex 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  border: isActive ? '2px solid #E31937' : '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} quality={85} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)' }} />

                <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', letterSpacing: '2px', color: '#E31937', fontWeight: 900, textTransform: 'uppercase' }}>{p.subtitle}</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: isActive ? (isMobile ? '1.4rem' : '1.8rem') : (isMobile ? '1rem' : '1.2rem'), fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: '6px 0 0', whiteSpace: 'nowrap', transition: 'font-size 0.3s' }}>{p.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Master Export
export default function ServicesExtendedGSAP() {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Force a ScrollTrigger refresh after mount and any initial layout shifts
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isMobile]);

  return (
    <>
      <DualRowOpposingScrollMarquee />
      <InteractiveServiceNodeHub />
      <ProjectsInMotionHorizontalScroll />
      <BeforeAfterCompareSlider />
      <ServiceSpotlightHoverAccordion />
    </>
  );
}
