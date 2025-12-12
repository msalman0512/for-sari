import { useState } from "react";
import confetti from "canvas-confetti";
import Journey from "./Journey";
import Landing from "./Landing";
import HarmonyTree from "./HarmonyTree";

// Helper function to parse **bold** syntax into React elements
function parseText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

const POEM_LINES = [
  "Siapa sangka, cukup satu purnama, dua insan yang belum saling sapa, kini selalu menanti waktu tuk berjumpa\nTak saling kenal namun takdir punya cara meramu, lewat 1 teman aku dituntun ke arahmu",
  "Kita bak sebuah niscaya, menyingkap banyak kesamaan kian tumbuh rasa percaya\nSelera kita pada durian dan floral berpadu memukau, hingga lelap pun kita kompak suka mengigau",
  "Dari fajar menyapa hingga malam berkuasa, layar merekam masa, senyummu yang penuh rasa\nMembuat jarak tak lagi punya kuasa, aku kamu menjadi kita yang penuh dengan asa",
  "Kau adalah kabar yang tak pernah alpa menyapa, pengertianmu membuat segala raguku terlupa\nSaat duniaku riuh kau hadir mendukung dan memberi kekuatan, membawa jiwaku selalu menemukan ketenangan",
  "Pencarianku berhenti di sini, pada kamu yang kunanti, Yakinlah hati, kamulah satu-satunya yang ingin kuabadi\n**Izinkan aku memintamu untuk tetap terus di sisi, maukah kau menjadi kekasih hati, bersamaku hingga akhir nanti?**"
];

function App() {
  const [index, setIndex] = useState(0);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [saidYes, setSaidYes] = useState(false);
  const [currentPage, setCurrentPage] = useState<"landing" | "poem" | "journey" | "tree">("landing");

  const goNext = () => {
    setIndex((prev) => (prev + 1) % POEM_LINES.length);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + POEM_LINES.length) % POEM_LINES.length);
  };

  const runAwayNo = () => {
    // Move far enough so cursor won't be hovering after click
    // Random direction, but always at least 120px away from current position
    const angle = Math.random() * 2 * Math.PI;
    const distance = 150 + Math.random() * 100; // 150-250px away
    const randomX = Math.cos(angle) * distance;
    const randomY = Math.sin(angle) * distance * 0.6; // Less vertical movement
    setNoOffset({ x: randomX, y: randomY });
    setNoClickCount((prev) => prev + 1);
  };

  const fireConfetti = () => {
    // Fire confetti from both sides
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.3, y: 0.6 },
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.7, y: 0.6 },
    });
    // Extra burst from center
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
      });
    }, 200);
  };

  const celebrateYes = () => {
    // Hide the plea message and show journey button
    setNoClickCount(0);
    setSaidYes(true);
    fireConfetti();
  };

  if (currentPage === "landing") {
    return <Landing onStart={() => setCurrentPage("poem")} />;
  }

  if (currentPage === "journey") {
    return (
      <Journey 
        onBack={() => setCurrentPage("poem")} 
        onTree={() => setCurrentPage("tree")}
      />
    );
  }

  if (currentPage === "tree") {
    return <HarmonyTree onBack={() => setCurrentPage("journey")} />;
  }

  return (
    <div className="page">
      <div className="poem-shell">
        {/* Confetti button - shows after saying Yes on last page */}
        {saidYes && index === POEM_LINES.length - 1 && (
          <button className="confetti-button" onClick={fireConfetti}>
            Click This! 🎉
          </button>
        )}

        <main className="poem-main">
          {/* 
            Using key={index} forces React to remount this block on change,
            so the CSS animation restarts every time.
          */}
          <div key={index} className="poem-line splash-in">
            {parseText(POEM_LINES[index])}
          </div>

          {index === POEM_LINES.length - 1 && (
            <div className="answer-buttons">
              {!saidYes ? (
                <>
                  <button className="answer-button yes" onClick={celebrateYes}>Yes</button>
                  <button
                    className="answer-button no"
                    onMouseEnter={runAwayNo}
                    onClick={runAwayNo}
                    style={{
                      transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                      transition: "transform 150ms ease-out",
                    }}
                  >
                    No
                  </button>
                </>
              ) : (
                <button 
                  className="journey-button splash-in"
                  onClick={() => setCurrentPage("journey")}
                >
                  😊 Let's See Our Journey So Far
                </button>
              )}
            </div>
          )}
        </main>

        <div className={`plea-message ${noClickCount >= 5 ? "visible" : ""}`}>
          Please don't say NO 😢
        </div>

        <footer className="poem-footer">
          <button
            className={`nav-button ${index === 0 ? "hidden" : ""}`}
            onClick={goPrev}
          >
            ← prev
          </button>
          <span className="line-indicator">
            {index + 1} / {POEM_LINES.length}
          </span>
          <button
            className={`nav-button ${index === POEM_LINES.length - 1 ? "hidden" : ""}`}
            onClick={goNext}
          >
            next →
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;


