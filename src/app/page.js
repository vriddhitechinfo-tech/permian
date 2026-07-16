'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Testimonials from './components/Testimonials/Testimonials';
import FAQ from './components/FAQ/FAQ';

const HERO_HEADLINES = [
  {
    line: 'BUILDING FOUNDATIONS OF WEST TEXAS.',
    sub: 'Under Alonso Cardenas, Permian Concrete delivers industrial-strength foundations, slabs, and driveways across Midland-Odessa.',
    img: '/images/hero-bg.png',
  },
  {
    line: 'PRECISION COMMERCIAL SLABS.',
    sub: 'Flat, durable, laser-screed concrete floors engineered for heavy truck parking lots, shops, and warehouses.',
    img: '/images/project-commercial-floor.png',
  },
  {
    line: 'RESIDENTIAL POURS BUILT TO LAST.',
    sub: 'Driveways, patios, and sidewalks compacted and reinforced specifically for West Texas soil conditions.',
    img: '/images/residential-driveway.png',
  },
];

const TICKER_COMPANIES = [
  'Basin Logistics Hub',
  'Midland Energy Slabs',
  'Odessa Warehousing',
  'West Texas Hauling Slabs',
  'Tri-State Concrete Supply',
  'Caliche Grade Builders',
];

const WHY_CARDS = [
  {
    title: 'Local Soil Expertise',
    desc: 'West Texas caliche and sand shift constantly. We grade and compact base structures to prevent cracking.',
    icon: '🌾',
  },
  {
    title: 'Premium Mix Designs',
    desc: 'We pour custom-blended mixes (3,000 to 4,500+ PSI) reinforced with rebar and fiber for high loads.',
    icon: '🚛',
  },
  {
    title: 'Laser-Screed Leveling',
    desc: 'Our commercial screeding tools ensure flat, level surfaces that prevent pooling and load variance.',
    icon: '📐',
  },
  {
    title: 'Workmanship Warranty',
    desc: 'Alonso stands behind every yard of concrete poured. We guarantee our structural concrete layouts.',
    icon: '🛡️',
  },
];

const SLAB_LAYERS = [
  {
    layer: 'Layer 5: Hydration Sealing',
    desc: 'Liquid chemical curing sealer sprayed immediately after finishing. Locks in moisture to double curing strength.',
    img: '/images/project-patio.png',
  },
  {
    layer: 'Layer 4: Reinforced Concrete Mix',
    desc: 'High-strength cement (3500 - 4500 PSI) with integrated fiber reinforcement for high load capacity.',
    img: '/images/project-foundation.png',
  },
  {
    layer: 'Layer 3: Steel Rebar Matrix',
    desc: 'Grade-60 steel rebar grid tied on high chairs, positioned in the center of the pour to take tensile stress.',
    img: '/images/project-sidewalk.png',
  },
  {
    layer: 'Layer 2: Vapor Barrier (10-mil)',
    desc: 'Heavy-duty polyethylene sheeting that blocks moisture rising from the soil, protecting subgrades.',
    img: '/images/hero-bg.png',
  },
  {
    layer: 'Layer 1: Compacted Caliche Base',
    desc: 'West Texas caliche base spread and compacted to 98% density to create a stable foundation.',
    img: '/images/commercial-warehouse.png',
  },
];

const CAPABILITIES = [
  { title: 'Driveways', desc: 'Custom residential drives, stamped borders, truck pads.', img: '/images/residential-driveway.png' },
  { title: 'Warehouse Slabs', desc: 'Industrial flat floors, laser screeded, joint cuts.', img: '/images/commercial-warehouse.png' },
  { title: 'Parking Lots', desc: 'Heavy duty concrete parking areas for commercial stores.', img: '/images/project-commercial-floor.png' },
  { title: 'Foundations', desc: 'Slabs for metal buildings, custom homes, and expansions.', img: '/images/project-foundation.png' },
  { title: 'Patios & Sidewalks', desc: 'Stamped aggregate walks, steps, ADA ramps, and patios.', img: '/images/project-patio.png' },
  { title: 'Site Drainage & Curbs', desc: 'Concrete curbs, flowlines, and retention basins.', img: '/images/project-sidewalk.png' },
];

