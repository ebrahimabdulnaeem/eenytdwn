import React from 'react';
import { Container, Typography, Box, Stepper, Step, StepLabel, StepContent, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinkIcon from '@mui/icons-material/Link';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DownloadIcon from '@mui/icons-material/Download';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const StyledContainer = styled(Container)({
  paddingTop: '120px',
  paddingBottom: '60px',
});

const StyledStepper = styled(Stepper)({
  '& .MuiStepLabel-root': {
    color: 'white',
  },
  '& .MuiStepLabel-label': {
    color: 'rgba(255, 255, 255, 0.8)',
    '&.Mui-active': {
      color: '#673ab7',
    },
    '&.Mui-completed': {
      color: '#4caf50',
    },
  },
  '& .MuiStepIcon-root': {
    color: 'rgba(255, 255, 255, 0.3)',
    '&.Mui-active': {
      color: '#673ab7',
    },
    '&.Mui-completed': {
      color: '#4caf50',
    },
  },
  '& .MuiStepConnector-line': {
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const StepBox = styled(Box)({
  marginBottom: '2rem',
  padding: '2rem',
  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
  backdropFilter: 'blur(16px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(103, 58, 183, 0.3)',
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
  marginBottom: '1rem',
  '& .MuiSvgIcon-root': {
    fontSize: '30px',
    color: '#673ab7',
  },
});

const steps = [
  {
    label: 'نسخ رابط الفيديو',
    description: 'قم بنسخ رابط فيديو يوتيوب الذي تريد تحميله من المتصفح.',
    icon: <LinkIcon />,
    tip: 'يمكنك نسخ الرابط من شريط العنوان في المتصفح أو من زر المشاركة في يوتيوب.',
  },
  {
    label: 'لصق الرابط',
    description: 'الصق رابط الفيديو في مربع البحث في موقعنا واضغط على زر التحميل.',
    icon: <VideoLibraryIcon />,
    tip: 'تأكد من أن الرابط صحيح وأن الفيديو متاح للمشاهدة.',
  },
  {
    label: 'اختيار الجودة',
    description: 'اختر جودة الفيديو المناسبة لك من القائمة المتاحة.',
    icon: <DownloadIcon />,
    tip: 'الجودة الأعلى تعني حجم ملف أكبر. اختر ما يناسب احتياجاتك وسرعة الإنترنت لديك.',
  },
  {
    label: 'بدء التحميل',
    description: 'اضغط على زر التحميل وانتظر حتى يكتمل تحميل الفيديو.',
    icon: <PlayCircleOutlineIcon />,
    tip: 'يمكنك تحميل الصوت فقط من الفيديو باختيار خيار "تحميل الصوت" المتاح.',
  },
];

const HowToUse = () => {
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
        كيفية الاستخدام
      </Typography>

      <StyledStepper orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index} active={true}>
            <StepLabel>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              <StepBox>
                <IconBox>
                  {step.icon}
                </IconBox>
                <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem' }}>
                  {step.description}
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(103, 58, 183, 0.1)',
                    border: '1px solid rgba(103, 58, 183, 0.2)',
                    borderRadius: '10px',
                  }}
                >
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                    💡 نصيحة: {step.tip}
                  </Typography>
                </Paper>
              </StepBox>
            </StepContent>
          </Step>
        ))}
      </StyledStepper>
    </StyledContainer>
  );
};

export default HowToUse; 