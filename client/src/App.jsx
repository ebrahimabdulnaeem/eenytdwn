import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Download from './pages/Download';
import Features from './pages/Features';
import HowToUse from './pages/HowToUse';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';

const MainContent = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)',
  color: 'white',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 20%, rgba(103, 58, 183, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(63, 81, 181, 0.15) 0%, transparent 40%)',
    pointerEvents: 'none',
  }
});

function App() {
  return (
    <Router>
      <MainContent>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<Download />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </MainContent>
    </Router>
  );
}

export default App; 