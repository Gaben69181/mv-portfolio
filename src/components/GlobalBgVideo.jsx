import React from 'react';

const GlobalBgVideo = ({ videoId, active }) => {
  if (!videoId) return null;

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

  return (
    <div className={`global-bg-video ${active ? 'visible' : 'hidden'}`}>
      <div className="gbg-tint" />
      <iframe
        key={videoId}
        src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
        title={`bg-${videoId}`}
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
};

export default GlobalBgVideo;