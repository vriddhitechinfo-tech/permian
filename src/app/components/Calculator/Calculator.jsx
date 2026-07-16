'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Calculator.module.css';

export default function Calculator() {
  const [projectType, setProjectType] = useState('driveway');
  const [area, setArea] = useState(500); // sq ft
  const [thickness, setThickness] = useState(4); // inches
  const [volume, setVolume] = useState(0); // cubic yards
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(0);

  const containerRef = useRef(null);
  const volumeValRef = useRef(null);

  // Concrete pricing per cubic yard and project rates
  const rates = {
    driveway: { baseSqFt: 8, yardPrice: 150 },
    patio: { baseSqFt: 10, yardPrice: 160 },
    foundation: { baseSqFt: 12, yardPrice: 170 },
    commercial: { baseSqFt: 14, yardPrice: 180 },
  };

  useEffect(() => {
    // Volume = (Area * Thickness / 12) / 27 (convert to cubic yards)
    const calculatedVolume = ((area * (thickness / 12)) / 27).toFixed(1);
    setVolume(Number(calculatedVolume));

    const selectedRate = rates[projectType];
    const baseCost = area * selectedRate.baseSqFt;
    const materialCost = calculatedVolume * selectedRate.yardPrice;
    
    const estimatedBase = baseCost + materialCost;
    
    setMinCost(Math.round(estimatedBase * 0.9));
    setMaxCost(Math.round(estimatedBase * 1.15));
  }, [projectType, area, thickness]);

  useEffect(() => {
    // Stagger / spring number animation when volume changes
    if (volumeValRef.current) {
      gsap.fromTo(volumeValRef.current, 
        { scale: 1.2, color: '#E31937' },
        { scale: 1, color: '#ffffff', duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [volume]);

  return (
    <div ref={containerRef} className={styles.calculatorCard}>
      <h3 className={styles.title}>Estimate Your Project</h3>
      <p className={styles.subtitle}>Get a real-time estimate for your concrete needs in the Permian Basin.</p>

      <div className={styles.formGroup}>
        <label className={styles.label}>Select Project Type</label>
        <div className={styles.gridBtn}>
          {Object.keys(rates).map((type) => (
            <button
              key={type}
              type="button"
              className={`${styles.calcBtn} ${projectType === type ? styles.active : ''}`}
              onClick={() => setProjectType(type)}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.sliderLabelRow}>
          <label className={styles.label}>Area (Sq. Ft.)</label>
          <span className={styles.valueDisplay}>{area} sq ft</span>
        </div>
        <input
          type="range"
          min="50"
          max="5000"
          step="50"
          value={area}
          onChange={(e) => setArea(Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Thickness (Inches)</label>
        <div className={styles.gridBtn}>
          {[4, 6, 8].map((inch) => (
            <button
              key={inch}
              type="button"
              className={`${styles.calcBtn} ${thickness === inch ? styles.active : ''}`}
              onClick={() => setThickness(inch)}
            >
              {inch}" Thickness
            </button>
          ))}
        </div>
      </div>

      <div className={styles.resultsContainer}>
        <div className={styles.resultItem}>
          <span className={styles.resultLabel}>Concrete Volume</span>
          <span ref={volumeValRef} className={styles.resultVal}>{volume} Yds³</span>
        </div>
        <div className={styles.resultItem}>
          <span className={styles.resultLabel}>Estimated Cost</span>
          <span className={`${styles.resultVal} ${styles.red}`}>
            ${minCost.toLocaleString()} - ${maxCost.toLocaleString()}
          </span>
        </div>
      </div>

      <p className={styles.disclaimer}>
        *Disclaimer: Estimates are for material and basic labor. Actual job conditions, site prep, and finish specifications may affect final pricing. Call Alonso at 432-582-5433 for a formal quote.
      </p>
    </div>
  );
}
