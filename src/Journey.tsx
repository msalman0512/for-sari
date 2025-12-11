// Sample events - replace photos with your own!
const EVENTS = [
  {
    date: "November 2024",
    photo: "https://placehold.co/300x300/1e3a5f/white?text=Photo+1",
    description: "The beginning of our story...",
  },
  {
    date: "November 2024",
    photo: "https://placehold.co/300x300/2d4a6f/white?text=Photo+2",
    description: "Getting to know each other better.",
  },
  {
    date: "December 2024",
    photo: "https://placehold.co/300x300/3d5a7f/white?text=Photo+3",
    description: "Our first memorable moment together.",
  },
  {
    date: "December 2024",
    photo: "https://placehold.co/300x300/4d6a8f/white?text=Photo+4",
    description: "Creating more beautiful memories.",
  },
  {
    date: "December 2024",
    photo: "https://placehold.co/300x300/5d7a9f/white?text=Photo+5",
    description: "And the journey continues... 💕",
  },
];

interface JourneyProps {
  onBack: () => void;
}

function Journey({ onBack }: JourneyProps) {
  return (
    <div className="journey-page">
      <header className="journey-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1 className="journey-title">Our Journey Together</h1>
      </header>

      <div className="timeline">
        {EVENTS.map((event, idx) => (
          <div
            key={idx}
            className={`timeline-event ${idx % 2 === 0 ? "left" : "right"}`}
          >
            <div className="event-photo">
              <img src={event.photo} alt={`Memory ${idx + 1}`} />
            </div>

            <div className="event-connector">
              <svg viewBox="0 0 60 200" preserveAspectRatio="none">
                <path
                  d={idx % 2 === 0 
                    ? "M30 0 Q50 50, 30 100 Q10 150, 30 200" 
                    : "M30 0 Q10 50, 30 100 Q50 150, 30 200"}
                  fill="none"
                  stroke="url(#riverGradient)"
                  strokeWidth="3"
                />
                <defs>
                  <linearGradient id="riverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="event-dot"></div>
            </div>

            <div className="event-content">
              <span className="event-date">{event.date}</span>
              <p className="event-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="journey-footer">
        <p>...and many more memories to come 💕</p>
      </div>
    </div>
  );
}

export default Journey;

