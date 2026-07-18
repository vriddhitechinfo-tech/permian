'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const mobileOverlayRef = useRef(null);
  const mobileLinksRef = useRef([]);

  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Scroll detection ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Navbar entrance animation ── */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  /* ── Mobile menu GSAP animation ── */
  useEffect(() => {
    if (!mobileOverlayRef.current) return;
    const links = mobileLinksRef.current.filter(Boolean);

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(mobileOverlayRef.current, { display: 'flex', visibility: 'visible', pointerEvents: 'all' });
      gsap.to(mobileOverlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(links, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out', delay: 0.1 });
    } else {
      document.body.style.overflow = '';
      gsap.to(links, { opacity: 0, y: 10, duration: 0.2, ease: 'power3.in' });
      gsap.to(mobileOverlayRef.current, {
        opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => { 
          if (mobileOverlayRef.current) {
            gsap.set(mobileOverlayRef.current, { display: 'none', visibility: 'hidden', pointerEvents: 'none' }); 
          }
        },
      });
    }
  }, [menuOpen]);

  /* ── Close menu on route change ── */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const setMobileLinkRef = useCallback((el, idx) => { mobileLinksRef.current[idx] = el; }, []);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav ref={navRef} className={[styles.navbar, scrolled ? styles.scrolled : ''].join(' ')} style={{ opacity: 0 }}>
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logolink}>
            <Image src="/images/logo-black.png" alt="Permian Concrete" width={150} height={50} priority style={{ height: 'auto', width: '140px' }} />
          </Link>

          {/* Center nav */}
          <div className={styles.capsuleNav}>
            {NAV_ITEMS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={[styles.navlink, isActive(href) ? styles.navlinkactive : ''].join(' ')}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className={styles.rightActions}>
            <Link href="/contact" className={styles.cta}>Get a Quote</Link>
            <button
              className={[styles.hamburger, menuOpen ? styles.hamburgeropen : ''].join(' ')}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={styles.line} />
              <span className={styles.line} />
              <span className={styles.line} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div ref={mobileOverlayRef} className={styles.mobileoverlay} style={{ display: 'none', opacity: 0 }}>
        {NAV_ITEMS.map(({ label, href }, idx) => (
          <Link
            key={href}
            href={href}
            ref={(el) => setMobileLinkRef(el, idx)}
            className={[styles.mobilelink, isActive(href) ? styles.mobilelinkactive : ''].join(' ')}
          >
            {label}
          </Link>
        ))}
        <Link href="/contact" ref={(el) => setMobileLinkRef(el, NAV_ITEMS.length)} className={styles.mobilecta}>
          Get a Quote
        </Link>
      </div>
    </>
  );
}
