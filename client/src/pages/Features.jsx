import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

const StyledContainer = styled(Container)({
  paddingTop: '120px',
  paddingBottom: '60px',
});

const FeatureCard = styled(Paper)({
  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
  backdropFilter: 'blur(16px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '2rem',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 40px 0 rgba(103, 58, 183, 0.3)',
  },
});

const FeatureIcon = styled(Box)({
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
  {
    icon: <CloudDownloadIcon />,
    title: 'تحميل بدون قيود',
    description: 'تحميل غير محدود للفيديوهات بدون تسجيل حساب أو قيود على عدد مرات التحميل.',
  },
  {
    icon: <AudiotrackIcon />,
    title: 'استخراج الصوت',
    description: 'إمكانية تحميل الصوت فقط من الفيديو بصيغة MP3 عالية الجودة.',
  },
];

const Features = () => {
  return (
    <StyledContainer maxWidth="lg">
      <Typography
        variant="h2"
        component="h1"
        align="center"
        sx={{
          mb: 6,
          color: 'white',
          fontWeight: 'bold',
          textShadow: '0 0 20px rgba(103, 58, 183, 0.3)',
        }}
      >
        مميزات التطبيق
      </Typography>
      
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FeatureCard elevation={3}>
              <FeatureIcon>
                {feature.icon}
              </FeatureIcon>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  mb: 2,
                  color: 'white',
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
    </StyledContainer>
  );
};

export default Features; 