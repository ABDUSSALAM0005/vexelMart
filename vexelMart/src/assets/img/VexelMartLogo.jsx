// frontend/src/components/VexelMartLogo.jsx

import React from 'react';

const VexelMartLogo = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="vm-title"
    >
      <title id="vm-title">Vexel Mart Logo</title>
      <defs>
        {/* Define the gradient using our primary/accent theme colors */}
        <linearGradient id="vm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: "#6366f1"}} /> {/* Indigo-500 (Primary) */}
          <stop offset="100%" style={{stopColor: "#34d399"}} /> {/* Emerald-400 (Accent) */}
        </linearGradient>
      </defs>
      
      {/* Abstract 'VM' Monogram Shape */}
      <path
        d="M 10 90 L 50 10 L 90 90 L 70 90 L 50 40 L 30 90 Z"
        fill="url(#vm-gradient)"
        stroke="#1e293b" // Card color stroke for definition
        strokeWidth="2"
      />
      {/* Inner line for tech/clean look */}
      <path
        d="M 35 70 L 50 35 L 65 70"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default VexelMartLogo;