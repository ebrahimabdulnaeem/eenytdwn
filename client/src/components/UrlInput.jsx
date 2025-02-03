import React, { useState } from 'react';
import { TextField, Button, Box, Paper, InputAdornment, Tooltip } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { styled } from '@mui/material/styles';

const GlassPaper = styled(Paper)({
  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
  backdropFilter: 'blur(16px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(103, 58, 183, 0.2)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 40px 0 rgba(103, 58, 183, 0.3)',
    border: '1px solid rgba(103, 58, 183, 0.2)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(103, 58, 183, 0.1) 0%, transparent 50%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  },
  '&:hover::before': {
    opacity: 1,
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#673ab7',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#673ab7',
    },
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#673ab7',
    },
  },
});

const DownloadButton = styled(Button)({
  background: 'linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)',
  color: 'white',
  padding: '12px 30px',
  borderRadius: '25px',
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  boxShadow: '0 3px 15px rgba(103, 58, 183, 0.2)',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'all 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 20px rgba(103, 58, 183, 0.4)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-1px)',
    boxShadow: '0 3px 15px rgba(103, 58, 183, 0.2)',
  },
});

const UrlInput = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (inputUrl) => {
    if (!inputUrl.trim()) {
      return 'Please enter a YouTube URL';
    }

    try {
      const urlObj = new URL(inputUrl);
      const isYouTube = ['youtube.com', 'www.youtube.com', 'youtu.be'].includes(urlObj.hostname);
      if (!isYouTube) {
        return 'Please enter a valid YouTube URL';
      }
    } catch {
      return 'Please enter a valid URL';
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateUrl(url);
    setError(validationError);

    if (!validationError) {
      onSubmit(url);
    }
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (error) {
      setError('');
    }
  };

  return (
    <GlassPaper elevation={3} sx={{ p: 3, mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <StyledTextField
            fullWidth
            variant="outlined"
            label="رابط اليوتيوب"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={handleUrlChange}
            error={!!error}
            helperText={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <YouTubeIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="أدخل رابط فيديو يوتيوب. الصيغ المدعومة: youtube.com/watch?v=... أو youtu.be/...">
                    <HelpOutlineIcon sx={{ cursor: 'help' }} />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <DownloadButton
            variant="contained"
            type="submit"
            size="large"
          >
            تحميل
          </DownloadButton>
        </Box>
      </form>
    </GlassPaper>
  );
};

export default UrlInput; 