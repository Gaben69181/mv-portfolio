import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import { fetchPlaylists } from '../services/youtubeService';
import { useTheme } from '../hooks/useTheme.js';

const playlistsConfig = [
  { id: 'PLJdq_e0uqDaP_SDJ2-4DBdq8Opnn82wWm', title: 'Vtuber Music Video' },
  { id: 'PLJdq_e0uqDaMCJVxX5U5x4IrVZ_9aDdTn', title: 'Nightcore Music Video' },
  { id: 'PLJdq_e0uqDaMQ317ribSPr_zw08uh3LJw', title: 'Anime Music Video' },
];

function getFgEmbed(videoId) {
  const params = new URLSearchParams({
    autoplay: '0',
    mute: '0',
    controls: '1',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1',
    origin: window.location.origin,
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}


const Portfolio = () => {
  const { theme } = useTheme();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Load playlists
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchPlaylists(playlistsConfig, 10);
        setPlaylists(data);
      } catch (e) {
        console.error(e);
        setError('Failed to load playlists. Ensure VITE_YT_API_KEY and playlist IDs are set.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);


  if (loading) {
    return (
      <div className={`portfolio-section section-tone-portfolio ${theme}`} id="portfolio">
        <div className="container">
          <h2 className={`section-title ${theme}`}>My Portfolio</h2>
          <div className={`loading ${theme}`}>Loading portfolio...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`portfolio-section section-tone-portfolio ${theme}`} id="portfolio">
        <div className="container">
          <h2 className={`section-title ${theme}`}>My Portfolio</h2>
          <div className={`error ${theme}`}>{error}</div>
          <div className={`error ${theme}`} style={{ marginTop: 12, fontSize: '0.95rem' }}>
            Setup: create a .env in project root with:
            <br />
            <code>VITE_YT_API_KEY=YOUR_YOUTUBE_API_KEY</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`portfolio-section section-tone-portfolio ${theme}`} id="portfolio">
      <div className="container">
        <h2 className={`section-title ${theme}`}>My Portfolio</h2>

        <div className="playlists-container">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="playlist">
              <h3 className={`playlist-title ${theme}`}>{playlist.title}</h3>

              <div className="portfolio-grid">
                {playlist.videos.map((video, idx) => {
                  const total = playlist.videos ? playlist.videos.length : 0;
                  const shownIndex = total - idx;

                  return (
                    <div
                      key={video.id}
                      className={`portfolio-item ${theme}`}
                    >

                      {/* Foreground video (click to play; no autoplay) */}
                      <div className="video-container">
                        <iframe
                          id={`fg-${video.id}`}
                          src={getFgEmbed(video.id)}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      <div className="portfolio-info">
                        <h4 className={`title ${theme}`}>{video.title}</h4>
                        <p className={`video-index ${theme}`}>#{shownIndex}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Portfolio;