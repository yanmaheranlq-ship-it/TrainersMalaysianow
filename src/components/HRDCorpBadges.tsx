import React from 'react';

// SVG components for high-precision, crisp rendering of HRD Corp official badges
export const AccreditedTrainerLogo: React.FC<{ className?: string; size?: number }> = ({ 
  className = '', 
  size = 100 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 300 300" 
      className={`select-none ${className}`}
      aria-label="HRD Corp Accredited Trainer Badge"
    >
      {/* Outer thin blue border */}
      <circle cx="150" cy="150" r="142" fill="#ffffff" stroke="#132B4F" strokeWidth="3" />
      
      {/* Upper Deep Blue half ring (radius 121, thickness 28) */}
      <path 
        d="M 29 150 A 121 121 0 0 1 271 150" 
        fill="none" 
        stroke="#132B4F" 
        strokeWidth="28" 
      />
      
      {/* Lower Orange/Red half ring (radius 121, thickness 28) */}
      <path 
        d="M 271 150 A 121 121 0 0 1 29 150" 
        fill="none" 
        stroke="#F05A28" 
        strokeWidth="28" 
      />
      
      {/* Separation lines between upper and lower arcs to keep them clean */}
      <line x1="12" y1="150" x2="46" y2="150" stroke="#ffffff" strokeWidth="4" />
      <line x1="254" y1="150" x2="288" y2="150" stroke="#ffffff" strokeWidth="4" />

      {/* Hidden text paths for circular text alignment (Centered inside the 28px thick ring) */}
      <defs>
        {/* Top text path - clockwise (radius 121 - offset = 114 to center letters vertically) */}
        <path 
          id="accredited-top-path" 
          d="M 36 150 A 114 114 0 0 1 264 150" 
          fill="none" 
        />
        {/* Bottom text path - counter-clockwise (radius 121 + offset = 128 to center letters vertically) */}
        <path 
          id="accredited-bottom-path" 
          d="M 22 150 A 128 128 0 0 0 278 150" 
          fill="none" 
        />
        {/* Semicircular clip path for the upper stripes */}
        <clipPath id="upper-half-clip">
          <path d="M 49.5 150 A 100.5 100.5 0 0 1 250.5 150 Z" />
        </clipPath>
      </defs>

      {/* ACCREDITED Text along top path */}
      <text fill="#ffffff" fontSize="16.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="4">
        <textPath href="#accredited-top-path" startOffset="50%" textAnchor="middle">
          • ACCREDITED •
        </textPath>
      </text>

      {/* TRAINER Text along bottom path (Upright rendering) */}
      <text fill="#ffffff" fontSize="18.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="5.5">
        <textPath href="#accredited-bottom-path" startOffset="50%" textAnchor="middle">
          •• TRAINER ••
        </textPath>
      </text>

      {/* Inner bounding rings of white center area */}
      <circle cx="150" cy="150" r="105" fill="none" stroke="#132B4F" strokeWidth="2.5" />
      <circle cx="150" cy="150" r="102.5" fill="none" stroke="#F05A28" strokeWidth="2" />
      <circle cx="150" cy="150" r="100.5" fill="#ffffff" />

      {/* Vertical blue stripes in the upper half of white inner circle */}
      <g stroke="#132B4F" strokeWidth="2.5" opacity="0.8" clipPath="url(#upper-half-clip)">
        <line x1="60" y1="30" x2="60" y2="150" />
        <line x1="70" y1="30" x2="70" y2="150" />
        <line x1="80" y1="30" x2="80" y2="150" />
        <line x1="90" y1="30" x2="90" y2="150" />
        <line x1="100" y1="30" x2="100" y2="150" />
        <line x1="110" y1="30" x2="110" y2="150" />
        <line x1="120" y1="30" x2="120" y2="150" />
        <line x1="130" y1="30" x2="130" y2="150" />
        <line x1="140" y1="30" x2="140" y2="150" />
        <line x1="150" y1="30" x2="150" y2="150" />
        <line x1="160" y1="30" x2="160" y2="150" />
        <line x1="170" y1="30" x2="170" y2="150" />
        <line x1="180" y1="30" x2="180" y2="150" />
        <line x1="190" y1="30" x2="190" y2="150" />
        <line x1="200" y1="30" x2="200" y2="150" />
        <line x1="210" y1="30" x2="210" y2="150" />
        <line x1="220" y1="30" x2="220" y2="150" />
        <line x1="230" y1="30" x2="230" y2="150" />
        <line x1="240" y1="30" x2="240" y2="150" />
      </g>

      {/* HRD Corp Logo in the Center (Direct coordinate centering for maximum visual balance) */}
      <g>
        {/* "HRD corp" text */}
        <text x="142" y="138" textAnchor="middle">
          <tspan fill="#132B4F" fontSize="40" fontWeight="900" fontFamily="sans-serif" letterSpacing="-1">HRD</tspan>
          <tspan fill="#F05A28" fontSize="26" fontWeight="900" fontFamily="sans-serif" letterSpacing="0"> corp</tspan>
        </text>
        
        {/* Orange Dot next to the D */}
        <circle cx="166" cy="116" r="4.5" fill="#F05A28" />

        {/* Big Navy Blue V-shaped Chevron below logo */}
        <path 
          d="M 85,152 L 150,200 L 215,152" 
          fill="none" 
          stroke="#132B4F" 
          strokeWidth="18" 
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </g>

      {/* Orange dots on Left and Right borders */}
      <circle cx="70" cy="150" r="7.5" fill="#F05A28" />
      <circle cx="230" cy="150" r="7.5" fill="#F05A28" />

      {/* Small white dot arrays at the bottom orange strip (radius 121) */}
      <circle cx="81" cy="249" r="3.5" fill="#ffffff" />
      <circle cx="103" cy="261" r="3.5" fill="#ffffff" />
      <circle cx="127" cy="269" r="3.5" fill="#ffffff" />
      <circle cx="173" cy="269" r="3.5" fill="#ffffff" />
      <circle cx="197" cy="261" r="3.5" fill="#ffffff" />
      <circle cx="219" cy="249" r="3.5" fill="#ffffff" />
    </svg>
  );
};

