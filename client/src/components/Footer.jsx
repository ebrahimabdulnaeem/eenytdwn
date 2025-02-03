import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const StyledFooter = styled(Box)({
  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.97) 0%, rgba(22, 33, 62, 0.97) 100%)',
  color: 'white',
  padding: '4rem 0 3rem',
  marginTop: 'auto',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
    backgroundSize: '30px 30px',
    opacity: 0.5,
    pointerEvents: 'none',
  },
});

const FooterContent = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem',
  position: 'relative',
  zIndex: 1,
});

const FooterLogo = styled(Link)({
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

const SocialLinks = styled(Box)({
  display: 'flex',
  gap: '1.5rem',
  '& .MuiIconButton-root': {
    color: 'white',
    transition: 'all 0.3s ease',
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    '&:hover': {
      transform: 'translateY(-5px)',
      background: 'rgba(255, 255, 255, 0.2)',
      '& .MuiSvgIcon-root': {
        color: '#673ab7',
        filter: 'drop-shadow(0 0 10px rgba(103, 58, 183, 0.5))',
      },
    },
  },
});

const FooterLinks = styled(Box)({
  display: 'flex',
  gap: '2rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginBottom: '1rem',
  '& .footer-link': {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '1.1rem',
    position: 'relative',
    padding: '0.5rem 0',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '0%',
      height: '2px',
      background: 'linear-gradient(90deg, #673ab7, transparent)',
      transition: 'width 0.3s ease',
    },
    '&:hover': {
      color: '#ffffff',
      '&::after': {
        width: '100%',
      },
    },
  },
  '@media (max-width: 600px)': {
    gap: '1rem',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
});

const Copyright = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.7)',
  textAlign: 'center',
  fontSize: '1rem',
  position: 'relative',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    width: '50px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
  },
  '&::before': {
    right: '120%',
  },
  '&::after': {
    left: '120%',
  },
  '@media (max-width: 600px)': {
    '&::before, &::after': {
      width: '30px',
    },
  },
});

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterLogo to="/">
          <YouTubeIcon />
          <Typography variant="h5">
            YT Downloader
          </Typography>
        </FooterLogo>

        <FooterLinks>
          <Link to="/" className="footer-link">الرئيسية</Link>
          <Link to="/features" className="footer-link">المميزات</Link>
          <Link to="/how-to-use" className="footer-link">كيفية الاستخدام</Link>
          <Link to="/privacy" className="footer-link">الخصوصية</Link>
          <Link to="/contact" className="footer-link">اتصل بنا</Link>
        </FooterLinks>

        <SocialLinks>
          <IconButton
            aria-label="YouTube"
            component="a"
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon />
          </IconButton>
          <IconButton
            aria-label="Facebook"
            component="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            aria-label="Twitter"
            component="a"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            aria-label="Instagram"
            component="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </IconButton>
        </SocialLinks>

        <Copyright variant="body2">
          {`جميع الحقوق محفوظة © YT Downloader ${new Date().getFullYear()}`}
        </Copyright>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer; 