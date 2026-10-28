import React from 'react';

/**
 * InodayamLogo - Official Brand SVG Logo for Inodayam Tech Private Limited
 * Designed with standard CSS classes for reliable rendering without Tailwind.
 */
export default function InodayamLogo({ 
  variant = 'full', // 'full' | 'compact' | 'white' | 'iconOnly'
  className = '',
  size = 44 
}) {
  const isWhite = variant === 'white';

  return (
    <div className={`inodayam-brand-wrapper ${isWhite ? 'theme-white' : 'theme-colored'} ${className}`}>
      {/* SVG Icon Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="brand-svg-mark"
      >
        {/* Soft Background Circle */}
        <circle cx="50" cy="50" r="48" fill={isWhite ? 'rgba(255,255,255,0.15)' : '#e0f2fe'} />

        {/* Outer Circular Petals */}
        {/* Left Blue Curved Petal */}
        <path
          d="M 28 72 C 16 54 22 30 42 22 C 34 32 32 50 44 64 C 36 68 31 71 28 72 Z"
          fill="#0284c7"
        />

        {/* Right Green Ascending Leaf */}
        <path
          d="M 56 68 C 72 58 80 34 70 18 C 66 32 58 46 48 56 C 52 61 54 65 56 68 Z"
          fill="#16a34a"
        />

        {/* Center Human Figure */}
        {/* Head */}
        <circle cx="50" cy="27" r="8.5" fill={isWhite ? '#ffffff' : '#0369a1'} />

        {/* Torso & Joyfully Raised Arms */}
        <path
          d="M 50 38 
             C 41 38 33 42 24 50 
             C 27 52 31 51 37 47 
             C 43 43 45 44 45 52 
             L 45 74 
             C 45 76 47 78 50 78 
             C 53 78 55 76 55 74 
             L 55 52 
             C 55 44 57 43 63 47 
             C 69 51 73 52 76 50 
             C 67 42 59 38 50 38 Z"
          fill={isWhite ? '#ffffff' : '#0369a1'}
        />

        {/* Center Golden Core */}
        <circle cx="50" cy="46" r="3.5" fill="#f59e0b" />
      </svg>

      {/* Brand Typography */}
      {variant !== 'iconOnly' && (
        <div className="brand-text-block">
          <div className="brand-name-row">
            <span className="brand-name-inodayam">Inodayam</span>
            <span className="brand-name-tech">Tech Private Limited</span>
          </div>
          {variant === 'full' && (
            <span className="brand-tagline">
              Digital Platform for a Better Tomorrow
            </span>
          )}
        </div>
      )}
    </div>
  );
}
