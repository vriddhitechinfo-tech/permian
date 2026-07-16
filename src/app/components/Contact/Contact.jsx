'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Residential Driveway',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left info slide-in
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Right form slide-in
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission success
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Residential Driveway',
      message: '',
    });
  };

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column — Info */}
          <div ref={infoRef} className={styles.infoCol}>
            <span className={styles.label}>GET IN TOUCH</span>
            <h2 className={styles.heading}>
              Ready to Discuss <br />
              <span className={styles.highlight}>Your Project?</span>
            </h2>
            <p className={styles.description}>
              Work with the most trusted concrete contractor team in Midland-Odessa. We bring craftsmanship, top-tier materials, and reliable timelines to every project.
            </p>

            <div className={styles.contactDetails}>
              {/* Phone */}
              <a href="tel:4325825433" className={styles.detailItem}>
                <div className={styles.iconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className={styles.detailLabel}>Call Alonso directly</div>
                  <div className={styles.detailValue}>432-582-5433</div>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:info@permianconcrete.com" className={styles.detailItem}>
                <div className={styles.iconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className={styles.detailLabel}>Email our office</div>
                  <div className={styles.detailValue}>info@permianconcrete.com</div>
                </div>
              </a>

              {/* Location */}
              <div className={styles.detailItem}>
                <div className={styles.iconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className={styles.detailLabel}>Our Service Area</div>
                  <div className={styles.detailValue}>Midland-Odessa, TX | Permian Basin</div>
                </div>
              </div>

              {/* Hours */}
              <div className={styles.detailItem}>
                <div className={styles.iconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className={styles.detailLabel}>Business Hours</div>
                  <div className={styles.detailValue}>Mon-Sat: 7:00 AM - 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Form */}
          <div ref={formRef} className={styles.formCol}>
            <div className={styles.formCard}>
              {formSubmitted ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>Thank you!</h3>
                  <p>Your message has been sent successfully. We will get back to you shortly.</p>
                  <button onClick={() => setFormSubmitted(false)} className={styles.resetButton}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h3 className={styles.formTitle}>Request a Free Quote</h3>

                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.inputLabel}>Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGrid}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email" className={styles.inputLabel}>Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="phone" className={styles.inputLabel}>Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="432-555-0199"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="service" className={styles.inputLabel}>Project Type</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="Residential Driveway">Residential Driveway</option>
                      <option value="Residential Sidewalk">Residential Sidewalk</option>
                      <option value="Residential Foundation">Residential Foundation</option>
                      <option value="Residential Patio">Residential Patio</option>
                      <option value="Commercial Foundation">Commercial Foundation</option>
                      <option value="Commercial Warehouse Floor">Commercial Warehouse Floor</option>
                      <option value="Other">Other Concrete Service</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="message" className={styles.inputLabel}>Project Details</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Describe your project size, timeline, and location details..."
                      className={styles.textarea}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    SUBMIT REQUEST
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
