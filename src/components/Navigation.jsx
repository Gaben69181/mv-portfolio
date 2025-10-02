import React, { useEffect, useState } from 'react';
/* Single-page anchors: no react-router Link */
import { useTheme } from '../hooks/useTheme.js';
import './Navigation.css';

const Navigation = () => {
  // Theme is forced to 'dark' by ThemeProvider, but it keep the class for consistency
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // Always fixed header; add blur only after user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intercept anchor clicks so we scroll and then remove the hash from the URL
  const onNavClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const { pathname, search } = window.location;
    window.history.replaceState({}, '', pathname + search); // remove #hash without reloading
  };

  return (
    <nav className={`navbar ${theme} ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#hero" onClick={onNavClick} className="brand brand--white">Rynix</a>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#hero" onClick={onNavClick} className="nav-link nav-link--white">Home</a>
          </li>
          <li className="nav-item">
            <a href="#portfolio" onClick={onNavClick} className="nav-link nav-link--white">Portfolio</a>
          </li>
          <li className="nav-item">
            <a href="#pricing" onClick={onNavClick} className="nav-link nav-link--white">Pricing</a>
          </li>
          <li className="nav-item">
            {/* Terms uses the former About route */}
            <a href="#terms" onClick={onNavClick} className="nav-link nav-link--white">Terms</a>
          </li>
          <li className="nav-item">
            <a href="#contact" onClick={onNavClick} className="nav-link nav-link--white">Contact</a>
          </li>
        </ul>
      </div>
    </nav>

    
  );
};

export default Navigation;
