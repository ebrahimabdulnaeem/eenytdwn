import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography, Box, Alert, CircularProgress, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Download from './pages/Download';
import Features from './pages/Features';
import HowToUse from './pages/HowToUse';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import UrlInput from './components/UrlInput';
import VideoInfo from './components/VideoInfo';
import DownloadOptions from './components/DownloadOptions';
import { getVideoInfo, downloadVideo } from './utils/api';

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

const HeroSection = styled(Box)({
  minHeight: '50vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 0',
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(103, 58, 183, 0.1) 0%, transparent 70%)',
  }
});

const ContentSection = styled(Container)({
  padding: '2rem 0',
  position: 'relative',
  zIndex: 1
});

const GlowingTitle = styled('h1')({
  fontSize: '4rem',
  fontWeight: '900',
  marginBottom: '1.5rem',
  background: 'linear-gradient(45deg, #ffffff 20%, #673ab7 50%, #ffffff 80%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 30px rgba(103, 58, 183, 0.3)',
  animation: 'shine 3s linear infinite',
  '@keyframes shine': {
    '0%': {
      backgroundPosition: '0% center',
    },
    '100%': {
      backgroundPosition: '200% center',
    },
  },
  '@media (max-width: 600px)': {
    fontSize: '2.5rem',
  },
});

const Subtitle = styled('h2')({
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '1.4rem',
  maxWidth: '800px',
  margin: '0 auto 3rem',
  lineHeight: 1.6,
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  '@media (max-width: 600px)': {
    fontSize: '1.1rem',
    margin: '0 auto 2rem',
  },
});

const StyledAlert = styled(Alert)(({ theme }) => ({
  borderRadius: '15px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(103, 58, 183, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  animation: 'slideIn 0.3s ease-out',
  '@keyframes slideIn': {
    from: {
      transform: 'translateY(-20px)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
}));

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  '& .MuiCircularProgress-root': {
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(103, 58, 183, 0.7)',
    },
    '70%': {
      transform: 'scale(1)',
      boxShadow: '0 0 0 10px rgba(103, 58, 183, 0)',
    },
    '100%': {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(103, 58, 183, 0)',
    },
  },
});

function App() {
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleUrlSubmit = async (url) => {
    setLoading(true);
    setError('');
    setVideoInfo(null);
    setCurrentUrl(url);
    setShowSuccessMessage(false);

    try {
      if (!url.trim()) {
        throw new Error('يرجى إدخال رابط فيديو يوتيوب');
      }

      try {
        new URL(url);
      } catch {
        throw new Error('يرجى إدخال رابط صحيح');
      }

      const info = await getVideoInfo(url);
      setVideoInfo(info);
      setShowSuccessMessage(true);
    } catch (err) {
      console.error('Error fetching video:', err);
      setError(err.message || 'فشل في جلب معلومات الفيديو. يرجى التحقق من الرابط والمحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (itag, title) => {
    try {
      await downloadVideo(currentUrl, itag, title);
    } catch (err) {
      console.error('Download error:', err);
      setError(err.message || 'فشل بدء التحميل. يرجى المحاولة مرة أخرى.');
    }
  };

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