const SERVICE_AREAS = [
  { city: 'Midland, TX', desc: 'Core service area. Commercial and residential pours.' },
  { city: 'Odessa, TX', desc: 'Heavy industrial shop slabs and residential patios.' },
  { city: 'Andrews, TX', desc: 'Oilfield equipment pads and yard concrete slabs.' },
  { city: 'Stanton, TX', desc: 'Metal building foundations and farm pathways.' },
  { city: 'Monahans, TX', desc: 'Sand-resilient commercial slab grading and pouring.' },
  { city: 'Big Spring, TX', desc: 'ADA-compliant concrete curbs and driveway expansions.' },
];

const MIX_SPECS = [
  { psi: '3,000 PSI', use: 'Residential Walkways & Patios', feature: 'Smooth finish, standard foot traffic strength' },
  { psi: '3,500 PSI', use: 'Standard Driveways & Garage Floors', feature: 'Pickup truck loading capacity, moderate wear resistance' },
  { psi: '4,000 PSI', use: 'Commercial Parking Lots & Shop Slabs', feature: 'Heavy equipment loading, caliche-base optimized' },
  { psi: '4,500+ PSI', use: 'Industrial Warehouse Floors & Machine Pads', feature: 'Extreme structural density, fiber mesh integrated' },
];

const THEM_LIST = [
  'No-show crews and missed deadlines',
  'Inconsistent mixes, poor curing practices',
  'Surprise charges after the job starts',
  'One-size-fits-all solutions',
  'No warranty, no accountability',
  'You chase them for updates',
];

const US_LIST = [
  'Show up on time, every time — guaranteed',
  'Premium-grade concrete, precision mixed for West Texas soil',
  'Fixed, transparent quotes before work begins',
  'Custom solutions for each soil condition and use case',
  'Every project backed by workmanship warranty',
  'Weekly updates — you\'re always in the loop',
];

