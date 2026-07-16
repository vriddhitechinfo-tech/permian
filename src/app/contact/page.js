'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
}

export default function ContactPage() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const cardsRef = useRef(null);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', projectType: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(leftRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
        );
      }

      if (rightRef.current) {
        gsap.fromTo(rightRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.info-card');
        gsap.fromTo(cards,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        .contact-page { min-height: 100vh; background: transparent; position: relative; overflow: hidden; }
        .contact-grid { display: grid; grid-template-columns: 45fr 55fr; gap: 64px; max-width: 1280px; margin: 0 auto; padding: 140px 24px 80px; }
        @media(max-width: 900px) { .contact-grid { grid-template-columns: 1fr; gap: 48px; padding-top: 100px; } }
        
        .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(227, 25, 55, 0.12); border: 1px solid rgba(227, 25, 55, 0.3); border-radius: 999px; padding: 6px 18px; font-family: var(--font-body); font-size: 13px; font-weight: 500; color: #E31937; letter-spacing: 0.04em; margin-bottom: 24px; text-transform: uppercase; }
        .heading { font-family: var(--font-heading); font-weight: 900; font-size: clamp(36px, 5.5vw, 64px); line-height: 1.08; text-transform: uppercase; color: #fff; margin-bottom: 24px; }
        .heading .red { color: #E31937; }
        .sub { font-family: var(--font-body); font-size: 16px; color: rgba(255, 255, 255, 0.55); line-height: 1.7; margin-bottom: 40px; }
        
        .pills-list { display: flex; flexDirection: column; gap: 16px; margin-bottom: 32px; }
        .info-pill { display: flex; align-items: center; gap: 16px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 14px; padding: 16px 20px; transition: border-color 0.25s; text-decoration: none; color: #fff; }
        .info-pill:hover { border-color: rgba(227, 25, 55, 0.35); }
        .pill-icon-wrapper { width: 40px; height: 40px; border-radius: 50%; background: rgba(227, 25, 55, 0.1); border: 1px solid rgba(227, 25, 55, 0.25); display: flex; align-items: center; justify-content: center; color: #E31937; flex-shrink: 0; }
        .pill-content { display: flex; flexDirection: column; }
        .pill-label { font-family: var(--font-body); font-size: 10px; font-weight: 700; color: rgba(255, 255, 255, 0.35); letter-spacing: 0.08em; text-transform: uppercase; }
        .pill-value { font-family: var(--font-body); font-size: 14.5px; font-weight: 600; }
        
        .note { font-family: var(--font-body); font-size: 13px; color: rgba(255, 255, 255, 0.4); }
        
        .form-card { background: rgba(0, 0, 0, 0.7); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 24px; padding: 48px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); backdropFilter: blur(20px); }
        @media(max-width: 560px) { .form-card { padding: 28px; } }
        
        .form-group { display: flex; flexDirection: column; gap: 8px; margin-bottom: 20px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media(max-width: 560px) { .form-row { grid-template-columns: 1fr; gap: 0; } }
        
        .input-label { font-family: var(--font-body); font-size: 12px; font-weight: 600; color: rgba(255, 255, 255, 0.4); text-transform: uppercase; letter-spacing: 0.05em; }
        .form-input { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 14px 18px; color: #fff; font-family: var(--font-body); font-size: 14px; outline: none; transition: border-color 0.25s, box-shadow 0.25s; }
        .form-input:focus { border-color: rgba(227, 25, 55, 0.4); box-shadow: 0 0 12px rgba(227, 25, 55, 0.15); }
        
        .submit-btn { width: 100%; padding: 16px; border-radius: 12px; background: #E31937; border: none; color: #fff; font-family: var(--font-heading); font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(227, 25, 55, 0.35); }
        .submit-btn:active { transform: translateY(0); }
        
        .info-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1280px; margin: 0 auto; padding: 0 24px 100px; }
        @media(max-width: 900px) { .info-cards-grid { grid-template-columns: 1fr; gap: 20px; } }
        
        .info-card { background: rgba(255, 255, 255, 0.01); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; padding: 32px 24px; text-align: center; display: flex; flexDirection: column; alignItems: center; transition: border-color 0.25s; }
        .info-card:hover { border-color: rgba(227, 25, 55, 0.25); }
        .info-card-icon { width: 48px; height: 48px; border-radius: 50%; background: rgba(227, 25, 55, 0.08); border: 1px solid rgba(227, 25, 55, 0.2); display: flex; align-items: center; justify-content: center; color: #E31937; margin-bottom: 20px; }
        .info-card-title { font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: #fff; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.05em; }
        .info-card-value { font-family: var(--font-body); font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 4px; }
        .info-card-note { font-family: var(--font-body); font-size: 12px; color: rgba(255, 255, 255, 0.35); }
      `}</style>

      <div className="contact-page">
        <div className="contact-grid">
          {/* LEFT: Info */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <div className="badge">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E31937', display: 'inline-block' }} />
              Get In Touch
            </div>
            <h1 className="heading">
              Let's Build <span className="red">Something Great</span>
            </h1>
            <p className="sub">
              Have a project in mind? We'd love to hear about it. Tell us what you need and we'll get back to you within 24 hours.
            </p>

            <div className="pills-list">
              <a href="tel:4325825433" className="info-pill">
                <div className="pill-icon-wrapper">
                  <PhoneIcon />
                </div>
                <div className="pill-content">
                  <span className="pill-label">Phone</span>
                  <span className="pill-value">432-582-5433</span>
                </div>
              </a>

              <a href="mailto:info@permianconcrete.com" className="info-pill">
                <div className="pill-icon-wrapper">
                  <MailIcon />
                </div>
                <div className="pill-content">
                  <span className="pill-label">Email</span>
                  <span className="pill-value">info@permianconcrete.com</span>
                </div>
              </a>

              <div className="info-pill">
                <div className="pill-icon-wrapper">
                  <MapIcon />
                </div>
                <div className="pill-content">
                  <span className="pill-label">Service Area</span>
                  <span className="pill-value">Midland-Odessa, TX</span>
                </div>
              </div>
            </div>

            <p className="note">Mon-Sat, 7am-6pm - Free estimates - No obligation</p>
          </div>

          {/* RIGHT: Form Card */}
          <div ref={rightRef} style={{ opacity: 0 }}>
            <div className="form-card">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(227, 25, 55, 0.1)',
                    border: '2px solid #E31937', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#E31937', fontSize: '28px', margin: '0 auto 24px'
                  }}>
                    ✓
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.6 }}>
                    Thank you! We've received your request and Alonso or a team member will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="input-label">Your Name</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label className="input-label">Email Address</label>
                      <input
                        type="email"
                        required
                        className="form-input"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="input-label">Phone Number</label>
                    <input
                      type="tel"
                      required
                      className="form-input"
                      placeholder="432-000-0000"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="input-label">Project Type</label>
                    <select
                      required
                      className="form-input"
                      style={{ background: 'rgba(30, 30, 45, 0.9)', color: '#fff' }}
                      value={form.projectType}
                      onChange={e => setForm(p => ({ ...p, projectType: e.target.value }))}
                    >
                      <option value="" disabled>Select project type...</option>
                      <option value="Residential Driveway">Residential Driveway</option>
                      <option value="Commercial Foundation">Commercial Foundation</option>
                      <option value="Warehouse Floor">Warehouse Floor</option>
                      <option value="Patio/Decorative">Patio/Decorative</option>
                      <option value="Sidewalk/Curb">Sidewalk/Curb</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '28px' }}>
                    <label className="input-label">Tell Us About Your Project</label>
                    <textarea
                      required
                      rows="4"
                      className="form-input"
                      placeholder="Describe your project, square footage, timeline, and any specific requirements..."
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Send Message
                  </button>

                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: '16px', lineHeight: 1.6 }}>
                    Your information is kept private. We never share or sell your data.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom 3-column info cards */}
        <div ref={cardsRef}>
          <div className="info-cards-grid">
            <div className="info-card">
              <div className="info-card-icon">
                <PhoneIcon />
              </div>
              <p className="info-card-title">Call Us</p>
              <p className="info-card-value">432-582-5433</p>
              <p className="info-card-note">Mon-Sat, 7am-6pm</p>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                <MailIcon />
              </div>
              <p className="info-card-title">Email Us</p>
              <p className="info-card-value">info@permianconcrete.com</p>
              <p className="info-card-note">Response within 24 hours</p>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                <MapIcon />
              </div>
              <p className="info-card-title">Visit Us</p>
              <p className="info-card-value">Midland-Odessa, TX</p>
              <p className="info-card-note">Serving the Permian Basin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
