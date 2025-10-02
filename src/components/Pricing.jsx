import React from 'react';
import './ServicesPricing.css';
import './Pricing.css'; // reuse add-ons + typography helpers
import { useTheme } from '../hooks/useTheme.js';

/* Pricing tiers */

const tiers = [
  {
    key: 'simple',
    name: 'Simple Music Video',
    price: 60,
    currency: 'USD',
    unit: 'per 3 minutes',
    features: [
      'Simple effects, simple camera moves',
      'Basic text/lyrics animations',
      '1080p, 24/30 fps video',
      '2 minor revision included',
      'ETA 1–2 weeks',
    ],
    bg: {
      // youtubeId: 'YOUR_YOUTUBE_VIDEO_ID',
      youtubeId: 'DmiIRrM5qCw',
      // fileSrc: '/videos/simple.mp4',
    },
  },
  {
    key: 'semi',
    name: 'Semi-Complex Music Video',
    price: 90,
    currency: 'USD',
    unit: 'per 3 minutes',
    features: [
      'Camera moves, multiple scenes, transitions',
      'Enhanced visual flourishes',
      '1080p, 24/30 fps video',
      '3 minor revisions included',
      'ETA 2–3 weeks',
    ],
    bg: {
      youtubeId: 'O7XC7BEimMQ',
    },
  },
  {
    key: 'complex',
    name: 'Complex Music Video',
    price: 120,
    currency: 'USD',
    unit: 'per 3 minutes',
    features: [
      'Advanced camera + composite work',
      'Complex lyrics animation',
      '2D + 3D styled visuals',
      '1080p, 24/30 fps video',
      '5 minor revisions included',
      'ETA 2–4 weeks',
    ],
    bg: {
      youtubeId: 'rGPnFGt-ftY',
    },
  },
  {
    key: 'stinger',
    name: 'Stinger/Intro/Outro',
    price: 30,
    currency: 'USD',
    unit: 'per project',
    features: [
      '1080p, 24/30/60 fps video',
      '3 minor revision included',
      'ETA 1-2 weeks',
    ],
    bg: {
      youtubeId: '',
    },
  },
];

const addOns = [
  { name: 'Rush delivery', detail: '+20%–40% fee (schedule dependent)' },
  { name: 'Over than 3 minutes', detail: '+$20 per minute' },
  { name: 'Character animation', detail: '$50 (animation only) / $100 (requires redraw)' },
  { name: '3D scene', detail: 'Pricing upon request' },
  { name: 'Thumbnail design', detail: '$20 each' },
  { name: 'Source project files', detail: '$50 minimum (may increase with complexity)' },
  { name: 'Commercial / agency license', detail: '×2 base price' },
];



function YouTubePanelBg({ videoId }) {
  if (!videoId) return null;
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&playlist=${videoId}`;
  return (
    <iframe
      className="svp-panel-media"
      src={src}
      title="Background video"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

function FilePanelBg({ src }) {
  if (!src) return null;
  return (
    <video
      className="svp-panel-media"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}

function TierBanner({ tier, index, theme }) {
  const isEven = index % 2 === 1;
  const mode = tier.bg?.mode || 'youtube';
  const yid = tier.bg?.youtubeId;
  const fsrc = tier.bg?.fileSrc;
  const showYoutube = mode === 'youtube' && !!yid;
  const showFile = mode === 'file' && !!fsrc;
  return (
    <section className={`svp-tier ${theme} ${isEven ? 'is-even' : ''}`} id={`tier-${tier.key}`}>
      <div className={`svp-panel ${(showYoutube || showFile) ? 'has-media' : ''}`}>
        {(showYoutube || showFile) && (
          <div className="svp-panel-bg" aria-hidden="true">
            {showYoutube ? <YouTubePanelBg videoId={yid} /> : <FilePanelBg src={fsrc} />}
            <div className="svp-panel-scrim" />
            <div className="svp-panel-stripes" />
          </div>
        )}
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
      </div>

    </section>
  );
}

const Pricing = () => {
  const { theme } = useTheme();

  return (
    <section className={`svp-stack ${theme}`} id="pricing">
      <div className="container">
        <h2 className={`section-title ${theme}`}>Pricing</h2>
      </div>

      {tiers.map((tier, i) => (
        <TierBanner key={tier.key} tier={tier} index={i} theme={theme} />
      ))}

      {/* Add-Ons + Note at the bottom */}
      <section className="svp-bottom">
        <div className="container">
          <section className="addons-section">
            <h3 className="sub-title">Add-Ons</h3>
            <ul className="addon-list">
              {addOns.map((a, i) => (
                <li key={i}>
                  <span className="addon-name">{a.name}</span>
                  <span className="addon-dot">•</span>
                  <span className="addon-detail">{a.detail}</span>
                </li>
              ))}
            </ul>
          </section>


          <div className="disclaimer" style={{ marginTop: 0 }}>
            <p>
              Notes: Prices are baseline and may change based on complexity, assets quality, and specific requests.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Pricing;