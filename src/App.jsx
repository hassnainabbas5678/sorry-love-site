import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

function App() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [burstFlowers, setBurstFlowers] = useState([]);

  const floatingItems = useMemo(() => {
    const items = ["🌸", "🌹", "🌺", "💐", "🌷", "🌼", "❤️", "💖", "💕", "💗"];
    return Array.from({ length: 42 }, (_, index) => ({
      id: index,
      icon: items[index % items.length],
      left: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 1.8}rem`,
      duration: `${8 + Math.random() * 10}s`,
      delay: `${Math.random() * 10}s`,
      drift: `${-60 + Math.random() * 120}px`,
      opacity: 0.25 + Math.random() * 0.6,
    }));
  }, []);

  useEffect(() => {
    const tryAutoplay = async () => {
      if (!audioRef.current) return;

      try {
        audioRef.current.volume = 0.45;
        audioRef.current.muted = false;
        await audioRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
      } catch (error) {
        console.log("Autoplay with sound was blocked by the browser.");
      }
    };

    tryAutoplay();
  }, []);

  const startMusic = async () => {
    if (!audioRef.current) return;

    try {
      audioRef.current.muted = false;
      audioRef.current.volume = 0.45;
      await audioRef.current.play();
      setIsPlaying(true);
      setIsMuted(false);
    } catch (error) {
      console.log("Music could not start yet.");
    }
  };

  const toggleMute = async () => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      await startMusic();
      return;
    }

    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleGiftBoxClick = async () => {
    setGiftOpened(true);
    await startMusic();

    const newBurst = Array.from({ length: 18 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      icon: ["🤍", "🌼"][index % 2],
      x: Math.random() * 220 - 110,
      y: -(80 + Math.random() * 180),
      rotate: -180 + Math.random() * 360,
      delay: Math.random() * 0.25,
      size: 1.2 + Math.random() * 1.6,
    }));

    setBurstFlowers(newBurst);

    setTimeout(() => {
      setBurstFlowers([]);
    }, 2200);
  };

  return (
    <div className="app">
      <audio
        ref={audioRef}
        src="/assets/romantic-music.mp3"
        loop
        preload="auto"
        autoPlay
      />

      <div className="background-glow glow-1"></div>
      <div className="background-glow glow-2"></div>
      <div className="background-glow glow-3"></div>

      <div className="floating-layer" aria-hidden="true">
        {floatingItems.map((item) => (
          <span
            key={item.id}
            className="floating-item"
            style={{
              left: item.left,
              fontSize: item.size,
              animationDuration: item.duration,
              animationDelay: item.delay,
              opacity: item.opacity,
              "--drift-x": item.drift,
            }}
          >
            {item.icon}
          </span>
        ))}
      </div>

      <button
        className="music-toggle"
        onClick={toggleMute}
        aria-label={
          isMuted ? "Unmute background music" : "Mute background music"
        }
      >
        {isMuted ? "🔇 Unmute" : "🔊 Mute"}
      </button>

      <main className="hero">
        <section className="card">
          <p className="eyebrow">For the love of my life</p>

          <h1 className="title">I am truly sorry, my shiz.</h1>

          <p className="subtitle">
            You mean more to me than words will ever be able to hold.
          </p>

          <div className="photo-wrap">
            <img
              className="couple-photo"
              src="/assets/couple-photo.JPG"
              alt="Our beautiful memory together"
            />
          </div>

          <div className="message">
            <p>
              My love, I know I hurt you, and I am truly sorry. That was never
              my intention. Ive thought about everything again and again, wishing I
              had done better.
            </p>

            <p>
              You are one of the most beautiful parts of my life, not just
              because of your smile, your kindness, or your warmth, but because
              of the way you make my world feel softer, brighter, and full of
              meaning.
            </p>

            <p>
              I am sorry for the moments I failed to love you the way you
              deserved. I am sorry for the words, the silence, the
              misunderstanding, and for every second that made your heart feel
              heavy because of me.
            </p>

            <p>
              Please know this apology comes from the deepest place in my soul.
              I do not take your love for granted. I cherish you, I admire you,
              and I am grateful for you more than I say. If you allow me, I want
              to grow for you, and with you. I want to become someone who loves
              you the way you have always deserved to be loved.
            </p>

            <p className="signature">
              With all my love. ❤️
            </p>
          </div>

          <div className="surprise-section">
            <p className="surprise-title">A little surprise for you, my love</p>

            <button className="gift-box" onClick={handleGiftBoxClick}>
              <span className="gift-lid"></span>
              <span className="gift-body"></span>
              <span className="gift-ribbon gift-ribbon-vertical"></span>
              <span className="gift-ribbon gift-ribbon-horizontal"></span>
              <span className="gift-bow">🎀</span>

              {burstFlowers.map((flower) => (
                <span
                  key={flower.id}
                  className="burst-flower"
                  style={{
                    "--x": `${flower.x}px`,
                    "--y": `${flower.y}px`,
                    "--rotate": `${flower.rotate}deg`,
                    "--delay": `${flower.delay}s`,
                    "--size": `${flower.size}rem`,
                  }}
                >
                  {flower.icon}
                </span>
              ))}
            </button>

            <p className="gift-note">
              {giftOpened
                ? "I still remember how much you love lilies, so these are just for you. 🤍"
                : "Tap the box Sweetheart. 💕"}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
