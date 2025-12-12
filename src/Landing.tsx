import { useState, useEffect } from "react";

interface LandingProps {
  onStart: () => void;
}

function Landing({ onStart }: LandingProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show button after the writing animation completes
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page">
      <div className="writing-area">
        <div className="handwriting-container">
          <h1 className="handwriting-text">
            <span className="writing-line">Dear,</span>
            <span className="writing-line delay">Sari</span>
          </h1>
        </div>
      </div>

      {/* Start button */}
      <button
        className={`start-button ${showButton ? "visible" : ""}`}
        onClick={onStart}
      >
        Open My Heart 💌
      </button>
    </div>
  );
}

export default Landing;

