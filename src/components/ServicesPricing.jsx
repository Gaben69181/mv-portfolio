import React from 'react';
import './ServicesPricing.css';
import { useTheme } from '../hooks/useTheme.js';

/**
 * Background video options per tier:
 * - mode: 'youtube' | 'file' | 'none'
 *   Default is 'youtube'. If the selected mode has no source (empty youtubeId or fileSrc),
 *   no background video will be rendered (blank background).
 *
 * To set a YouTube background, provide bg.youtubeId (e.g., 'dQw4w9WgXcQ').
 * To use a local/file video, set mode: 'file' and provide bg.fileSrc (e.g., '/videos/bg.mp4').
 */
const DEFAULT_BG_MODE = 'youtube';

const tiers = [
  {
    key: 'simple',
    name: 'Simple Music Video',
    price: 60,
    currency: 'USD',
    unit: 'per minute',
    features: [
      'Simple effects, minimal clean design',
      'Basic text/lyrics animations',
      '1080p, 30/60 fps video',
      '1 minor revision included',
      'ETA 1–2 weeks',
    ],
    bg: {
      // mode: 'youtube' | 'file' | 'none' (optional; defaults to 'youtube')
      // youtubeId: 'YOUR_YOUTUBE_VIDEO_ID',
      youtubeId: '', // leave blank by default; will render plain background
      // fileSrc: '/path/to/video.mp4',
    },
  },
  {
    key: 'semi',
    name: 'Standard/Semi Complex Music Video',
    price: 80,
    currency: 'USD',
    unit: 'per minute',
    features: [
      'Camera moves, multiple scenes, transitions',
      'Enhanced visual flourishes',
      '1080p, 30/60 fps video',
      '2 minor revisions included',
      'ETA 2–3 weeks',
    ],
    bg: {
      // youtubeId: '',
      youtubeId: '',
    },
  },
  {
    key: 'complex',
    name: 'Complex Music Video',
    price: 120,
    currency: 'USD',
    unit: 'per minute',
    features: [
      'Advanced camera + composite work',
      'Complex lyrics animation',
      '2D + 3D styled visuals',
      '1080p, 30/60 fps video',
      '3 minor revisions included',
      'ETA 2–4 weeks',
    ],
    bg: {
      // youtubeId: '',
      youtubeId: '',
    },
  },
  {
    key: 'stinger',
    name: 'Stinger/Intro/Outro',
    price: 50,
    currency: 'USD',
    unit: 'per project',
    features: [
      'Intros, outros, stingers',
      '1080p, 30/60 fps video',
      '1 minor revision included',
      'ETA 5–7 days',
    ],
    bg: {
      // youtubeId: '',
      youtubeId: '',
    },
  },
];

function YouTubeBg({ videoId }) {
  if (!videoId) return null;

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&playlist=${videoId}`;
  return (
    <div className="svp-bg svp-bg--youtube" aria-hidden="true">
      <iframe
        className="svp-bg-media"
        src={src}
        title="Background video"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen={false}
      />
    </div>
  );
}

function FileBg({ src }) {
  if (!src) return null;
  return (
    <div className="svp-bg svp-bg--file" aria-hidden="true">
      <video
        className="svp-bg-media"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}

function TierBanner({ tier, theme }) {
  const mode = tier.bg?.mode || DEFAULT_BG_MODE;
  const hasYouTube = mode === 'youtube' && !!tier.bg?.youtubeId;
  const hasFile = mode === 'file' && !!tier.bg?.fileSrc;

  return (
    <section className={`svp-tier ${theme}`} id={`tier-${tier.key}`}>
      {/* Background (optional) */}
      {hasYouTube && <YouTubeBg videoId={tier.bg.youtubeId} />}
      {hasFile && <FileBg src={tier.bg.fileSrc} />}
      {/* Overlay for readability */}
      <div className="svp-scrim" aria-hidden="true" />
      {/* Content */}
      <div className="svp-container">
        <div className="svp-content">
          <h3 className="svp-title">{tier.name}</h3>
          <div className="svp-sub">
            <span className="svp-start">Starting from</span>
            <span className="svp-price">
              <span className="svp-currency">$</span>
              <span className="svp-amount">{tier.price}</span>
              <span className="svp-code"> {tier.currency}</span>
            </span>
            {tier.unit && <span className="svp-unit">{tier.unit}</span>}
          </div>

          <ul className="svp-features">
            {tier.features.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Separators (top/bottom lines) */}
      <span className="svp-divider svp-divider--top" aria-hidden="true" />
      <span className="svp-divider svp-divider--bottom" aria-hidden="true" />
    </section>
  );
}

const ServicesPricing = () => {
  const { theme } = useTheme();

  return (
    <section className={`svp-stack ${theme}`} id="services-pricing">
      {/* Keep an accessible heading for the section without visual clutter */}
      <h2 className="sr-only">Services & Pricing</h2>

      {tiers.map((tier) => (
        <TierBanner key={tier.key} tier={tier} theme={theme} />
      ))}
    </section>
  );
};

export default ServicesPricing;