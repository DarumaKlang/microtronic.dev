import React from 'react';
import styles from '../app/styles/background.module.css'; // Import the CSS module

const GooeyBackground: React.FC = () => {
  return (
    <>
      <div className={styles['gradient-background']}>
        {/* Circles */}
        <div className={`${styles['gradient-circle']} ${styles['circle-1']}`}></div>
        <div className={`${styles['gradient-circle']} ${styles['circle-2']}`}></div>
        <div className={`${styles['gradient-circle']} ${styles['circle-3']}`}></div>
        <div className={`${styles['gradient-circle']} ${styles['circle-4']}`}></div>
        {/* Add more circles as needed */}
      </div>

      {/* SVG Filters - This must be present in the HTML, but can be hidden */}
      <svg className="hidden" aria-hidden="true" focusable="false">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -7
            " result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default GooeyBackground;
