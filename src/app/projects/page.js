'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  { id: 1, title: 'Custom Driveway',      category: 'Residential', img: '/images/residential-driveway.png' },
  { id: 2, title: 'Backyard Patio',       category: 'Residential', img: '/images/project-patio.png' },
  { id: 3, title: 'Warehouse Foundation', category: 'Commercial',  img: '/images/project-foundation.png' },
  { id: 4, title: 'Concrete Sidewalk',    category: 'Residential', img: '/images/project-sidewalk.png' },
  { id: 5, title: 'Commercial Flooring',  category: 'Commercial',  img: '/images/project-commercial-floor.png' },
  { id: 6, title: 'Industrial Warehouse', category: 'Commercial',  img: '/images/commercial-warehouse.png' },
];

const TABS = ['All', 'Residential', 'Commercial'];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const words = heroRef.current.querySelectorAll('.hero-word');
        gsap.fromTo(words, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
        );
      }

      const cards = cardsRef.current.filter(Boolean);
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: '.projects-grid',
              start: 'top 85%',
              once: true
            }
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 90%',
              once: true
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Filter tab change animation
  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const visible = activeTab === 'All' || card.dataset.category === activeTab;
      gsap.to(card, visible
        ? { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', pointerEvents: 'auto' }
        : { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in', pointerEvents: 'none' }
      );
    });
  }, [activeTab]);

  return (
    <>
      <style>{`
        .projects-page { min-height: 100vh; background: transparent; position: relative; }
        .hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(227,25,55,0.12); border:1px solid rgba(227,25,55,0.3); border-radius:999px; padding:6px 18px; font-family:var(--font-body); font-size:13px; font-weight:500; color:#E31937; letter-spacing:0.04em; margin-bottom:24px; }
        .hero-heading { font-family:var(--font-heading); font-weight:900; font-size:clamp(48px,7vw,96px); line-height:1; text-transform:uppercase; letter-spacing:-1px; color:#fff; margin-bottom:24px; }
        .hero-heading .red { color:#E31937; }
        .hero-sub { font-family:var(--font-body); font-size:clamp(15px,1.4vw,18px); color:rgba(255,255,255,0.55); max-width:600px; margin:0 auto; line-height:1.7; }
        .filter-row { display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap; }
        .filter-tab { padding:10px 28px; border-radius:999px; font-family:var(--font-body); font-size:14px; font-weight:500; cursor:pointer; transition:background 0.25s,color 0.25s,border-color 0.25s,transform 0.15s; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.6); background:transparent; outline:none; letter-spacing:0.02em; }
        .filter-tab:hover { border-color:rgba(227,25,55,0.4); color:rgba(255,255,255,0.9); transform:translateY(-1px); }
        .filter-tab.active { background:#E31937; border-color:#E31937; color:#fff; font-weight:600; }
        .projects-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        @media(max-width:900px){ .projects-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:560px){ .projects-grid { grid-template-columns:1fr; } }
        .project-card { border-radius:16px; overflow:hidden; aspect-ratio:4/3; position:relative; cursor:pointer; will-change:transform,opacity; }
        .project-card-inner { width:100%; height:100%; position:relative; }
        .category-badge { position:absolute; top:14px; left:14px; z-index:10; padding:4px 12px; border-radius:999px; font-family:var(--font-body); font-size:11px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; }
        .category-badge.residential { background:rgba(255,255,255,0.95); color:#000000; }
        .category-badge.commercial { background:#E31937; color:#fff; }
        .card-overlay { position:absolute; bottom:0; left:0; right:0; background:linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.6) 60%,transparent 100%); padding:28px 20px 20px; transform:translateY(100%); transition:transform 0.38s cubic-bezier(0.22,1,0.36,1); display:flex; align-items:flex-end; justify-content:space-between; z-index:5; }
        .project-card:hover .card-overlay { transform:translateY(0); }
        .card-overlay-title { font-family:var(--font-heading); font-size:20px; font-weight:700; color:#fff; text-transform:uppercase; letter-spacing:0.03em; }
        .card-arrow { width:36px; height:36px; border-radius:50%; background:#E31937; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:transform 0.2s; }
        .project-card:hover .card-arrow { transform:rotate(-45deg); }
        .cta-block { text-align:center; padding:80px 24px; border-top:1px solid rgba(255,255,255,0.07); margin-top:20px; }
        .cta-block-text { font-family:var(--font-body); font-size:clamp(16px,1.5vw,20px); color:rgba(255,255,255,0.6); margin-bottom:28px; letter-spacing:0.01em; }
        .cta-btn { display:inline-flex; align-items:center; gap:10px; background:linear-gradient(135deg,#E31937 0%,#c41530 100%); color:#fff; font-family:var(--font-heading); font-size:16px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; padding:16px 36px; border-radius:12px; transition:transform 0.2s,box-shadow 0.2s; text-decoration:none; }
        .cta-btn:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(227,25,55,0.4); }
        .img-wrapper { width:100%; height:100%; position:relative; background:rgba(255,255,255,0.04); }
      `}</style>

      <div className="projects-page">
        {/* Hero */}
        <section style={{ paddingTop:'160px', paddingBottom:'80px', textAlign:'center', position:'relative' }}>
          <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 24px' }} ref={heroRef}>
            <div className="hero-badge">
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#E31937', display:'inline-block' }} />
              <span className="hero-word">Our Portfolio</span>
            </div>
            <h1 className="hero-heading">
              <span className="hero-word">Work </span>
              <span className="hero-word">That </span>
              <span className="hero-word red">Speaks</span>
            </h1>
            <p className="hero-sub hero-word">
              A showcase of our finest concrete work across the Permian Basin - residential driveways to industrial warehouse floors. Not renders - real jobs.
            </p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section style={{ marginBottom:'56px' }}>
          <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 24px' }}>
            <div className="filter-row">
              {TABS.map(tab => (
                <button key={tab} className={`filter-tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 24px 20px' }}>
          <div className="projects-grid">
            {PROJECTS.map((project, i) => (
              <div
                key={project.id}
                className="project-card"
                data-category={project.category}
                ref={el => (cardsRef.current[i] = el)}
              >
                <div className="project-card-inner">
                  <span className={`category-badge ${project.category.toLowerCase()}`}>{project.category}</span>
                  <div className="img-wrapper">
                    <Image src={project.img} alt={project.title} fill sizes="(max-width:560px) 100vw,(max-width:900px) 50vw,33vw" style={{ objectFit:'cover' }} quality={85} />
                  </div>
                  <div className="card-overlay">
                    <span className="card-overlay-title">{project.title}</span>
                    <div className="card-arrow">
                      <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div ref={ctaRef} className="cta-block">
          <p className="cta-block-text">Ready to add your project to our portfolio?</p>
          <Link href="/contact" className="cta-btn">
            Get a Free Estimate
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