export default function HomePage() {
  const [activeHero, setActiveHero] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  
  // Interactive volume calculator state
  const [length, setLength] = useState(30);
  const [width, setWidth] = useState(20);
  const [thickness, setThickness] = useState(4);
  const [volume, setVolume] = useState(0);
  const [truckloads, setTruckloads] = useState(0);

  // Before & After slider position
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef(null);

  // Stats values
  const [stats, setStats] = useState({ yards: 0, foundations: 0, rating: 0, projects: 0 });

  // Handle calculator volume
  useEffect(() => {
    const vol = (length * width * (thickness / 12)) / 27;
    setVolume(vol.toFixed(1));
    setTruckloads(Math.ceil(vol / 9)); // 1 concrete mixer holds ~9-10 yards
  }, [length, width, thickness]);

  // Auto cycle hero backdrop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % HERO_HEADLINES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // GSAP scroll reveals
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        // Entrance animation
        gsap.fromTo('.hero-text-item',
          { y: 55, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' }
        );

        // Stats counter animation
        ScrollTrigger.create({
          trigger: '.stats-section-box',
          start: 'top 80%',
          onEnter: () => {
            const counts = { y: 0, f: 0, r: 0, p: 0 };
            gsap.to(counts, {
              y: 45000,
              f: 850,
              r: 100,
              p: 1200,
              duration: 2.5,
              ease: 'power2.out',
              onUpdate: () => {
                setStats({
                  yards: Math.floor(counts.y),
                  foundations: Math.floor(counts.f),
                  rating: Math.floor(counts.r),
                  projects: Math.floor(counts.p),
                });
              }
            });
          }
        });

        // Word reveal for headings
        gsap.utils.toArray('.reveal-heading').forEach((h) => {
          const words = h.innerText.split(' ');
          h.innerHTML = words.map(w => `<span class="reveal-word" style="display:inline-block; margin-right:0.25em;">${w}</span>`).join(' ');
          gsap.fromTo(h.querySelectorAll('.reveal-word'),
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
              scrollTrigger: { trigger: h, start: 'top 85%' }
            }
          );
        });

        // Stagger list reveals
        gsap.utils.toArray('.stagger-container').forEach((cont) => {
          gsap.fromTo(cont.querySelectorAll('.stagger-item'),
            { y: 35, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: cont, start: 'top 80%' }
            }
          );
        });
      });
    }
  }, []);

  // Handle before/after slide drag
  const handleSliderMove = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    if (!x) return;
    const offset = x - rect.left;
    let percentage = (offset / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  return (
    <>
      <style jsx global>{`
        /* Bouncing Arrow */
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .bouncing-arrow { animation: arrowBounce 1.4s ease-in-out infinite; }

        /* Client marquee */
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scrollMarquee 28s linear infinite;
        }

        /* Image hover zooms */
        .img-zoom-hover {
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .img-zoom-parent:hover .img-zoom-hover {
          transform: scale(1.05);
        }

        /* Overlay text styles */
        .before-after-label {
          position: absolute;
          top: 16px;
          background: rgba(0, 0, 0, 0.85);
          color: #fff;
          font-family: var(--font-heading);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 4px;
          z-index: 5;
        }
      `}</style>

      {/* SECTION 1: HERO (Big construction backdrop slider) */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#000000',
        overflow: 'hidden',
        padding: '120px 0 80px'
      }}>
        {/* Background Image with crossfade */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          {HERO_HEADLINES.map((h, i) => (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              opacity: activeHero === i ? 0.38 : 0,
              transition: 'opacity 1s ease-in-out',
            }}>
              <Image src={h.img} alt="Concrete construction Midland TX" fill style={{ objectFit: 'cover' }} priority={i === 0} quality={85} />
            </div>
          ))}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.95))',
          }} />
        </div>

        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '780px' }}>
            {/* Eyebrow */}
            <div className="hero-text-item" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <span className="bouncing-arrow" style={{ color: '#E31937', fontWeight: 900 }}>↓</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 900, letterSpacing: '3px', color: '#E31937', textTransform: 'uppercase' }}>
                Alonso Cardenas · Permian Basin Contractor
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-text-item" style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, color: '#ffffff',
              marginBottom: '24px', letterSpacing: '-1px'
            }}>
              {HERO_HEADLINES[activeHero].line}
            </h1>

            {/* Subtext */}
            <p className="hero-text-item" style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
              lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: '40px', maxWidth: '580px'
            }}>
              {HERO_HEADLINES[activeHero].sub}
            </p>

            {/* Indicators */}
            <div className="hero-text-item" style={{ display: 'flex', gap: '10px', marginBottom: '40px' }}>
              {HERO_HEADLINES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveHero(i)}
                  style={{
                    width: '32px', height: '3px',
                    background: activeHero === i ? '#E31937' : 'rgba(255,255,255,0.2)',
                    border: 'none', cursor: 'pointer', transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-text-item" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link href="/contact" style={{
                padding: '16px 36px', borderRadius: '40px', background: '#E31937', color: '#ffffff',
                fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, textDecoration: 'none',
                boxShadow: '0 8px 30px rgba(227, 25, 55, 0.45)', transition: 'transform 0.2s'
              }}>
                Book a Free Estimate →
              </Link>
              <Link href="/projects" style={{
                padding: '16px 36px', borderRadius: '40px', border: '1px solid rgba(255, 255, 255, 0.25)',
                background: 'rgba(255, 255, 255, 0.05)', color: '#ffffff', fontFamily: 'var(--font-body)',
                fontSize: '1rem', fontWeight: 600, textDecoration: 'none', backdropFilter: 'blur(10px)',
                transition: 'all 0.2s'
              }}>
                View Completed Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INDUSTRY QUICK LINKS */}
      <section style={{ padding: '40px 0', background: '#080808', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="quick-links-grid">
          {[
            { title: 'RESIDENTIAL SLABS', desc: 'Driveways, patios, aggregate walkways.', path: '/services' },
            { title: 'COMMERCIAL SLABS', desc: 'Foundations, laser flat floors, shop yards.', path: '/services' },
            { title: 'SAW CUTTING & PREP', desc: 'Base compaction, grading, and joint cutting.', path: '/process' }
          ].map((item, idx) => (
            <Link key={idx} href={item.path} style={{
              display: 'flex', flexDirection: 'column', padding: '24px', borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.05)', background: '#000000', textDecoration: 'none',
              transition: 'border-color 0.25s'
            }} className="btn-hover-scale">
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 900, color: '#E31937', marginBottom: '8px' }}>{item.title}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: 'rgba(255,255,255,0.5)' }}>{item.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: CLIENT TICKER */}
      <section style={{ padding: '40px 0', background: '#000000', borderBottom: '1px solid rgba(255,255,255,0.03)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
          <div className="marquee-track">
            {[...TICKER_COMPANIES, ...TICKER_COMPANIES].map((comp, idx) => (
              <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', padding: '0 40px' }}>
                <span style={{
                  fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                  fontWeight: 900, textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.15)',
                  letterSpacing: '1px'
                }}>{comp}</span>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#E31937', opacity: 0.5 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: KEY STATS GRID (Scroll Counters) */}
      <section className="stats-section-box" style={{ padding: '80px 0', background: '#000000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            background: '#080808', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px',
            padding: '40px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px'
          }} className="stats-row-grid">
            {[
              { val: stats.yards, suffix: '+', label: 'CUBIC YARDS POURED', desc: 'Across Midland-Odessa' },
              { val: stats.foundations, suffix: '+', label: 'FOUNDATIONS GRADE', desc: 'Metal buildings & residential' },
              { val: stats.rating, suffix: '%', label: 'CUSTOMER RATING', desc: 'Workmanship guaranteed' },
              { val: stats.projects, suffix: '+', label: 'COMPLETED JOBS', desc: 'Home and commercial sites' }
            ].map((st, idx) => (
              <div key={idx} style={{
                textAlign: 'center', display: 'flex', flexDirection: 'column',
                borderRight: idx < 3 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
              }} className="stats-col-box">
                <span style={{
                  fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
                  fontWeight: 900, color: '#E31937', lineHeight: 1, marginBottom: '8px'
                }}>
                  {st.val.toLocaleString()}{st.suffix}
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 900, color: '#ffffff', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  {st.label}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.4)' }}>
                  {st.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: ABOUT ALONSO & TEAM (Image block) */}
      <section style={{ padding: '100px 0', background: '#080808' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="about-crew-grid">
          {/* Left image */}
          <div className="img-zoom-parent" style={{ position: 'relative', height: '480px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Image src="/images/about-team.png" alt="Alonso Cardenas Concrete Crew Midland" fill style={{ objectFit: 'cover' }} className="img-zoom-hover" quality={85} />
            <div style={{
              position: 'absolute', bottom: '24px', left: '24px', right: '24px',
              background: 'rgba(0, 0, 0, 0.85)', padding: '20px', borderRadius: '12px',
              border: '1px solid rgba(227, 25, 55, 0.3)'
            }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', margin: '0 0 4px' }}>Alonso Cardenas</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#E31937', margin: 0, fontWeight: 700 }}>Owner & Field Operations Lead</p>
            </div>
          </div>

          {/* Right Info */}
          <div className="stagger-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="stagger-item" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1px solid #E31937', borderRadius: '999px', padding: '6px 18px',
              marginBottom: '20px', color: '#E31937', fontSize: '11px',
              fontFamily: 'var(--font-heading)', letterSpacing: '2px', textTransform: 'uppercase',
            }}>
              ✦ About Alonso's Team
            </div>
            <h2 className="reveal-heading" style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', textTransform: 'uppercase',
              color: '#ffffff', letterSpacing: '1px', marginBottom: '24px', lineHeight: 1.15
            }}>
              Midland-Odessa's Trusted Concrete Crew.
            </h2>
            <p className="stagger-item" style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.75, marginBottom: '24px' }}>
              We understand building in the Permian Basin isn't like anywhere else. From high-heat hydration timelines to the dry sand and demanding caliche soil layers, our pours are calculated to stand up to the severe West Texas climate.
            </p>
            <p className="stagger-item" style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.75, marginBottom: '32px' }}>
              Alonso personally inspects grading slopes, rebar layouts, and mix delivery times for every commercial shop floor and driveway we pour. We don't skip steps.
            </p>
            <Link className="stagger-item" href="/contact" style={{
              padding: '14px 28px', borderRadius: '40px', background: '#E31937', color: '#ffffff',
              fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none',
              transition: 'transform 0.2s', boxShadow: '0 6px 20px rgba(227, 25, 55, 0.2)'
            }}>
              Speak with Alonso →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: INTERACTIVE SLAB LAYER VISUALIZER */}
      <section style={{ padding: '100px 0', background: '#000000', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 className="reveal-heading" style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', textTransform: 'uppercase',
              color: '#ffffff', letterSpacing: '1px'
            }}>
              Concrete Layer Specifications
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '580px', margin: '12px auto 0', lineHeight: 1.6 }}>
              A premium concrete slab is only as good as the layers underneath it. Hover over each layer below to see how we prepare our pours.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '64px', alignItems: 'center' }} className="layer-grid-box">
            {/* Left lists */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {SLAB_LAYERS.map((layer, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveLayer(idx)}
                  style={{
                    padding: '24px', borderRadius: '16px',
                    border: activeLayer === idx ? '1px solid #E31937' : '1px solid rgba(255, 255, 255, 0.05)',
                    background: activeLayer === idx ? 'rgba(227, 25, 55, 0.03)' : 'rgba(255, 255, 255, 0.01)',
                    cursor: 'pointer', transition: 'all 0.3s'
                  }}
                >
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 900, color: activeLayer === idx ? '#ffffff' : 'rgba(255,255,255,0.6)', textTransform: 'uppercase', margin: '0 0 8px' }}>
                    {layer.layer}
                  </h4>
                  {activeLayer === idx && (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.02rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>
                      {layer.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Right dynamic image */}
            <div style={{ position: 'relative', height: '400px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              {SLAB_LAYERS.map((layer, idx) => (
                <div key={idx} style={{
                  position: 'absolute', inset: 0,
                  opacity: activeLayer === idx ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}>
                  <Image src={layer.img} alt={layer.layer} fill style={{ objectFit: 'cover' }} quality={80} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent 70%)'
                  }} />
                  <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#E31937', fontWeight: 700 }}>// permian.spec.verification</span>
                    <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: '6px 0 0' }}>Layer {5 - idx} Active</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CORE CONCRETE CAPABILITIES (Grid with image overlays) */}
      <section style={{ padding: '100px 0', background: '#080808' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 className="reveal-heading" style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', textTransform: 'uppercase',
              color: '#ffffff', letterSpacing: '1px'
            }}>
              Our Core Capabilities
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '580px', margin: '12px auto 0', lineHeight: 1.6 }}>
              Whether you need commercial slab prep or a new stamped concrete driveway, Alonso's crew has the heavy machinery and skills.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="capabilities-grid">
            {CAPABILITIES.map((cap, idx) => (
              <div key={idx} className="img-zoom-parent" style={{
                position: 'relative', height: '280px', borderRadius: '16px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer'
              }}>
                <Image src={cap.img} alt={cap.title} fill style={{ objectFit: 'cover' }} className="img-zoom-hover" quality={80} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)'
                }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {cap.title}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.98rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, margin: 0 }}>
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: BEFORE & AFTER SLIDER (Interactive drag) */}
      <section style={{ padding: '100px 0', background: '#000000', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="reveal-heading" style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', textTransform: 'uppercase',
              color: '#ffffff', letterSpacing: '1px'
            }}>
              Before & After Pour Slider
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '580px', margin: '12px auto 0', lineHeight: 1.6 }}>
              Drag the center slider line left or right to see a site prepared with forms vs. the final finished concrete slab.
            </p>
          </div>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            onMouseMove={handleSliderMove}
            onTouchMove={handleSliderMove}
            style={{
              position: 'relative', width: '100%', height: '480px', borderRadius: '16px',
              overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {/* Before (Caliche/Forming) */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <Image src="/images/commercial-warehouse.png" alt="Caliche site prep before concrete pour" fill style={{ objectFit: 'cover' }} quality={85} />
              <span className="before-after-label" style={{ left: '16px' }}>Site Grading & Forms</span>
            </div>

            {/* After (Poured Concrete) */}
            <div style={{
              position: 'absolute', inset: '0 y', left: 0, top: 0, bottom: 0,
              width: `${sliderPosition}%`, zIndex: 2, overflow: 'hidden',
              transition: 'width 0.1s ease-out'
            }}>
              <div style={{ position: 'absolute', width: '100%', height: '480px', minWidth: '936px' }}>
                <Image src="/images/project-foundation.png" alt="Finished structural concrete foundation slab" fill style={{ objectFit: 'cover' }} quality={85} />
                <span className="before-after-label" style={{ right: '16px' }}>Finished Pour</span>
              </div>
            </div>

            {/* Slider bar */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: `${sliderPosition}%`,
              width: '4px', background: '#E31937', zIndex: 3, cursor: 'ew-resize',
              boxShadow: '0 0 10px rgba(227, 25, 55, 0.8)', transition: 'left 0.1s ease-out'
            }}>
              {/* Handle thumb */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '32px', height: '32px', borderRadius: '50%', background: '#E31937',
                border: '4px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '10px', fontWeight: 900
              }}>
                ◀▶
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: CUSTOM CONCRETE VOLUME CALCULATOR */}
      <section style={{ padding: '100px 0', background: '#080808' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '64px', alignItems: 'center' }} className="calc-grid-box">
          {/* Left panel info */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1px solid #E31937', borderRadius: '999px', padding: '6px 18px',
              marginBottom: '20px', color: '#E31937', fontSize: '11px',
              fontFamily: 'var(--font-heading)', letterSpacing: '2px', textTransform: 'uppercase',
            }}>
              📊 Concrete Calculator
            </div>
            <h2 className="reveal-heading" style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', textTransform: 'uppercase',
              color: '#ffffff', letterSpacing: '1px', marginBottom: '24px'
            }}>
              Calculate Your Pour Volume
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.7, marginBottom: '24px' }}>
              Estimate the volume of concrete required for your slab in cubic yards. Fill in the dimensions of your pour area, and get truckloads instantly.
            </p>
            <div style={{
              padding: '24px', borderRadius: '16px', background: '#000000',
              border: '1px solid rgba(227, 25, 55, 0.2)'
            }}>
              <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#E31937', margin: '0 0 8px' }}>// output.results</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)' }}>Total Volume:</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 900, color: '#fff' }}>{volume} Cubic Yards</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)' }}>Est. Mixer Trucks:</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 900, color: '#E31937' }}>{truckloads} Truck(s)</span>
              </div>
            </div>
          </div>

          {/* Right Inputs Card */}
          <div style={{
            background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '24px', padding: '40px', backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Length */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Length (Feet)</label>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#fff' }}>{length} ft</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  style={{ accentColor: '#E31937', cursor: 'pointer' }}
                />
              </div>

              {/* Width */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Width (Feet)</label>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#fff' }}>{width} ft</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  style={{ accentColor: '#E31937', cursor: 'pointer' }}
                />
              </div>

              {/* Thickness */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Slab Thickness</label>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#fff' }}>{thickness} Inches</span>
                </div>
                <select
                  value={thickness}
                  onChange={(e) => setThickness(Number(e.target.value))}
                  style={{
                    background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px', padding: '12px 14px', color: '#fff', outline: 'none'
                  }}
                >
                  <option value={4}>4" (Standard driveways, walks)</option>
                  <option value={6}>6" (Commercial shop slabs, heavy pickups)</option>
                  <option value={8}>8" (Industrial warehouse yards, machinery)</option>
                  <option value={10}>10" (Extreme loading flow basins)</option>
                </select>
              </div>

              <Link href={`/contact?yards=${volume}`} style={{
                padding: '16px', borderRadius: '12px', background: '#E31937', color: '#fff',
                fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, textTransform: 'uppercase',
                textAlign: 'center', textDecoration: 'none', transition: 'box-shadow 0.2s', letterSpacing: '1px'
              }} className="btn-hover-scale">
                Request Quote for this Volume
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: MIX SPECIFICATIONS GRID (Construction Data) */}
      <section style={{ padding: '100px 0', background: '#000000', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 className="reveal-heading" style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', textTransform: 'uppercase',
              color: '#ffffff', letterSpacing: '1px'
            }}>
              Our Core Concrete Mix Designs
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '580px', margin: '12px auto 0', lineHeight: 1.6 }}>
              We pour exact aggregate-to-cement ratios depending on the structural purpose of your slab. Look at our specs:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="mix-specs-grid">
            {MIX_SPECS.map((spec, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '20px', padding: '32px 24px', display: 'flex', flexDirection: 'column'
              }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#E31937', marginBottom: '16px' }}>
                  {spec.psi}
                </span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {spec.use}
                </h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.96rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: 0 }}>
                  {spec.feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: QUALITY PROMISE BANNER (High-quality background) */}
      <section style={{
        position: 'relative', padding: '140px 0', background: '#000000',
        overflow: 'hidden', display: 'flex', alignItems: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.25 }}>
          <Image src="/images/project-commercial-floor.png" alt="Permian Basin concrete finishing" fill style={{ objectFit: 'cover' }} quality={80} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 20%, #000000 90%)' }} />
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h2 className="reveal-heading" style={{
            fontFamily: 'var(--font-heading)', fontWeight: 900,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', textTransform: 'uppercase',
            color: '#ffffff', letterSpacing: '1px', marginBottom: '24px'
          }}>
            Every Batch Inspected. Every Yard Guaranteed.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.8, marginBottom: '32px' }}>
            We monitor the water-to-cement ratios at batch plant dispatch down to the minute. In the dry West Texas wind, hydration curing requires immediate response. Alonso's crew handles the chemistry, layout, and saw-cutting correctly.
          </p>
          <div style={{ width: '40px', height: '2px', background: '#E31937', margin: '0 auto' }} />
        </div>
      </section>

      {/* SECTION 12: SAFETY & OSHA COMPLIANCE */}
      <section style={{ padding: '80px 0', background: '#080808', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="safety-grid-box">
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1px solid #E31937', borderRadius: '999px', padding: '6px 18px',
              marginBottom: '20px', color: '#E31937', fontSize: '11px',
              fontFamily: 'var(--font-heading)', letterSpacing: '2px', textTransform: 'uppercase',
            }}>
              🛡️ Safety Operations
            </div>
            <h2 className="reveal-heading" style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', textTransform: 'uppercase',
              color: '#ffffff', letterSpacing: '1px', marginBottom: '20px'
            }}>
              Zero-Accident Safety Compliance
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.7, marginBottom: '24px' }}>
              We conform strictly to commercial OSHA safety guidelines. Alonso guarantees our crew is fully insured and equipped with correct PPE, rebar protection covers, and safe handling procedures for all heavy truck maneuvers on site.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="safety-cards-grid">
            {[
              { val: '100%', label: 'OSHA COMPLIANT', desc: 'Accident-free history logs' },
              { val: 'FULLY', label: 'INSURED & BONDED', desc: 'Commercial liability coverage' },
              { val: 'CERTIFIED', label: 'QC LAB TESTING', desc: 'PSI compression verified' },
              { val: 'LOCAL', label: 'WEST TEXAS OPERATORS', desc: 'Basin safety card verified' }
            ].map((card, idx) => (
              <div key={idx} style={{
                background: '#000000', border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px', padding: '24px', textAlign: 'center'
              }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 900, color: '#E31937', display: 'block', marginBottom: '8px' }}>
                  {card.val}
                </span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 900, color: '#ffffff', display: 'block', marginBottom: '4px' }}>
                  {card.label}
                </h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: 'rgba(255,255,255,0.4)' }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: LOCAL SERVICE AREAS GRID */}
      <section style={{ padding: '100px 0', background: '#000000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 className="reveal-heading" style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', textTransform: 'uppercase',
              color: '#ffffff', letterSpacing: '1px'
            }}>
              Service Areas Across the Basin
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '580px', margin: '12px auto 0', lineHeight: 1.6 }}>
              Alonso's concrete fleet operates in Midland, Odessa, and surrounding communities with on-time delivery guarantees.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="areas-grid">
            {SERVICE_AREAS.map((area, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px', padding: '24px', transition: 'border-color 0.25s'
              }} className="btn-hover-scale">
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 900, color: '#E31937', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {area.city}
                </h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, margin: 0 }}>
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: TYPICAL PROJECT TIMELINE */}
      <section style={{ padding: '100px 0', background: '#080808', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 className="reveal-heading" style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', textTransform: 'uppercase',
              color: '#ffffff', letterSpacing: '1px'
            }}>
              Typical Slab Production Schedule
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '580px', margin: '12px auto 0', lineHeight: 1.6 }}>
              A summary of what to expect when hiring Alonso Cardenas for your concrete projects.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="timeline-grid">
            {[
              { step: 'Day 1: Excavation', desc: 'Clear the site, excavate loose sand, and lay down caliche road base.' },
              { step: 'Day 2: Forming', desc: 'Set steel forms with laser transit levels, install rebar matrix grid.' },
              { step: 'Day 3: Pour & Finish', desc: 'Deliver concrete mix, laser screed flat, and hand trowel borders.' },
              { step: 'Day 4+: Curing', desc: 'Apply hydration sealing, saw-cut control joints to prevent cracks.' }
            ].map((t, idx) => (
              <div key={idx} style={{
                background: '#000000', border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '20px', padding: '32px 24px', display: 'flex', flexDirection: 'column'
              }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 900, color: '#E31937', textTransform: 'uppercase', marginBottom: '12px' }}>
                  {t.step}
                </span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.96rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: 0 }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: COMPARISON (VS GRID) */}
      <section className="comparison-section" style={{ padding: '100px 0', background: '#000000', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1px solid #E31937', borderRadius: '999px', padding: '6px 18px',
              marginBottom: '20px', color: '#E31937', fontSize: '11px',
              fontFamily: 'var(--font-heading)', letterSpacing: '2px', textTransform: 'uppercase',
            }}>
              The Difference
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', textTransform: 'uppercase',
              color: '#ffffff', letterSpacing: '1px', margin: 0
            }}>
              Contractors Got <span style={{ color: 'rgba(255, 255, 255, 0.35)', textDecoration: 'line-through', textDecorationColor: 'rgba(227, 25, 55, 0.6)', textDecorationThickness: '2px' }}>Slow</span>. We Got <span style={{ background: 'linear-gradient(135deg, #E31937, #ff4d6d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Smarter.</span>
            </h2>
          </div>

          {/* Grid */}
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="comp-grid-box">
            {/* Left Card */}
            <div className="comp-card-left" style={{
              borderRadius: '28px', border: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(255, 255, 255, 0.01)', padding: '40px',
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', marginBottom: '28px' }}>
                The Typical Contractor
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {THEM_LIST.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{
                      width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#f87171', marginTop: '1px', flexShrink: 0
                    }}>
                      ✕
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.45)', lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* VS Badge */}
            <div style={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #E31937, #c5122b)', color: '#ffffff',
              fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 900,
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
              border: '4px solid #000000', boxShadow: '0 4px 20px rgba(227, 25, 55, 0.4)'
            }} className="vs-badge">
              VS
            </div>

            {/* Right Card */}
            <div className="comp-card-right" style={{
              borderRadius: '28px', border: '1px solid rgba(227, 25, 55, 0.2)',
              background: 'rgba(227, 25, 55, 0.03)', padding: '40px',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 0 40px rgba(227, 25, 55, 0.05)',
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#ffffff', textTransform: 'uppercase', marginBottom: '28px' }}>
                Permian Concrete
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
                {US_LIST.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{
                      width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(227, 25, 55, 0.1)',
                      border: '1px solid rgba(227, 25, 55, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#E31937', marginTop: '1px', flexShrink: 0
                    }}>
                      ✓
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '40px',
                background: 'linear-gradient(135deg, #E31937, #c5122b)', color: '#ffffff',
                fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600,
                alignSelf: 'flex-start', boxShadow: '0 6px 20px rgba(227, 25, 55, 0.25)',
                transition: 'transform 0.25s ease'
              }}>
                Start Your Project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 16: WHY CHOOSE US FEATURES GRID */}
      <section style={{ padding: '100px 0', background: '#080808' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 className="reveal-heading" style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', textTransform: 'uppercase',
              color: '#ffffff', letterSpacing: '1px'
            }}>
              Why Hire Permian Concrete
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '580px', margin: '12px auto 0', lineHeight: 1.6 }}>
              We pour structural reliability, not just sand and gravel.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="timeline-grid">
            {WHY_CARDS.map((card, idx) => (
              <div key={idx} style={{
                background: '#000000', border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '20px', padding: '32px 24px', display: 'flex', flexDirection: 'column'
              }}>
                <span style={{ fontSize: '32px', marginBottom: '16px', display: 'block' }}>{card.icon}</span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {card.title}
                </h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.96rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 17: TESTIMONIALS */}
      <Testimonials />

      {/* SECTION 18: FAQ ACCORDION */}
      <FAQ />

      {/* SECTION 19: FORM CONTACT CTA BOX */}
      <section data-reveal style={{ padding: '100px 0', background: '#000000' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            background: '#080808', border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '28px', padding: '60px 40px', textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(circle at 50% 50%, rgba(227,25,55,0.06) 0%, transparent 60%)',
            }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', marginBottom: '12px' }}>
              Let's Build Something Great
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.45)', maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.75 }}>
              Ready to get started on your driveway, foundation, or custom commercial slab? Get in touch with us today for a free on-site consult.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '16px 32px', borderRadius: '40px',
                background: '#E31937', color: '#ffffff',
                fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600,
                boxShadow: '0 8px 30px rgba(227, 25, 55, 0.35)',
                transition: 'transform 0.25s ease'
              }}>
                Get a Free Quote →
              </Link>
              <a href="tel:4325825433" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '16px 32px', borderRadius: '40px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(255, 255, 255, 0.03)', color: '#ffffff',
                fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600,
                transition: 'all 0.25s ease'
              }}>
                Call 432-582-5433
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
