import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%)',
  },
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem 2rem',
  '@media (max-width: 600px)': {
    padding: '1rem',
    flexDirection: 'column',
    gap: '1rem',
  },
});

const Logo = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '2.5rem',
    color: '#673ab7',
    filter: 'drop-shadow(0 0 10px rgba(103, 58, 183, 0.3))',
  },
  '& .MuiTypography-root': {
    fontWeight: '900',
    background: 'linear-gradient(45deg, #ffffff, #673ab7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
});

const NavLinks = styled(Box)({
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
  '@media (max-width: 600px)': {
    width: '100%',
    justifyContent: 'center',
    gap: '1rem',
  },
});

const NavButton = styled(Button)({
  color: 'white',
  textTransform: 'none',
  fontSize: '1.1rem',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '0',
    height: '0',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    transition: 'width 0.6s ease, height 0.6s ease',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
    '&::before': {
      width: '300px',
      height: '300px',
    },
  },
  '&.active': {
    background: 'rgba(103, 58, 183, 0.2)',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '30%',
      height: '2px',
      background: '#673ab7',
    },
  },
});

const GetStartedButton = styled(Button)({
  background: 'linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)',
  color: 'white',
  padding: '0.7rem 2rem',
  borderRadius: '25px',
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  isolation: 'isolate',
  border: '2px solid transparent',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: -1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '-2px',
    top: '-2px',
    width: 'calc(100% + 4px)',
    height: 'calc(100% + 4px)',
    background: 'linear-gradient(60deg, #673ab7, #3f51b5, #673ab7)',
    borderRadius: '27px',
    zIndex: -2,
    transition: 'opacity 0.3s ease-in-out',
    opacity: 0,
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 20px rgba(103, 58, 183, 0.4)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    '&::before': {
      transform: 'translateX(100%)',
    },
    '&::after': {
      opacity: 1,
    },
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: '0 2px 10px rgba(103, 58, 183, 0.3)',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(103, 58, 183, 0.3)',
  },
  '@media (max-width: 600px)': {
    width: '100%',
  },
});

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <Logo to="/">
          <YouTubeIcon />
          <Typography variant="h5">
            YT Downloader
          </Typography>
        </Logo>
        <NavLinks>
          <NavButton
            component={Link}
            to="/"
            className={isActive('/') ? 'active' : ''}
          >
            الرئيسية
          </NavButton>
          <NavButton
            component={Link}
            to="/features"
            className={isActive('/features') ? 'active' : ''}
          >
            المميزات
          </NavButton>
          <NavButton
            component={Link}
            to="/how-to-use"
            className={isActive('/how-to-use') ? 'active' : ''}
          >
            كيفية الاستخدام
          </NavButton>
          <GetStartedButton
            onClick={() => navigate('/download')}
          >
            ابدأ التحميل
          </GetStartedButton>
        </NavLinks>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header; 