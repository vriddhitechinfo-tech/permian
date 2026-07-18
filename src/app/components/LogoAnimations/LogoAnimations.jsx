'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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

// ── Builder Logos SVGs ──────────────────────────────────────────────
const builderLogos = [
  {
    id: 'basin',
    name: 'Basin Logistics Hub',
    badge: 'COMMERCIAL PARTNER',
    img: '/images/commercial-warehouse.png',
    svg: (
      <svg viewBox="0 0 160 44" fill="none">
        <circle cx="22" cy="22" r="18" stroke="#E31937" strokeWidth="2.2" fill="none"/>
        <path d="M12 28c4-8 16-8 20-2" stroke="#E31937" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="22" cy="22" r="4" fill="#E31937"/>
        <text x="48" y="20" fontFamily="Arial Black" fontSize="13" fontWeight="900" fill="#fff" letterSpacing="1">BASIN</text>
        <text x="48" y="34" fontFamily="Arial" fontSize="11" fontWeight="800" fill="#E31937" letterSpacing="1">LOGISTICS</text>
      </svg>
    )
  },
  {
    id: 'midland',
    name: 'Midland Energy Slabs',
    badge: 'INDUSTRIAL BUILDER',
    img: '/images/project-commercial-floor.png',
    svg: (
      <svg viewBox="0 0 160 44" fill="none">
        <polygon points="22,4 40,15 40,38 4,38 4,15" stroke="#E31937" strokeWidth="2.2" fill="none"/>
        <polygon points="14,38 14,22 30,22 30,38" fill="rgba(227,25,55,0.25)" stroke="#E31937" strokeWidth="1.2"/>
        <text x="48" y="20" fontFamily="Arial Black" fontSize="12" fontWeight="900" fill="#fff" letterSpacing="1">MIDLAND</text>
        <text x="48" y="34" fontFamily="Arial" fontSize="11" fontWeight="800" fill="#E31937" letterSpacing="1">ENERGY SLABS</text>
      </svg>
    )
  },
  {
    id: 'odessa',
    name: 'Odessa Warehousing',
    badge: 'FOUNDATION SPECIALIST',
    img: '/images/after-warehouse-slab.png',
    svg: (
      <svg viewBox="0 0 160 44" fill="none">
        <rect x="4" y="11" width="36" height="26" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="2.2" fill="none"/>
        <rect x="11" y="3" width="12" height="13" rx="1.5" stroke="#E31937" strokeWidth="1.8" fill="none"/>
        <rect x="18" y="24" width="9" height="13" fill="rgba(227,25,55,0.35)" stroke="#E31937" strokeWidth="1.2"/>
        <text x="48" y="20" fontFamily="Arial Black" fontSize="13" fontWeight="900" fill="#fff" letterSpacing="1">ODESSA</text>
        <text x="48" y="34" fontFamily="Arial" fontSize="11" fontWeight="800" fill="#E31937" letterSpacing="1">WAREHOUSE</text>
      </svg>
    )
  },
  {
    id: 'westtx',
    name: 'West Texas Hauling Slabs',
    badge: 'HEAVY TRUCK PADS',
    img: '/images/industrial-concrete-pour.png',
    svg: (
      <svg viewBox="0 0 160 44" fill="none">
        <path d="M4 36L15 9L24 28L33 13L42 36" stroke="#E31937" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="50" y="20" fontFamily="Arial Black" fontSize="12" fontWeight="900" fill="#fff" letterSpacing="1">WEST TEXAS</text>
        <text x="50" y="34" fontFamily="Arial" fontSize="11" fontWeight="800" fill="#E31937" letterSpacing="1">HAULING</text>
      </svg>
    )
  },
  {
    id: 'tristate',
    name: 'Tri-State Concrete Supply',
    badge: 'PRE-MIX SUPPLIER',
    img: '/images/commercial-laser-screed.png',
    svg: (
      <svg viewBox="0 0 160 44" fill="none">
        <path d="M22 6 L38 24 L22 38 L6 24 Z" stroke="#E31937" strokeWidth="2.2" fill="none"/>
        <circle cx="22" cy="22" r="3.5" fill="#E31937"/>
        <text x="46" y="20" fontFamily="Arial Black" fontSize="12" fontWeight="900" fill="#fff" letterSpacing="1">TRI-STATE</text>
        <text x="46" y="34" fontFamily="Arial" fontSize="11" fontWeight="800" fill="#E31937" letterSpacing="1">CONCRETE</text>
      </svg>
    )
  },
  {
    id: 'caliche',
    name: 'Caliche Grade Builders',
    badge: 'SUBGRADE ENGINE',
    img: '/images/before-commercial-subgrade.png',
    svg: (
      <svg viewBox="0 0 160 44" fill="none">
        <path d="M4 32 Q11 24 18 28 Q25 20 32 26 Q39 18 43 24 L43 36 L4 36 Z" fill="rgba(227,25,55,0.25)" stroke="#E31937" strokeWidth="2.2"/>
        <text x="48" y="20" fontFamily="Arial Black" fontSize="12" fontWeight="900" fill="#fff" letterSpacing="1">CALICHE</text>
        <text x="48" y="34" fontFamily="Arial" fontSize="11" fontWeight="800" fill="#E31937" letterSpacing="1">GRADE CORP</text>
      </svg>
    )
  }
];