export const RegisteredProviderLogo: React.FC<{ className?: string; size?: number }> = ({ 
  className = '', 
  size = 100 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 300 300" 
      className={`select-none ${className}`}
      aria-label="HRD Corp Registered Training Provider Badge"
    >
      {/* Outer thin blue border */}
      <circle cx="150" cy="150" r="142" fill="#ffffff" stroke="#132B4F" strokeWidth="3" />
      
      {/* Upper Orange/Red half ring (radius 121, thickness 28) */}
      <path 
        d="M 29 150 A 121 121 0 0 1 271 150" 
        fill="none" 
        stroke="#F05A28" 
        strokeWidth="28" 
      />
      
      {/* Lower Deep Blue half ring (radius 121, thickness 28) */}
      <path 
        d="M 271 150 A 121 121 0 0 1 29 150" 
        fill="none" 
        stroke="#132B4F" 
        strokeWidth="28" 
      />
      
      {/* Separation lines between upper and lower arcs */}
      <line x1="12" y1="150" x2="46" y2="150" stroke="#ffffff" strokeWidth="4" />
      <line x1="254" y1="150" x2="288" y2="150" stroke="#ffffff" strokeWidth="4" />

      {/* Hidden text paths for circular text alignment */}
      <defs>
        {/* Top text path */}
        <path 
          id="registered-top-path" 
          d="M 36 150 A 114 114 0 0 1 264 150" 
          fill="none" 
        />
        {/* Bottom text path */}
        <path 
          id="registered-bottom-path" 
          d="M 22 150 A 128 128 0 0 0 278 150" 
          fill="none" 
        />
        {/* Semicircular clip path for stripes */}
        <clipPath id="upper-half-clip-registered">
          <path d="M 49.5 150 A 100.5 100.5 0 0 1 250.5 150 Z" />
        </clipPath>
      </defs>

      {/* REGISTERED Text along top path */}
      <text fill="#ffffff" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="4.5">
        <textPath href="#registered-top-path" startOffset="50%" textAnchor="middle">
          REGISTERED
        </textPath>
      </text>

      {/* TRAINING PROVIDER Text along bottom path (Upright rendering) */}
      <text fill="#ffffff" fontSize="13.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="2.5">
        <textPath href="#registered-bottom-path" startOffset="50%" textAnchor="middle">
          TRAINING PROVIDER
        </textPath>
      </text>

      {/* Inner bounding rings of white center area */}
      <circle cx="150" cy="150" r="105" fill="none" stroke="#132B4F" strokeWidth="2.5" />
      <circle cx="150" cy="150" r="102.5" fill="none" stroke="#F05A28" strokeWidth="2" />
      <circle cx="150" cy="150" r="100.5" fill="#ffffff" />

      {/* Vertical blue stripes in the upper half of white inner circle */}
      <g stroke="#132B4F" strokeWidth="2.5" opacity="0.8" clipPath="url(#upper-half-clip-registered)">
        <line x1="60" y1="30" x2="60" y2="150" />
        <line x1="70" y1="30" x2="70" y2="150" />
        <line x1="80" y1="30" x2="80" y2="150" />
        <line x1="90" y1="30" x2="90" y2="150" />
        <line x1="100" y1="30" x2="100" y2="150" />
        <line x1="110" y1="30" x2="110" y2="150" />
        <line x1="120" y1="30" x2="120" y2="150" />
        <line x1="130" y1="30" x2="130" y2="150" />
        <line x1="140" y1="30" x2="140" y2="150" />
        <line x1="150" y1="30" x2="150" y2="150" />
        <line x1="160" y1="30" x2="160" y2="150" />
        <line x1="170" y1="30" x2="170" y2="150" />
        <line x1="180" y1="30" x2="180" y2="150" />
        <line x1="190" y1="30" x2="190" y2="150" />
        <line x1="200" y1="30" x2="200" y2="150" />
        <line x1="210" y1="30" x2="210" y2="150" />
        <line x1="220" y1="30" x2="220" y2="150" />
        <line x1="230" y1="30" x2="230" y2="150" />
        <line x1="240" y1="30" x2="240" y2="150" />
      </g>

      {/* HRD Corp Logo in the Center */}
      <g>
        {/* "HRD corp" text */}
        <text x="142" y="138" textAnchor="middle">
          <tspan fill="#132B4F" fontSize="40" fontWeight="900" fontFamily="sans-serif" letterSpacing="-1">HRD</tspan>
          <tspan fill="#F05A28" fontSize="26" fontWeight="900" fontFamily="sans-serif" letterSpacing="0"> corp</tspan>
        </text>
        
        {/* Orange Dot next to the D */}
        <circle cx="166" cy="116" r="4.5" fill="#F05A28" />

        {/* Big Navy Blue V-shaped Chevron below logo */}
        <path 
          d="M 85,152 L 150,200 L 215,152" 
          fill="none" 
          stroke="#132B4F" 
          strokeWidth="18" 
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </g>

      {/* Orange dots on Left and Right borders */}
      <circle cx="70" cy="150" r="7.5" fill="#F05A28" />
      <circle cx="230" cy="150" r="7.5" fill="#F05A28" />
    </svg>
  );
};

