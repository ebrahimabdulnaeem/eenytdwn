import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import DevicesIcon from '@mui/icons-material/Devices';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

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
    background: 'radial-gradient(circle at 20% 20%, rgba(103, 58, 183, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(63, 81, 181, 0.15) 0%, transparent 40%)',
    pointerEvents: 'none',
  },
});

const FeatureSection = styled(Box)({
  padding: '6rem 0',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.5) 0%, rgba(22, 33, 62, 0.5) 100%)',
    backdropFilter: 'blur(10px)',
    zIndex: -1,
  },
});

const StatsSection = styled(Box)({
  padding: '4rem 0',
  background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.1) 0%, rgba(63, 81, 181, 0.1) 100%)',
  backdropFilter: 'blur(10px)',
});

const GlowingTitle = styled(Typography)({
  fontSize: '4.5rem',
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

const FeatureCard = styled(Paper)({
  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
  backdropFilter: 'blur(16px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '2rem',
  height: '100%',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 40px 0 rgba(103, 58, 183, 0.3)',
  },
});

const StatCard = styled(Paper)({
  background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.2) 0%, rgba(63, 81, 181, 0.2) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '2rem',
  textAlign: 'center',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.3) 0%, rgba(63, 81, 181, 0.3) 100%)',
  },
});

const GetStartedButton = styled(Button)({
  background: 'linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)',
  color: 'white',
  padding: '1rem 3rem',
  fontSize: '1.2rem',
  borderRadius: '50px',
  textTransform: 'none',
  marginTop: '2rem',
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
    borderRadius: '52px',
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
});

const IconBox = styled(Box)({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: 'rgba(103, 58, 183, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1.5rem',
  '& .MuiSvgIcon-root': {
    fontSize: '30px',
    color: '#673ab7',
  },
});

const features = [
  {
    icon: <HighQualityIcon />,
    title: 'جودة عالية',
    description: 'تحميل الفيديوهات بأعلى جودة متاحة تصل إلى 1080p مع دعم الصوت عالي الجودة.',
  },
  {
    icon: <SpeedIcon />,
    title: 'سرعة في التحميل',
    description: 'خوارزميات متطورة تضمن أقصى سرعة تحميل ممكنة مع استقرار في الاتصال.',
  },
  {
    icon: <SecurityIcon />,
    title: 'آمن وموثوق',
    description: 'تحميل آمن بدون إعلانات مزعجة أو برامج ضارة، مع حماية خصوصية المستخدم.',
  },
  {
    icon: <DevicesIcon />,
    title: 'متوافق مع جميع الأجهزة',
    description: 'يعمل على جميع الأجهزة والمتصفحات، مع واجهة سهلة الاستخدام.',
  },
];

const stats = [
  {
    value: '10M+',
    label: 'عملية تحميل',
  },
  {
    value: '99.9%',
    label: 'نسبة النجاح',
  },
  {
    value: '24/7',
    label: 'دعم فني',
  },
  {
    value: '100%',
    label: 'مجاني',
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <HeroSection>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            <GlowingTitle variant="h1">
              أسرع وأسهل طريقة لتحميل فيديوهات يوتيوب
            </GlowingTitle>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              قم بتحميل فيديوهات يوتيوب المفضلة لديك بأعلى جودة وبصيغ متعددة. سريع، آمن، ومجاني تماماً!
            </Typography>
            <GetStartedButton
              variant="contained"
              onClick={() => navigate('/download')}
              startIcon={<CloudDownloadIcon />}
            >
              ابدأ التحميل الآن
            </GetStartedButton>
          </Box>
        </Container>
      </HeroSection>

      <FeatureSection>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              color: 'white',
              mb: 6,
              fontWeight: 'bold',
              textShadow: '0 0 20px rgba(103, 58, 183, 0.3)',
            }}
          >
            لماذا تختار YT Downloader؟
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard elevation={3}>
                  <IconBox>
                    {feature.icon}
                  </IconBox>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 'bold',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FeatureSection>

      <StatsSection>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <StatCard elevation={3}>
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 1,
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #ffffff, #673ab7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </StatCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StatsSection>
    </>
  );
}

export default Home; 