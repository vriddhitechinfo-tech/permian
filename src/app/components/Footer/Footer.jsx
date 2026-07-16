'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

/* ─── Inline SVG Icons (18×18, stroke) ───────────── */

const PhoneIcon = () => (
  <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const MapPinIcon = () => (
  <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* ── Three Columns ──────────────────────── */}
        <div className={styles.columns}>
          {/* Column 1 — Brand */}
          <div className={styles.brand}>
            <div className={styles.logoWrapper}>
              <Link href="/">
                <Image
                  src="/images/logo-black.png"
                  alt="Permian Concrete"
                  width={180}
                  height={60}
                  style={{ width: 180, height: 'auto' }}
                />
              </Link>
            </div>
            <p className={styles.brandText}>
              Premier concrete contractor serving the Permian Basin. Quality
              craftsmanship, competitive pricing, and reliable service since 2009.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className={styles.linksColumn}>
            <h4 className={styles.columnHeading}>Quick Links</h4>
            <ul className={styles.linksList}>
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label} className={styles.linkItem}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div className={styles.contactColumn}>
            <h4 className={styles.columnHeading}>Contact Us</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <PhoneIcon />
                <a href="tel:4325825433">432-582-5433</a>
              </div>
              <div className={styles.contactItem}>
                <MailIcon />
                <a href="mailto:info@permianconcrete.com">info@permianconcrete.com</a>
              </div>
              <div className={styles.contactItem}>
                <MapPinIcon />
                <span>Midland-Odessa, TX</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────── */}
        <hr className={styles.divider} />
        <div className={styles.bottomBar}>
          <span className={styles.bottomText}>
            © 2024 Permian Concrete. All Rights Reserved.
          </span>
          <span className={styles.bottomText}>
            Serving the Permian Basin with Pride
          </span>
          <span className={styles.bottomText}>
            Built with ❤️ in West Texas
          </span>
        </div>
      </div>
    </footer>
  );
}
