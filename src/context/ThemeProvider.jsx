import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext.js';

export const ThemeProvider = ({ children }) => {
  // Force dark mode only
  const [theme] = useState('dark');

  // Ensure body has dark class for tokenized styles
  useEffect(() => {
    document.body.classList.add('dark');
    return () => {
      document.body.classList.remove('dark');
    };
  }, []);

  // No-op toggle since we only keep dark mode
  const toggleTheme = () => {};

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`app ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};