import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import About from './components/About';
import Contact from './components/Contact';
import { ThemeProvider } from './context/ThemeProvider.jsx';

function App() {
  return (
    <ThemeProvider>
      <div className="App single-page">
        <Navigation />
        <main className="main-content">
          <LandingPage />
          <Portfolio />
          <Pricing />
          <About />
        </main>
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;