// ───────────────────────────────────────────────────────────────────
// 1. IMAGE ANIMATION SECTION 1: Dynamic Clip-Path Unveil
// ───────────────────────────────────────────────────────────────────
export function ImageClipPathUnveil() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.clip-reveal-card').forEach((card) => {
        const img = card.querySelector('.clip-reveal-img');
        const badge = card.querySelector('.clip-reveal-badge');

        gsap.fromTo(img,
          { clipPath: 'polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)', scale: 1.25, filter: 'brightness(0.4)' },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scale: 1, filter: 'brightness(1)',
            duration: 1.2, ease: 'power3.inOut',
            scrollTrigger: { trigger: card, start: 'top 82%', once: true }
          }
        );

        gsap.fromTo(badge,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, delay: 0.6, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: card, start: 'top 82%', once: true }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '100px 0', background: '#050505', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '3px', fontWeight: 800, color: '#E31937', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            ✦ BUILDER SHOWCASE
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>
            Commercial Builder Masterpieces
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '20px' : '32px' }}>
          {builderLogos.slice(0, 3).map((b) => (
            <div key={b.id} className="clip-reveal-card" style={{ position: 'relative', height: isMobile ? '380px' : '440px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="clip-reveal-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <Image src={b.img} alt={b.name} fill style={{ objectFit: 'cover' }} quality={85} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)' }} />
              </div>

              <div className="clip-reveal-badge" style={{ position: 'absolute', bottom: isMobile ? '16px' : '24px', left: isMobile ? '16px' : '24px', right: isMobile ? '16px' : '24px', zIndex: 5, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(227,25,55,0.35)', borderRadius: '18px', padding: isMobile ? '14px' : '20px' }}>
                <div style={{ width: isMobile ? '120px' : '150px', height: isMobile ? '32px' : '40px', marginBottom: '10px' }}>{b.svg}</div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '10px' : '12px', fontWeight: 900, letterSpacing: '2px', color: '#E31937', textTransform: 'uppercase', display: 'block' }}>{b.badge}</span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '16px' : '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: '4px 0 0' }}>{b.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 2. IMAGE ANIMATION SECTION 2: 3D Depth Card Stack
// ───────────────────────────────────────────────────────────────────
export function Image3DDepthStack() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const lastIndexRef = useRef(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.depth-stack-card');
      const total = cards.length;

      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: 0, rotateZ: 0, rotateY: 0,
          scale: 1 - i * 0.03, y: i * 8, zIndex: total - i,
          filter: i === 0 ? 'brightness(1)' : 'brightness(0.6)',
          force3D: true
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.3,
          onUpdate: (self) => {
            const index = Math.min(total - 1, Math.floor(self.progress * total));
            if (index !== lastIndexRef.current) {
              lastIndexRef.current = index;
              setActiveCard(index);
            }
          }
        }
      });

      cards.forEach((card, i) => {
        const targetX = (i - (total - 1) / 2) * (isMobile ? 55 : 150);
        const targetRotate = (i - (total - 1) / 2) * (isMobile ? 3 : 5);

        tl.to(card, {
          x: targetX, rotateZ: targetRotate, rotateY: (i - (total - 1) / 2) * 3,
          scale: 1, y: 0, filter: 'brightness(1)', ease: 'none',
          force3D: true
        }, i * 0.4);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleContainerMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = -(e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    gsap.to('.depth-stack-card', {
      rotateY: (i) => ((i - 2.5) * 4) + x * 15,
      rotateX: y * 12,
      duration: 0.4, ease: 'power2.out', overwrite: 'auto'
    });
  };

  const handleCardMouseEnter = (index) => {
    setActiveCard(index);
    const cards = gsap.utils.toArray('.depth-stack-card');
    cards.forEach((card, i) => {
      if (i === index) {
        gsap.to(card, {
          y: -24, scale: 1.1, zIndex: 50, borderColor: '#E31937',
          boxShadow: '0 30px 60px rgba(227, 25, 55, 0.45)', filter: 'brightness(1.15)',
          duration: 0.35, ease: 'back.out(1.4)', overwrite: 'auto'
        });
      } else {
        gsap.to(card, {
          y: 0, scale: 0.95, zIndex: Math.abs(i - index), borderColor: 'rgba(255,255,255,0.08)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)', filter: 'brightness(0.4)',
          duration: 0.35, ease: 'power2.out', overwrite: 'auto'
        });
      }
    });
  };

  const handleContainerMouseLeave = () => {
    const cards = gsap.utils.toArray('.depth-stack-card');
    const total = cards.length;
    cards.forEach((card, i) => {
      const targetX = (i - (total - 1) / 2) * (isMobile ? 55 : 150);
      const targetRotate = (i - (total - 1) / 2) * (isMobile ? 3 : 5);
      gsap.to(card, {
        x: targetX, y: 0, scale: 1, rotateZ: targetRotate, rotateY: (i - (total - 1) / 2) * 4, rotateX: 0,
        zIndex: total - i, borderColor: 'rgba(227,25,55,0.35)', boxShadow: '0 30px 60px rgba(0,0,0,0.9)',
        filter: 'brightness(1)', duration: 0.5, ease: 'power2.out', overwrite: 'auto'
      });
    });
  };

  return (
    <section ref={sectionRef} className="depth-stack-section" style={{ position: 'relative', minHeight: '100vh', padding: '80px 0', background: '#000000', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '3px', fontWeight: 800, color: '#E31937', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
          ✦ PORTFOLIO STACK
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '16px' }}>
          Interactive Builder Portfolio Stack
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', margin: '0 auto 48px', maxWidth: '540px' }}>
          Scroll down or hover over cards to unfold and inspect builder projects in 3D.
        </p>

        <div style={{ display: 'inline-flex', gap: '10px', marginBottom: '40px' }}>
          {builderLogos.map((_, i) => (
            <div
              key={i}
              onClick={() => handleCardMouseEnter(i)}
              style={{
                width: activeCard === i ? '32px' : '10px', height: '5px', borderRadius: '4px',
                background: activeCard === i ? '#E31937' : 'rgba(255,255,255,0.25)',
                cursor: 'pointer', transition: 'all 0.3s'
              }}
            />
          ))}
        </div>

        <div
          ref={containerRef}
          onMouseMove={handleContainerMouseMove}
          onMouseLeave={handleContainerMouseLeave}
          style={{ position: 'relative', height: isMobile ? '400px' : '480px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px' }}
        >
          {builderLogos.map((b, i) => (
            <div
              key={b.id}
              className="depth-stack-card"
              onMouseEnter={() => handleCardMouseEnter(i)}
              style={{
                position: 'absolute', width: isMobile ? '260px' : '310px', height: isMobile ? '350px' : '420px', borderRadius: '24px', overflow: 'hidden',
                border: '1px solid rgba(227,25,55,0.35)', boxShadow: '0 30px 60px rgba(0,0,0,0.9)',
                transformStyle: 'preserve-3d', willChange: 'transform', cursor: 'pointer',
                transition: 'border-color 0.3s, box-shadow 0.3s'
              }}
            >
              <Image src={b.img} alt={b.name} fill style={{ objectFit: 'cover' }} quality={85} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: isMobile ? '16px' : '24px', left: isMobile ? '16px' : '24px', right: isMobile ? '16px' : '24px', textAlign: 'left', zIndex: 10 }}>
                <div style={{ width: '140px', height: '36px', marginBottom: '10px' }}>{b.svg}</div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: '#E31937', textTransform: 'uppercase', display: 'block' }}>{b.badge}</span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: '4px 0 0' }}>{b.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 3. IMAGE ANIMATION SECTION 3: Pin-Scroll Split Image Curtain
// ───────────────────────────────────────────────────────────────────
export function ImageCurtainSplit() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top', end: '+=100%',
          pin: true, scrub: 1,
        }
      });

      tl.to('.curtain-left', { xPercent: -100, ease: 'none' }, 0)
        .to('.curtain-right', { xPercent: 100, ease: 'none' }, 0)
        .fromTo('.curtain-center-logo', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power2.out' }, 0.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: '#080808' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1, padding: '32px', textAlign: 'center' }}>
        <div className="curtain-center-logo" style={{ maxWidth: '750px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '3px', fontWeight: 800, color: '#E31937', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            ✦ UNCOMPROMISING STRENGTH
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '24px', lineHeight: 1.1 }}>
            WEST TEXAS STRUCTURAL EXCELLENCE
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '1.05rem' : '1.25rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: '40px' }}>
            When the curtain splits, only structural precision remains. Alonso Cardenas engineered foundations built for heavy trucks, oilfield rigs, and commercial shops.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '10px' : '16px', maxWidth: '720px', margin: '0 auto' }}>
            {builderLogos.slice(0, 4).map(b => (
              <div key={b.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(227,25,55,0.35)', borderRadius: '14px', padding: isMobile ? '10px' : '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: isMobile ? '110px' : '140px', height: isMobile ? '28px' : '36px' }}>{b.svg}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="curtain-left" style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', zIndex: 2, overflow: 'hidden', borderRight: '2px solid #E31937' }}>
        <Image src="/images/commercial-laser-screed.png" alt="Laser Screed Concrete" fill style={{ objectFit: 'cover' }} quality={90} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
        <div style={{ position: 'absolute', bottom: '40px', left: '40px', color: '#fff' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>COMMERCIAL SCREED PREP</h3>
        </div>
      </div>

      <div className="curtain-right" style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', zIndex: 2, overflow: 'hidden', borderLeft: '2px solid #E31937' }}>
        <Image src="/images/after-warehouse-slab.png" alt="Warehouse Concrete Slab" fill style={{ objectFit: 'cover' }} quality={90} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
        <div style={{ position: 'absolute', bottom: '40px', right: '40px', textAlign: 'right', color: '#fff' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>FINISHED SLAB REVEAL</h3>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 4. IMAGE ANIMATION SECTION 4: Floating Image Physics & Orbit
// ───────────────────────────────────────────────────────────────────
export function ImageFloatingOrbit() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.float-img-item').forEach((item, i) => {
        gsap.to(item, {
          y: `+=${20 + i * 8}`,
          rotateZ: (i % 2 === 0 ? 5 : -5),
          duration: 2.5 + i * 0.4,
          repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.2
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '120px 0', background: '#030303', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '3px', fontWeight: 800, color: '#E31937', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            ✦ BUILDER ECOSYSTEM
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>
            The Permian Builder Ecosystem
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? '16px' : '24px' }}>
          {[
            { img: '/images/luxury-driveway-entry.png', title: 'Luxury Driveways', logo: builderLogos[0] },
            { img: '/images/parking-lot-forming.png', title: 'Parking Lot Forming', logo: builderLogos[1] },
            { img: '/images/stamped-pool-deck.png', title: 'Stamped Pool Decks', logo: builderLogos[2] },
            { img: '/images/before-warehouse-rebar.png', title: 'Steel Rebar Grid', logo: builderLogos[3] }
          ].map((item, idx) => (
            <div key={idx} className="float-img-item" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
              <div style={{ position: 'relative', height: isMobile ? '280px' : '220px', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px' }}>
                <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} quality={80} />
              </div>
              <div style={{ width: '140px', height: '36px', marginBottom: '10px' }}>{item.logo.svg}</div>
              <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: 0 }}>{item.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 5. IMAGE ANIMATION SECTION 5: Image Grid Expand Spotlight
// ───────────────────────────────────────────────────────────────────
export function ImageExpandGrid() {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const lastIndexRef = useRef(0);
  const isMobile = useIsMobile();

  const images = [
    { src: '/images/residential-driveway.png', title: 'Residential Driveways', logo: builderLogos[0] },
    { src: '/images/project-foundation.png', title: 'Commercial Foundations', logo: builderLogos[1] },
    { src: '/images/stamped-concrete-patio.png', title: 'Stamped Patios', logo: builderLogos[2] },
    { src: '/images/project-sidewalk.png', title: 'Site Drainage & Curbs', logo: builderLogos[3] },
    { src: '/images/industrial-concrete-pour.png', title: 'Industrial Heavy Pour', logo: builderLogos[4] },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = images.length;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.3,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          if (idx !== lastIndexRef.current) {
            lastIndexRef.current = idx;
            setActiveIdx(idx);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [images.length]);

  return (
    <section ref={sectionRef} style={{ position: 'relative', minHeight: '100vh', padding: '80px 0', background: '#000000', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '3px', fontWeight: 800, color: '#E31937', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            ✦ PROJECT SPOTLIGHT
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '12px' }}>
            Featured Builder Projects
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', margin: '0 auto', maxWidth: '540px' }}>
            Scroll down or hover over cards to expand and spotlight each project.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '12px' : '16px', height: isMobile ? 'auto' : '500px' }}>
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveIdx(i)}
              onMouseEnter={() => !isMobile ? setActiveIdx(i) : undefined}
              style={{
                flex: isMobile ? 'none' : (activeIdx === i ? 3.5 : 1),
                height: isMobile ? (activeIdx === i ? '260px' : '85px') : '100%',
                position: 'relative', borderRadius: '24px', overflow: 'hidden',
                cursor: 'pointer', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                border: activeIdx === i ? '2px solid #E31937' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: activeIdx === i ? '0 20px 40px rgba(227,25,55,0.25)' : 'none'
              }}
            >
              <Image src={img.src} alt={img.title} fill style={{ objectFit: 'cover' }} quality={85} />
              <div style={{ position: 'absolute', inset: 0, background: activeIdx === i ? 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)' : 'rgba(0,0,0,0.65)', transition: 'background 0.4s' }} />

              <div style={{
                position: 'absolute',
                bottom: isMobile ? 'auto' : '24px',
                top: isMobile && activeIdx !== i ? '50%' : 'auto',
                transform: isMobile && activeIdx !== i ? 'translateY(-50%)' : 'none',
                bottom: isMobile && activeIdx === i ? '20px' : 'auto',
                left: isMobile ? '20px' : '24px',
                right: isMobile ? '20px' : '24px',
                zIndex: 5,
                opacity: activeIdx === i ? 1 : 0.65,
                transition: 'opacity 0.4s',
                display: isMobile && activeIdx !== i ? 'flex' : 'block',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div style={{
                  width: isMobile ? (activeIdx === i ? '120px' : '100px') : '140px',
                  height: isMobile ? (activeIdx === i ? '32px' : '28px') : '36px',
                  marginBottom: isMobile && activeIdx !== i ? '0' : '10px'
                }}>{img.logo.svg}</div>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: isMobile ? (activeIdx === i ? '18px' : '13px') : (activeIdx === i ? '24px' : '15px'),
                  fontWeight: 900,
                  color: '#fff',
                  textTransform: 'uppercase',
                  transition: 'font-size 0.4s',
                  margin: 0
                }}>
                  {img.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 6. IMAGE ANIMATION SECTION 6: Lens Glass Magnifier Inspector
// ───────────────────────────────────────────────────────────────────
export function ImageLensMagnifier() {
  const containerRef = useRef(null);
  const lensRef = useRef(null);
  const magnifiedImgRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    gsap.to(lensRef.current, {
      left: x, top: y, duration: 0.1, ease: 'power1.out'
    });

    const zoom = 2.5;
    gsap.to(magnifiedImgRef.current, {
      left: -x * zoom + 80,
      top: -y * zoom + 80,
      duration: 0.1, ease: 'power1.out'
    });
  };

  return (
    <section style={{ padding: '100px 0', background: '#050505', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '3px', fontWeight: 800, color: '#E31937', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            ✦ REBAR & SLAB INSPECTOR
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>
            Inspect Concrete Density & Prep
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', marginTop: '8px' }}>
            Hover mouse over the image to activate 2.5x optical zoom lens.
          </p>
        </div>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', cursor: 'crosshair' }}
        >
          <Image src="/images/before-warehouse-rebar.png" alt="Rebar Grid Inspection" fill style={{ objectFit: 'cover' }} quality={90} />

          <div
            ref={lensRef}
            style={{
              position: 'absolute', width: '180px', height: '180px', borderRadius: '50%',
              border: '3px solid #E31937', boxShadow: '0 0 30px rgba(227,25,55,0.5)',
              transform: 'translate(-50%, -50%)', pointerEvents: 'none', overflow: 'hidden', zIndex: 10
            }}
          >
            <div
              ref={magnifiedImgRef}
              style={{ position: 'absolute', width: '3000px', height: '1200px' }}
            >
              <Image src="/images/before-warehouse-rebar.png" alt="Rebar Grid Magnified" fill style={{ objectFit: 'cover' }} quality={100} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 7. IMAGE ANIMATION SECTION 7: Tunnel Scroll Zoom Burst
// ───────────────────────────────────────────────────────────────────
export function ImageTunnelZoom() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top', end: '+=150%',
          pin: true, scrub: 1
        }
      });

      tl.to('.tunnel-img-1', { scale: 3, opacity: 0, ease: 'power2.in' }, 0)
        .fromTo('.tunnel-img-2', { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power2.out' }, 0.3)
        .to('.tunnel-text', { y: -30, opacity: 1, ease: 'power2.out' }, 0.5);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: '100vh', width: '100%', background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="tunnel-img-1" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Image src="/images/hero-bg.png" alt="West Texas Concrete Background" fill style={{ objectFit: 'cover' }} quality={85} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      </div>

      <div className="tunnel-img-2" style={{ position: 'absolute', width: '70%', height: '70%', borderRadius: '32px', overflow: 'hidden', border: '2px solid #E31937', zIndex: 2, boxShadow: '0 0 80px rgba(227,25,55,0.4)' }}>
        <Image src="/images/after-driveway-finished.png" alt="Polished Driveway" fill style={{ objectFit: 'cover' }} quality={90} />
      </div>

      <div className="tunnel-text" style={{ position: 'relative', zIndex: 3, textAlign: 'center', opacity: 0, transform: 'translateY(30px)' }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '3px', fontWeight: 800, color: '#E31937', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
          ✦ STRUCTURAL INTEGRITY
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>
          Deep Structural Integrity
        </h2>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 8. IMAGE ANIMATION SECTION 8: Hover Motion Trail / Cursor Follower
// ───────────────────────────────────────────────────────────────────
export function ImageCursorFollower() {
  const sectionRef = useRef(null);
  const floatRef = useRef(null);
  const [activeImg, setActiveImg] = useState('/images/commercial-warehouse.png');
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      if (!floatRef.current) return;
      gsap.to(floatRef.current, {
        x: e.clientX - 190,
        y: e.clientY - 125,
        duration: 0.35, ease: 'power2.out'
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{ padding: '100px 0', background: '#080808', position: 'relative', overflow: 'hidden' }}
    >
      {!isMobile && (
        <div
          ref={floatRef}
          style={{
            position: 'fixed', top: 0, left: 0, width: '380px', height: '250px',
            borderRadius: '20px', overflow: 'hidden', border: '2px solid #E31937',
            pointerEvents: 'none', zIndex: 99,
            boxShadow: '0 30px 70px rgba(227, 25, 55, 0.45), 0 10px 30px rgba(0,0,0,0.9)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <Image src={activeImg} alt="Preview" fill style={{ objectFit: 'cover' }} quality={90} />
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '3px', fontWeight: 800, color: '#E31937', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            ✦ WORKMANSHIP PREVIEW
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>
            Explore Our Partner Projects
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {builderLogos.map((b) => (
            <div
              key={b.id}
              onMouseEnter={() => !isMobile && setActiveImg(b.img)}
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px', padding: isMobile ? '20px' : '24px 32px', display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'space-between', gap: isMobile ? '12px' : '24px',
                cursor: 'pointer', transition: 'border-color 0.3s'
              }}
            >
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '12px' : '24px', width: isMobile ? '100%' : 'auto' }}>
                <div style={{ width: '130px', height: '36px', flexShrink: 0 }}>{b.svg}</div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '16px' : '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>{b.name}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '12px' : '14px', color: '#E31937', letterSpacing: '2px', fontWeight: 800, alignSelf: isMobile ? 'flex-end' : 'auto' }}>{b.badge} →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// 9. IMAGE ANIMATION SECTION 9: Isometric Builder Project Showcase
// ───────────────────────────────────────────────────────────────────
export function ImageIsometricGrid() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Gentle scroll-triggered 3D plane tilt
      gsap.fromTo(gridRef.current,
        { rotateX: 20, rotateZ: -4, scale: 0.92 },
        {
          rotateX: 6, rotateZ: -1, scale: 1, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );

      // 2. Staggered float-in animation for cards
      gsap.fromTo('.iso-card',
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      );

      // 3. Continuous gentle floating physics for cards
      gsap.utils.toArray('.iso-card').forEach((card, i) => {
        gsap.to(card, {
          y: (i % 2 === 0 ? '-=8' : '+=8'),
          duration: 2.5 + (i % 3) * 0.4,
          repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.15
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!sectionRef.current || !gridRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    gsap.to(gridRef.current, {
      rotateY: x * 8,
      rotateX: 8 - y * 6,
      duration: 0.5, ease: 'power2.out', overwrite: 'auto'
    });
  };

  const handleCardMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.1, zIndex: 30, z: 40,
      borderColor: '#E31937',
      boxShadow: '0 30px 70px rgba(227, 25, 55, 0.5)',
      duration: 0.35, ease: 'back.out(1.5)', overwrite: 'auto'
    });
  };

  const handleCardMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1, zIndex: 1, z: 0,
      borderColor: 'rgba(227,25,55,0.2)',
      boxShadow: '0 30px 60px rgba(0,0,0,0.9)',
      duration: 0.35, ease: 'power2.out', overwrite: 'auto'
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="iso-section"
      style={{ padding: '120px 0', background: '#000', overflow: 'hidden', perspective: '1200px' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '3px', fontWeight: 800, color: '#E31937', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            ✦ ISOMETRIC SHOWCASE
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '12px' }}>
            Isometric Structural Layout
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', margin: '0 auto', maxWidth: '540px' }}>
            Move your cursor or scroll to rotate the 3D isometric structural field in real time.
          </p>
        </div>

        <div
          ref={gridRef}
          style={{
            transform: 'rotateX(8deg) rotateZ(-2deg)',
            transformStyle: 'preserve-3d',
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px',
            willChange: 'transform'
          }}
        >
          {[
            { img: '/images/project-commercial-floor.png', logo: builderLogos[0] },
            { img: '/images/residential-driveway.png', logo: builderLogos[1] },
            { img: '/images/after-warehouse-slab.png', logo: builderLogos[2] },
            { img: '/images/stamped-pool-deck.png', logo: builderLogos[3] },
            { img: '/images/before-commercial-subgrade.png', logo: builderLogos[4] },
            { img: '/images/commercial-laser-screed.png', logo: builderLogos[5] }
          ].map((item, idx) => (
            <div
              key={idx}
              className="iso-card"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              style={{
                background: '#0a0a0a', border: '1px solid rgba(227,25,55,0.2)', borderRadius: '20px',
                padding: '18px', boxShadow: '0 30px 60px rgba(0,0,0,0.9)', cursor: 'pointer',
                transformStyle: 'preserve-3d', transition: 'border-color 0.3s'
              }}
            >
              <div style={{ position: 'relative', height: '240px', borderRadius: '14px', overflow: 'hidden', marginBottom: '14px' }}>
                <Image src={item.img} alt="Isometric Project" fill style={{ objectFit: 'cover' }} quality={85} />
              </div>
              <div style={{ width: '140px', height: '36px' }}>{item.logo.svg}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



// ───────────────────────────────────────────────────────────────────
// 11. IMAGE ANIMATION SECTION 11: Dynamic GSAP Card Shuffle Deck
// ───────────────────────────────────────────────────────────────────
export function ImageStackShuffle() {
  const sectionRef = useRef(null);
  const deckRef = useRef(null);
  const [cards, setCards] = useState([0, 1, 2, 3, 4]);
  const [animating, setAnimating] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray('.shuffle-deck-card');
      const total = cardEls.length;

      // Pin section and throw cards one by one on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.5
        }
      });

      cardEls.forEach((card, i) => {
        if (i < total - 1) {
          // Throw current top card to the right and fade out as scroll progresses
          tl.to(card, {
            x: isMobile ? 290 : 380,
            rotateZ: 30,
            opacity: 0,
            scale: 0.85,
            ease: 'power2.inOut',
            duration: 1
          }, i * 1.2);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleShuffle = () => {
    if (animating) return;
    setAnimating(true);

    setCards(prev => {
      const arr = [...prev];
      const first = arr.shift();
      arr.push(first);
      return arr;
    });

    setTimeout(() => {
      setAnimating(false);
    }, 400);
  };

  return (
    <section ref={sectionRef} style={{ position: 'relative', minHeight: '100vh', padding: '80px 0', background: '#000', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', textAlign: 'center', width: '100%' }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '3px', fontWeight: 800, color: '#E31937', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
          ✦ FEATURED BUILDER DECK
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '16px' }}>
          Shuffle Featured Projects
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', margin: '0 auto 48px', maxWidth: '540px' }}>
          Scroll down or click the deck to throw project cards and explore our work.
        </p>

        <div
          ref={deckRef}
          onClick={handleShuffle}
          style={{ position: 'relative', height: isMobile ? '380px' : '460px', width: isMobile ? '280px' : '350px', margin: '0 auto', cursor: 'pointer', perspective: '1000px' }}
        >
          {cards.map((idx, pos) => {
            const b = builderLogos[idx % builderLogos.length];
            const isTop = pos === 0;

            return (
              <div
                key={b.id}
                className="shuffle-deck-card"
                style={{
                  position: 'absolute', inset: 0, borderRadius: '24px', overflow: 'hidden',
                  border: isTop ? '2px solid #E31937' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: isTop ? '0 30px 60px rgba(227,25,55,0.3)' : '0 20px 40px rgba(0,0,0,0.8)',
                  transform: `translateY(${pos * 14}px) scale(${1 - pos * 0.05}) rotate(${pos % 2 === 0 ? pos * 2.5 : -pos * 2.5}deg)`,
                  transition: 'transform 0.4s ease-out',
                  zIndex: 10 - pos,
                  filter: isTop ? 'brightness(1)' : `brightness(${0.7 - pos * 0.1})`
                }}
              >
                <Image src={b.img} alt={b.name} fill style={{ objectFit: 'cover' }} quality={85} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', textAlign: 'left' }}>
                  <div style={{ width: '140px', height: '36px', marginBottom: '10px' }}>{b.svg}</div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: '#E31937', textTransform: 'uppercase', display: 'block' }}>{b.badge}</span>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: '4px 0 0' }}>{b.name}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// Master Export
// ───────────────────────────────────────────────────────────────────
export default function ImageGSAPAnimations() {
  return (
    <>
      <ImageClipPathUnveil />
      <Image3DDepthStack />
      <ImageCurtainSplit />
      <ImageFloatingOrbit />
      <ImageExpandGrid />
      <ImageLensMagnifier />
      <ImageTunnelZoom />
      <ImageCursorFollower />
      <ImageIsometricGrid />
      <ImageStackShuffle />
    </>
  );
}
