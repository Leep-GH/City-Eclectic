import React from 'react';

/**
 * City of Newcastle Golf Club Windmill Logo
 * Stylised windmill SVG based on the club's iconic emblem
 */
export function NewcastleCrest({ size = 48, className = '', color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="City of Newcastle Golf Club Windmill"
    >
      {/* Base / ground arc */}
      <path
        d="M20 88 Q50 96 80 88"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Tower body - tapered */}
      <path
        d="M38 85 L44 52 L56 52 L62 85"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Tower cap / dome */}
      <path
        d="M42 52 Q43 44 50 40 Q57 44 58 52"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Cap peak / finial */}
      <line x1="50" y1="40" x2="50" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="32" r="2.5" stroke={color} strokeWidth="2" fill="none" />

      {/* Gallery rail under cap */}
      <line x1="40" y1="52" x2="60" y2="52" stroke={color} strokeWidth="2" />
      <line x1="41" y1="55" x2="59" y2="55" stroke={color} strokeWidth="1.5" />

      {/* Door */}
      <path
        d="M46 85 L46 76 Q50 73 54 76 L54 85"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Window */}
      <circle cx="50" cy="65" r="3" stroke={color} strokeWidth="1.5" fill="none" />

      {/* ===== SAILS ===== */}
      {/* Top-right sail */}
      <g>
        <line x1="52" y1="30" x2="76" y2="8" stroke={color} strokeWidth="2.5" />
        {/* Sail frame */}
        <path d="M56 26 L72 12" stroke={color} strokeWidth="1" />
        <path d="M54 24 L74 6" stroke={color} strokeWidth="1" />
        {/* Sail lattice bars */}
        <line x1="57" y1="22" x2="60" y2="27" stroke={color} strokeWidth="1" />
        <line x1="60" y1="19" x2="63" y2="24" stroke={color} strokeWidth="1" />
        <line x1="63" y1="16" x2="66" y2="21" stroke={color} strokeWidth="1" />
        <line x1="66" y1="13" x2="69" y2="18" stroke={color} strokeWidth="1" />
        <line x1="69" y1="10" x2="72" y2="15" stroke={color} strokeWidth="1" />
      </g>

      {/* Top-left sail */}
      <g>
        <line x1="48" y1="30" x2="24" y2="8" stroke={color} strokeWidth="2.5" />
        <path d="M44 26 L28 12" stroke={color} strokeWidth="1" />
        <path d="M46 24 L26 6" stroke={color} strokeWidth="1" />
        <line x1="43" y1="22" x2="40" y2="27" stroke={color} strokeWidth="1" />
        <line x1="40" y1="19" x2="37" y2="24" stroke={color} strokeWidth="1" />
        <line x1="37" y1="16" x2="34" y2="21" stroke={color} strokeWidth="1" />
        <line x1="34" y1="13" x2="31" y2="18" stroke={color} strokeWidth="1" />
        <line x1="31" y1="10" x2="28" y2="15" stroke={color} strokeWidth="1" />
      </g>

      {/* Bottom-right sail */}
      <g>
        <line x1="52" y1="34" x2="76" y2="56" stroke={color} strokeWidth="2.5" />
        <path d="M56 38 L72 52" stroke={color} strokeWidth="1" />
        <path d="M54 40 L74 58" stroke={color} strokeWidth="1" />
        <line x1="57" y1="42" x2="60" y2="37" stroke={color} strokeWidth="1" />
        <line x1="60" y1="45" x2="63" y2="40" stroke={color} strokeWidth="1" />
        <line x1="63" y1="48" x2="66" y2="43" stroke={color} strokeWidth="1" />
        <line x1="66" y1="51" x2="69" y2="46" stroke={color} strokeWidth="1" />
        <line x1="69" y1="54" x2="72" y2="49" stroke={color} strokeWidth="1" />
      </g>

      {/* Bottom-left sail */}
      <g>
        <line x1="48" y1="34" x2="24" y2="56" stroke={color} strokeWidth="2.5" />
        <path d="M44 38 L28 52" stroke={color} strokeWidth="1" />
        <path d="M46 40 L26 58" stroke={color} strokeWidth="1" />
        <line x1="43" y1="42" x2="40" y2="37" stroke={color} strokeWidth="1" />
        <line x1="40" y1="45" x2="37" y2="40" stroke={color} strokeWidth="1" />
        <line x1="37" y1="48" x2="34" y2="43" stroke={color} strokeWidth="1" />
        <line x1="34" y1="51" x2="31" y2="46" stroke={color} strokeWidth="1" />
        <line x1="31" y1="54" x2="28" y2="49" stroke={color} strokeWidth="1" />
      </g>

      {/* Center hub */}
      <circle cx="50" cy="32" r="1" fill={color} />
    </svg>
  );
}
