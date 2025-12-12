// Sample events - replace photos with your own!
const EVENTS = [
  {
    date: "23 October 2025",
    photo: "https://i.imgur.com/TZL0ysL.png",
    description: "Krisan ngenalin kamu ke aku dan kamu juga mau kenalan",
  },
  {
    date: "3 November 2025",
    photo: "https://i.imgur.com/qTzF3vy.png",
    description: "Aku baru berani buat kenalan sama kamu",
  },
  {
    date: "6 November 2025",
    photo: "https://i.imgur.com/J1p5CMu.png",
    description: "Kamu mau aku diwawancara, tapi sayangnya bukan sama kamu :(",
  },
  {
    date: "6 November 2025",
    photo: "https://i.imgur.com/vGEmbvN.png",
    description: "Ya aku minta ganti rewardlah buat tau nomer HP kamu",
  },
  {
    date: "7 November 2025",
    photo: "https://i.imgur.com/OKgtTEt.png",
    description: "Main roblox bareng sampe pagi + sleep call pertama kali",
  },
  {
    date: "8 November 2025",
    photo: "https://i.imgur.com/E85fqjM.jpeg",
    description: "Besokannya telfonan di discord sampe shubuh lagiii",
  },
  {
    date: "8 November 2025",
    photo: "https://i.imgur.com/s5NeTG9.png",
    description: "Gombal pertamaku",
  },
  {
    date: "8 November 2025",
    photo: "https://i.imgur.com/xum0scD.png",
    description: "First love reaction from youuu",
  },
  {
    date: "10 November 2025",
    photo: "https://i.imgur.com/Y1jNKg4.png",
    description: "zdcscsf first sticker yang bikin baper dari kamu",
  },
  {
    date: "12 November 2025",
    photo: "https://i.imgur.com/pTG0pRm.png",
    description: "Gemes banget, ini first photo yang gak one-time dari kamu",
  },
  {
    date: "14 November 2025",
    photo: "https://i.imgur.com/xLi1xVA.png",
    description: "Video call pertama kalii",
  },
  {
    date: "19 November 2025",
    photo: "https://i.imgur.com/eIRWFqP.png",
    description: "First time dipanggil sayang sama kamu dichat (harusnya udah manggil sayang duluan pas dicall siih)",
  },
  {
    date: "25 November 2025",
    photo: "https://i.imgur.com/R7OMNjk.png",
    description: "HAHA momen unik kamu minum dari galon!",
  },
  {
    date: "5 Desember 2025",
    photo: "https://i.imgur.com/ud1W7hj.png",
    description: "Diucapin selamat ulang tahun pake paper!!!",
  },
  {
    date: "7 Desember 2025",
    photo: "https://i.imgur.com/10zLRmz.png",
    description: "Full of love dari kitaaa!!",
  },
  {
    date: "8 November 2025 - sekarang",
    photo: "https://i.imgur.com/KGkd5Ds.png",
    description: "Sleep call tiap hariii <3",
  },
  {
    date: "13 Desember 2025",
    photo: "https://i.imgur.com/SDlUcBt.png",
    description: "SOON!! I'm coming for youuuu",
  },
];

interface JourneyProps {
  onBack: () => void;
  onTree: () => void;
}

function Journey({ onBack, onTree }: JourneyProps) {
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
        <button className="tree-button" onClick={onTree}>
          🌳 See Our Tree of Harmony
        </button>
      </div>
    </div>
  );
}

export default Journey;

