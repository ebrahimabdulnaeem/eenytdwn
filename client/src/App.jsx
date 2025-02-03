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
  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.97) 0%, rgba(22, 33, 62, 0.97) 100%)',
  padding: '10rem 0 6rem 0',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
    backgroundSize: '30px 30px',
    opacity: 0.5,
    animation: 'gradient 15s ease infinite',
    pointerEvents: 'none',
  },
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 0%',
    },
    '50%': {
      backgroundPosition: '100% 100%',
    },
    '100%': {
      backgroundPosition: '0% 0%',
    },
  },
});

const ContentSection = styled(Container)({
  flex: 1,
  padding: '3rem 0',
  position: 'relative',
  zIndex: 1,
  '@media (max-width: 600px)': {
    padding: '2rem 1rem',
  },
});

const GlowingTitle = styled(Typography)({
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

const Subtitle = styled(Typography)({
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