export const ClaimableLogo: React.FC<{ className?: string; size?: number }> = ({ 
  className = '', 
  size = 100 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 300 300" 
      className={`select-none ${className}`}
      aria-label="HRD Corp Claimable Scheme Badge"
    >
      {/* Outer thin blue border */}
      <circle cx="150" cy="150" r="142" fill="#ffffff" stroke="#132B4F" strokeWidth="3" />
      
      {/* Circular grey outer accent ring */}
      <circle cx="150" cy="150" r="136" fill="none" stroke="#132B4F" strokeWidth="8" opacity="0.08" />

      {/* Hidden text paths for circular text alignment */}
      <defs>
        <path 
          id="claimable-top-path" 
          d="M 34 150 A 116 116 0 0 1 266 150" 
          fill="none" 
        />
        <path 
          id="claimable-bottom-path" 
          d="M 20 150 A 130 130 0 0 0 280 150" 
          fill="none" 
        />
        {/* Semicircular clip path for the lower stripes */}
        <clipPath id="lower-half-clip">
          <path d="M 49.5 150 A 100.5 100.5 0 0 0 250.5 150 Z" />
        </clipPath>
      </defs>

      {/* HRDCORP CLAIMABLE Text along top path */}
      <text fill="#132B4F" fontSize="13.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="3">
        <textPath href="#claimable-top-path" startOffset="50%" textAnchor="middle">
          HRDCORP CLAIMABLE •
        </textPath>
      </text>

      {/* HRDCORP CLAIMABLE Text along bottom path */}
      <text fill="#132B4F" fontSize="13.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="3">
        <textPath href="#claimable-bottom-path" startOffset="50%" textAnchor="middle">
          • HRDCORP CLAIMABLE
        </textPath>
      </text>

      {/* Inner solid blue bounding ring */}
      <circle cx="150" cy="150" r="102" fill="none" stroke="#132B4F" strokeWidth="2.5" />
      <circle cx="150" cy="150" r="100.5" fill="#ffffff" />

      {/* Vertical blue stripes at the bottom of the inner circle */}
      <g stroke="#132B4F" strokeWidth="2.5" opacity="0.8" clipPath="url(#lower-half-clip)">
        <line x1="60" y1="150" x2="60" y2="260" />
        <line x1="70" y1="150" x2="70" y2="260" />
        <line x1="80" y1="150" x2="80" y2="260" />
        <line x1="90" y1="150" x2="90" y2="260" />
        <line x1="100" y1="150" x2="100" y2="260" />
        <line x1="110" y1="150" x2="110" y2="260" />
        <line x1="120" y1="150" x2="120" y2="260" />
        <line x1="130" y1="150" x2="130" y2="260" />
        <line x1="140" y1="150" x2="140" y2="260" />
        <line x1="150" y1="150" x2="150" y2="260" />
        <line x1="160" y1="150" x2="160" y2="260" />
        <line x1="170" y1="150" x2="170" y2="260" />
        <line x1="180" y1="150" x2="180" y2="260" />
        <line x1="190" y1="150" x2="190" y2="260" />
        <line x1="200" y1="150" x2="200" y2="260" />
        <line x1="210" y1="150" x2="210" y2="260" />
        <line x1="220" y1="150" x2="220" y2="260" />
        <line x1="230" y1="150" x2="230" y2="260" />
        <line x1="240" y1="150" x2="240" y2="260" />
      </g>

      {/* Blue "CLAIMABLE" ribbon banner across the lower middle */}
      <rect x="54" y="134" width="192" height="32" fill="#132B4F" rx="3" />
      <text x="150" y="157" fill="#ffffff" fontSize="19" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="3">
        CLAIMABLE
      </text>

      {/* HRD Corp Logo inside the upper section */}
      <g>
        {/* "HRD corp" text */}
        <text x="144" y="104" textAnchor="middle">
          <tspan fill="#132B4F" fontSize="30" fontWeight="900" fontFamily="sans-serif" letterSpacing="-0.5">HRD</tspan>
          <tspan fill="#F05A28" fontSize="20" fontWeight="900" fontFamily="sans-serif" letterSpacing="0"> corp</tspan>
        </text>
        
        {/* Orange Dot next to D */}
        <circle cx="162" cy="88" r="3.5" fill="#F05A28" />
      </g>

      {/* Tiny orange/red dots on left and right */}
      <circle cx="16" cy="150" r="5" fill="#F05A28" />
      <circle cx="284" cy="150" r="5" fill="#F05A28" />
    </svg>
  );
};

