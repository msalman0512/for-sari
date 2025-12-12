import { useState, useEffect } from "react";

const SIMILARITIES = [
  "Kita sama-sama suka durian 🍈",
  "Kita sama-sama suka wangi floral 🌸",
  "Kita sama-sama suka ngigau 😴",
  "Kita sama-sama dikenalin kliping sama bapak waktu kecil 📰",
  "Kita sama-sama suka quality time ❤️",
  "Kita sama-sama clingy 🤗",
  "Kita punya pose tidur yang sama 🛏️",
  "Kita sama-sama suka donat gula 🍩",
  "Kita sama-sama dikenalin ke liverpool pas kecil ⚽",
  "Kita sama-sama suka menikmati momen berak 💩",
  "Kita sama-sama suka jus alpukat 🥑",
  "Kita sama-sama saling mencintai satu sama lain, semoga gini terus ya 💕",
];

interface HarmonyTreeProps {
  onBack: () => void;
}

function HarmonyTree({ onBack }: HarmonyTreeProps) {
  const [openedEnvelope, setOpenedEnvelope] = useState<number | null>(null);
  const [revealedEnvelopes, setRevealedEnvelopes] = useState<Set<number>>(new Set());
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Check if the special (last) envelope has been revealed
  const specialRevealed = revealedEnvelopes.has(SIMILARITIES.length - 1);

  // Countdown to 6:00 AM WIB (UTC+7)
  useEffect(() => {
    if (!specialRevealed) return;

    const calculateTimeUntil6AM = () => {
      const now = new Date();
      // Get current time in WIB (UTC+7)
      const wibOffset = 7 * 60; // minutes
      const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
      const wibMinutes = utcMinutes + wibOffset;
      const wibHours = Math.floor(wibMinutes / 60) % 24;
      
      // Calculate next 6:00 AM WIB
      let hoursUntil6AM = 6 - wibHours;
      if (hoursUntil6AM <= 0) hoursUntil6AM += 24;
      
      const target = new Date(now.getTime() + hoursUntil6AM * 60 * 60 * 1000);
      target.setMinutes(0 - (now.getMinutes()), 0 - now.getSeconds(), 0);
      
      // Recalculate properly
      const nowWIB = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
      const target6AM = new Date(nowWIB);
      target6AM.setHours(6, 0, 0, 0);
      
      if (nowWIB >= target6AM) {
        target6AM.setDate(target6AM.getDate() + 1);
      }
      
      const diff = target6AM.getTime() - nowWIB.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return { hours, minutes, seconds };
    };

    setCountdown(calculateTimeUntil6AM());
    
    const interval = setInterval(() => {
      setCountdown(calculateTimeUntil6AM());
    }, 1000);

    return () => clearInterval(interval);
  }, [specialRevealed]);

  const handleEnvelopeClick = (index: number) => {
    setOpenedEnvelope(index);
    setRevealedEnvelopes((prev) => new Set(prev).add(index));
  };

  const closeModal = () => {
    setOpenedEnvelope(null);
  };

  return (
    <div className="tree-page">
      <header className="tree-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1 className="tree-title">Tree of Harmony 🌳</h1>
      </header>

      {/* Countdown timer - shows when special envelope is revealed */}
      {specialRevealed && (
        <div className="countdown-container">
          <p className="countdown-label">Until we met for the first time!!! 🤗</p>
          <p className="countdown-time">
            {String(countdown.hours).padStart(2, '0')}:
            {String(countdown.minutes).padStart(2, '0')}:
            {String(countdown.seconds).padStart(2, '0')}
          </p>
        </div>
      )}

      <p className="tree-subtitle">Click the envelopes to discover what makes us similar 💕</p>
      <p className="tree-subtitle-extra">(Maaf ya kalo jelek pohonnya)</p>

      <div className="tree-container">
        {/* Tree SVG with foliage */}
        <svg viewBox="-20 0 540 420" className="tree-svg" style={{ overflow: 'visible' }}>
          {/* Gradients */}
          <defs>
            <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#5D3A1A" />
            </linearGradient>
            <radialGradient id="leafGradient1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </radialGradient>
            <radialGradient id="leafGradient2">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </radialGradient>
            <radialGradient id="leafGradient3">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#4ade80" />
            </radialGradient>
          </defs>

          {/* Tree trunk */}
          <path
            d="M225 400 L225 260 Q225 240 235 220 L235 190 Q230 170 240 140 L250 120 
               Q260 140 270 170 L265 190 Q275 220 275 240 L275 260 L275 400 Z"
            fill="url(#trunkGradient)"
          />
          
          {/* Tree foliage - many layered ellipses for lush canopy */}
          {/* Base layer - large shapes */}
          <ellipse cx="250" cy="170" rx="160" ry="80" fill="url(#leafGradient1)" opacity="0.9" />
          <ellipse cx="130" cy="140" rx="90" ry="60" fill="url(#leafGradient1)" opacity="0.85" />
          <ellipse cx="370" cy="140" rx="90" ry="60" fill="url(#leafGradient1)" opacity="0.85" />
          
          {/* Second layer */}
          <ellipse cx="250" cy="130" rx="130" ry="70" fill="url(#leafGradient2)" opacity="0.9" />
          <ellipse cx="160" cy="110" rx="70" ry="50" fill="url(#leafGradient2)" opacity="0.85" />
          <ellipse cx="340" cy="110" rx="70" ry="50" fill="url(#leafGradient2)" opacity="0.85" />
          <ellipse cx="80" cy="130" rx="55" ry="40" fill="url(#leafGradient1)" opacity="0.8" />
          <ellipse cx="420" cy="130" rx="55" ry="40" fill="url(#leafGradient1)" opacity="0.8" />
          
          {/* Third layer */}
          <ellipse cx="250" cy="95" rx="110" ry="60" fill="url(#leafGradient3)" opacity="0.9" />
          <ellipse cx="180" cy="80" rx="55" ry="40" fill="url(#leafGradient2)" opacity="0.85" />
          <ellipse cx="320" cy="80" rx="55" ry="40" fill="url(#leafGradient2)" opacity="0.85" />
          <ellipse cx="100" cy="100" rx="45" ry="35" fill="url(#leafGradient2)" opacity="0.8" />
          <ellipse cx="400" cy="100" rx="45" ry="35" fill="url(#leafGradient2)" opacity="0.8" />
          
          {/* Fourth layer - smaller clusters */}
          <ellipse cx="250" cy="60" rx="80" ry="45" fill="url(#leafGradient3)" opacity="0.95" />
          <ellipse cx="200" cy="55" rx="45" ry="32" fill="url(#leafGradient3)" opacity="0.9" />
          <ellipse cx="300" cy="55" rx="45" ry="32" fill="url(#leafGradient3)" opacity="0.9" />
          <ellipse cx="140" cy="70" rx="40" ry="30" fill="url(#leafGradient3)" opacity="0.85" />
          <ellipse cx="360" cy="70" rx="40" ry="30" fill="url(#leafGradient3)" opacity="0.85" />
          
          {/* Top layer - crown */}
          <ellipse cx="250" cy="35" rx="55" ry="32" fill="url(#leafGradient3)" opacity="0.95" />
          <ellipse cx="220" cy="40" rx="35" ry="25" fill="url(#leafGradient3)" opacity="0.9" />
          <ellipse cx="280" cy="40" rx="35" ry="25" fill="url(#leafGradient3)" opacity="0.9" />
          
          {/* Extra side clusters */}
          <ellipse cx="55" cy="150" rx="40" ry="30" fill="url(#leafGradient1)" opacity="0.75" />
          <ellipse cx="445" cy="150" rx="40" ry="30" fill="url(#leafGradient1)" opacity="0.75" />
          <ellipse cx="110" cy="165" rx="50" ry="35" fill="url(#leafGradient1)" opacity="0.8" />
          <ellipse cx="390" cy="165" rx="50" ry="35" fill="url(#leafGradient1)" opacity="0.8" />
          
          {/* Lower side clusters - for lower left and right envelopes */}
          <ellipse cx="40" cy="190" rx="45" ry="35" fill="url(#leafGradient1)" opacity="0.8" />
          <ellipse cx="460" cy="190" rx="45" ry="35" fill="url(#leafGradient1)" opacity="0.8" />
          <ellipse cx="70" cy="210" rx="50" ry="38" fill="url(#leafGradient2)" opacity="0.75" />
          <ellipse cx="430" cy="210" rx="50" ry="38" fill="url(#leafGradient2)" opacity="0.75" />
          <ellipse cx="100" cy="195" rx="55" ry="40" fill="url(#leafGradient1)" opacity="0.8" />
          <ellipse cx="400" cy="195" rx="55" ry="40" fill="url(#leafGradient1)" opacity="0.8" />
        </svg>

        {/* Envelope positions on the tree */}
        <div className="envelopes-container">
          {SIMILARITIES.map((_, index) => {
            const isLastEnvelope = index === SIMILARITIES.length - 1;
            const allOthersDiscovered = revealedEnvelopes.size >= SIMILARITIES.length - 1 && 
              [...Array(SIMILARITIES.length - 1)].every((_, i) => revealedEnvelopes.has(i));
            
            // Hide the last envelope until all others are discovered
            if (isLastEnvelope && !allOthersDiscovered) {
              return null;
            }

            const positions = [
              { top: "8%", left: "50%" },     // top center
              { top: "18%", left: "28%" },    // upper left
              { top: "18%", left: "72%" },    // upper right
              { top: "30%", left: "12%" },    // mid-upper left
              { top: "28%", left: "42%" },    // mid-upper center-left
              { top: "28%", left: "58%" },    // mid-upper center-right
              { top: "30%", left: "88%" },    // mid-upper right
              { top: "42%", left: "22%" },    // mid-lower left
              { top: "42%", left: "78%" },    // mid-lower right
              { top: "52%", left: "8%" },     // lower left
              { top: "52%", left: "92%" },    // lower right
              { top: "35%", left: "50%" },    // SPECIAL: very center
            ];
            const pos = positions[index] || { top: "30%", left: "50%" };
            
            return (
              <button
                key={index}
                className={`envelope ${revealedEnvelopes.has(index) ? "opened" : ""} ${isLastEnvelope ? "special-envelope" : ""}`}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => handleEnvelopeClick(index)}
              >
                <span className="envelope-icon">
                  {revealedEnvelopes.has(index) ? "💌" : "✉️"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="envelope-counter">
        {(() => {
          const regularCount = SIMILARITIES.length - 1; // 11 regular envelopes
          const allRegularDiscovered = [...Array(regularCount)].every((_, i) => revealedEnvelopes.has(i));
          
          if (allRegularDiscovered) {
            // Show out of 12 when special envelope appears
            return `${revealedEnvelopes.size} / ${SIMILARITIES.length} discovered`;
          } else {
            // Show out of 11 before special envelope appears
            const discoveredRegular = [...Array(regularCount)].filter((_, i) => revealedEnvelopes.has(i)).length;
            return `${discoveredRegular} / ${regularCount} discovered`;
          }
        })()}
      </p>

      {/* Modal for showing similarity */}
      {openedEnvelope !== null && (
        <div className="similarity-modal-overlay" onClick={closeModal}>
          <div className="similarity-modal" onClick={(e) => e.stopPropagation()}>
            <div className="similarity-content">
              <span className="similarity-icon">
                {openedEnvelope === SIMILARITIES.length - 1 ? "💖" : "💕"}
              </span>
              <p className="similarity-text">{SIMILARITIES[openedEnvelope]}</p>
            </div>
            <button className="modal-close" onClick={closeModal}>
              Got it! ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HarmonyTree;

