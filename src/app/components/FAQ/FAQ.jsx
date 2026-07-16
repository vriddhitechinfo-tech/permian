'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FAQ.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FAQS = [
  {
    q: 'How long does concrete take to cure?',
    a: 'Concrete reaches about 70% of its full strength within 7 days, and full cure at 28 days. We advise light foot traffic after 24–48 hours and vehicle traffic after 7 days. We guide you through every phase to protect your investment.',
  },
  {
    q: 'What PSI rating do you use for driveways vs. warehouse floors?',
    a: 'Residential driveways typically require 3,000–3,500 PSI. Commercial warehouse floors and foundations use 4,000–5,000 PSI with added fiber or rebar reinforcement for load-bearing capacity.',
  },
  {
    q: 'Do you work in the West Texas heat? Does it affect the pour?',
    a: 'Absolutely — we are specialists in West Texas conditions. We adjust water-cement ratios, add retarders, and schedule pours during optimal temperature windows to ensure consistent curing even in extreme summer heat.',
  },
  {
    q: 'Do you offer free estimates?',
    a: 'Yes. We provide free, no-obligation estimates. Use our online calculator for a ballpark figure, then call Alonso at 432-582-5433 or fill out our contact form for a detailed on-site quote.',
  },
  {
    q: 'Can you add AI chatbots or automation to my existing site?',
    a: 'We work in Midland, Odessa, and the broader Permian Basin region. For projects outside this area, contact us — we may be able to accommodate depending on scale.',
  },
  {
    q: 'Do I own the completed work and receive documentation?',
    a: 'Yes. You receive full project documentation including mix specs, PSI certificates, and workmanship warranty details at project completion. Your slab, your records, your peace of mind.',
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline();
    tlRef.current = tl;

    if (open) {
      gsap.set(contentRef.current, { display: 'block' });
      tl.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      tl.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => { if (contentRef.current) gsap.set(contentRef.current, { display: 'none' }); },
      });
    }
  }, [open]);

  return (
    <div className={[styles.item, open ? styles.itemOpen : ''].join(' ')}>
      <button
        className={styles.question}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{faq.q}</span>
        <span className={[styles.icon, open ? styles.iconOpen : ''].join(' ')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        className={styles.answer}
        style={{ height: 0, overflow: 'hidden', display: 'none', opacity: 0 }}
      >
        <p className={styles.answerText}>{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll('[data-faq-item]');
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading} data-reveal>
          <span className={styles.badge}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            FAQ
          </span>
          <h2 className={styles.title}>
            Questions? <span className={styles.highlight}>We've Got Answers.</span>
          </h2>
          <p className={styles.sub}>Everything you need to know before your first pour.</p>
        </div>

        <div className={styles.faqList}>
          {FAQS.map((faq, i) => (
            <div key={i} data-faq-item>
              <FAQItem faq={faq} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