interface HRDCorpBadgesProps {
  showTitle?: boolean;
  compact?: boolean;
}

export const HRDCorpBadges: React.FC<HRDCorpBadgesProps> = ({ 
  showTitle = true,
  compact = false 
}) => {
  return (
    <div className="w-full text-left" id="hrdcorp-badges-section">
      {showTitle && (
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          Akreditasi HRD Corp
        </p>
      )}
      
      <div className={`grid ${compact ? 'grid-cols-3 gap-2' : 'grid-cols-3 gap-3'} items-center`}>
        {/* Badge 1 */}
        <div className="group relative flex flex-col items-center p-2 rounded-xl bg-white border border-zinc-150 hover:border-red-200 hover:shadow-md transition-all duration-300">
          <AccreditedTrainerLogo size={compact ? 45 : 68} className="transition-transform duration-350 ease-out group-hover:scale-110" />
          {!compact && (
            <span className="text-[9px] font-black text-zinc-700 mt-2 text-center leading-tight">
              Accredited Trainer
            </span>
          )}
          {/* Elegant Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-zinc-900 text-white rounded-lg shadow-xl text-[10px] leading-relaxed font-semibold opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 z-50 border border-zinc-800">
            <p className="font-extrabold text-red-400 uppercase tracking-wider text-[8.5px] mb-0.5">Accredited Trainer</p>
            Jurulatih rasmi yang diiktiraf oleh HRD Corp untuk mengendalikan kursus latihan bertaraf tinggi.
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 rotate-45 -mt-1 border-r border-b border-zinc-800" />
          </div>
        </div>

        {/* Badge 2 */}
        <div className="group relative flex flex-col items-center p-2 rounded-xl bg-white border border-zinc-150 hover:border-red-200 hover:shadow-md transition-all duration-300">
          <RegisteredProviderLogo size={compact ? 45 : 68} className="transition-transform duration-350 ease-out group-hover:scale-110" />
          {!compact && (
            <span className="text-[9px] font-black text-zinc-700 mt-2 text-center leading-tight">
              Training Provider
            </span>
          )}
          {/* Elegant Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-zinc-900 text-white rounded-lg shadow-xl text-[10px] leading-relaxed font-semibold opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 z-50 border border-zinc-800">
            <p className="font-extrabold text-red-400 uppercase tracking-wider text-[8.5px] mb-0.5">Registered Provider</p>
            Penyedia latihan berdaftar rasmi di bawah Akta PSMB 2001 untuk program pembinaan modal insan.
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 rotate-45 -mt-1 border-r border-b border-zinc-800" />
          </div>
        </div>

        {/* Badge 3 */}
        <div className="group relative flex flex-col items-center p-2 rounded-xl bg-white border border-zinc-150 hover:border-red-200 hover:shadow-md transition-all duration-300">
          <ClaimableLogo size={compact ? 45 : 68} className="transition-transform duration-350 ease-out group-hover:scale-110" />
          {!compact && (
            <span className="text-[9px] font-black text-zinc-700 mt-2 text-center leading-tight">
              100% Claimable
            </span>
          )}
          {/* Elegant Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-zinc-900 text-white rounded-lg shadow-xl text-[10px] leading-relaxed font-semibold opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 z-50 border border-zinc-800">
            <p className="font-extrabold text-red-400 uppercase tracking-wider text-[8.5px] mb-0.5">HRD Corp Claimable</p>
            Sesi latihan layak dituntut 100% menerusi caruman levy majikan (SBL-Khas Scheme).
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 rotate-45 -mt-1 border-r border-b border-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
};
