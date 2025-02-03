import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledContainer = styled(Container)({
  paddingTop: '120px',
  paddingBottom: '60px',
});

const PolicySection = styled(Paper)({
  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
  backdropFilter: 'blur(16px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '2rem',
  marginBottom: '2rem',
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
  marginBottom: '1.5rem',
  '& .MuiSvgIcon-root': {
    fontSize: '30px',
    color: '#673ab7',
  },
});

const policies = [
  {
    icon: <SecurityIcon />,
    title: 'حماية البيانات',
    content: 'نحن نلتزم بحماية بياناتك الشخصية وخصوصيتك. لا نقوم بجمع أي معلومات شخصية إلا ما هو ضروري لتقديم خدماتنا. نحن نستخدم تقنيات التشفير المتقدمة لحماية بياناتك.',
  },
  {
    icon: <LockIcon />,
    title: 'أمان المعلومات',
    content: 'نستخدم بروتوكولات أمان متقدمة لحماية معلوماتك. جميع الاتصالات بين متصفحك وخوادمنا مشفرة باستخدام بروتوكول SSL/TLS.',
  },
  {
    icon: <VisibilityOffIcon />,
    title: 'عدم مشاركة البيانات',
    content: 'نحن لا نشارك أي معلومات مع أطراف ثالثة. جميع البيانات التي نجمعها تستخدم فقط لتحسين خدماتنا وتجربة المستخدم.',
  },
  {
    icon: <DeleteIcon />,
    title: 'حذف البيانات',
    content: 'نقوم بحذف جميع البيانات المؤقتة بشكل دوري. لا نحتفظ بأي معلومات عن عمليات التحميل السابقة أو روابط الفيديو.',
  },
];

const Privacy = () => {
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
        سياسة الخصوصية
      </Typography>

      <Typography
        variant="h6"
        align="center"
        sx={{
          mb: 4,
          color: 'rgba(255, 255, 255, 0.8)',
          maxWidth: '800px',
          margin: '0 auto 3rem',
        }}
      >
        نحن نأخذ خصوصيتك على محمل الجد. اقرأ سياسة الخصوصية الخاصة بنا لفهم كيفية حماية بياناتك.
      </Typography>

      {policies.map((policy, index) => (
        <PolicySection key={index} elevation={3}>
          <IconBox>
            {policy.icon}
          </IconBox>
          <Typography
            variant="h5"
            component="h3"
            sx={{
              mb: 2,
              fontWeight: 'bold',
            }}
          >
            {policy.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.7,
            }}
          >
            {policy.content}
          </Typography>
        </PolicySection>
      ))}

      <Typography
        variant="body2"
        align="center"
        sx={{
          mt: 4,
          color: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        * تم تحديث سياسة الخصوصية في {new Date().toLocaleDateString('ar-EG')}
      </Typography>
    </StyledContainer>
  );
};

export default Privacy; 