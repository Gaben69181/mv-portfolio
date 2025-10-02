import React from 'react';
import './Services.css';
import { useTheme } from '../hooks/useTheme.js';

const items = [
  'Music Video',
  'Nightcore Music Video',
  'Anime Music Video',
  'Stinger/Intro/Outro',
];

const Services = () => {
  const { theme } = useTheme();

  return (
    <div className={`services-section section-tone-services ${theme}`} id="services">
      <div className="container">
        <h2 className={`section-title ${theme}`}>Services</h2>
        <ul className="simple-services-list">
          {items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Services;