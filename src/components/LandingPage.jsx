import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import { useTheme } from '../hooks/useTheme.js';
import { fetchPlaylists } from '../services/youtubeService';

// Play random video from these playlists on each refresh
const playlistsConfig = [
  { id: 'PLJdq_e0uqDaP_SDJ2-4DBdq8Opnn82wWm', title: 'Music Video' },
  { id: 'PLJdq_e0uqDaMCJVxX5U5x4IrVZ_9aDdTn', title: 'Nightcore Music Video' },
  { id: 'PLJdq_e0uqDaMQ317ribSPr_zw08uh3LJw', title: 'Anime Music Video' },
];

function getBgEmbed(videoId) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    loop: '1',
    playlist: videoId,
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

const linesScript = [
  'Hello, Rynix here!',
  'Bringing your concepts to life.',
  "Let's explore!",
];

const LandingPage = () => {
  const { theme } = useTheme();
  const [videoId, setVideoId] = useState(null);

  // typing state
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [doneLines, setDoneLines] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchPlaylists(playlistsConfig, 15);
        const allVideos = (data || []).flatMap((p) => p.videos || []);
        if (allVideos.length > 0 && mounted) {
          const rand = Math.floor(Math.random() * allVideos.length);
          setVideoId(allVideos[rand].id);
        }
      } catch (e) {
        console.warn('Landing random video load failed:', e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // typewriter per line with smooth stack transition
  useEffect(() => {
    if (currentLine >= linesScript.length) return;

    const full = linesScript[currentLine];
    let idx = 0;
    setCurrentText('');

    const typeInterval = setInterval(() => {
      idx += 1;
      setCurrentText(full.slice(0, idx));
      if (idx >= full.length) {
        clearInterval(typeInterval);
        // after finishing a line, lift it up (add to done) and continue with next
        setTimeout(() => {
          setDoneLines((prev) => [...prev, full]);
          setCurrentLine((ln) => ln + 1);
        }, 450); // small pause before next line starts
      }
    }, 32); // typing speed per character

    return () => clearInterval(typeInterval);
  }, [currentLine]);

  return (
    <section id="hero" className={`landing-hero section-tone-hero ${theme}`}>
      <div className="video-bg" aria-hidden="true">
        {videoId && (
          <iframe
            key={videoId}
            src={getBgEmbed(videoId)}
            title="landing-background"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
          />
        )}
        <div className="video-overlay" />
      </div>

      <div className="hero-inner">
        <div className="type-stack">
          {doneLines.map((ln, i) => (
            <p className="typed-line risen" key={`done-${i}`}>
              {ln}
            </p>
          ))}
          {currentLine < linesScript.length && (
            <p className="typed-line typing">
              {currentText}
              <span className="caret" />
            </p>
          )}
        </div>

        <div className="cta-row">
          <a href="#portfolio" className={`btn btn-hover-accent ${theme}`}>View My Work</a>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;