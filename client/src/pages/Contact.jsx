import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const StyledContainer = styled(Container)({
  paddingTop: '120px',
  paddingBottom: '60px',
});

const ContactForm = styled(Paper)({
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

const StyledTextField = styled(TextField)({
  marginBottom: '1.5rem',
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
});

const SubmitButton = styled(Button)({
  background: 'linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)',
  color: 'white',
  padding: '12px 30px',
  borderRadius: '25px',
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  boxShadow: '0 3px 15px rgba(103, 58, 183, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 20px rgba(103, 58, 183, 0.4)',
  },
});

const ContactInfo = styled(Box)({
  display: 'flex',
  gap: '2rem',
  marginTop: '3rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const InfoCard = styled(Paper)({
  background: 'rgba(103, 58, 183, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '1.5rem',
  flex: '1 1 300px',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    background: 'rgba(103, 58, 183, 0.2)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: '#673ab7',
  },
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكن إضافة منطق إرسال النموذج إلى الخادم
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

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
        اتصل بنا
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
        هل لديك أي استفسارات أو اقتراحات؟ نحن هنا للمساعدة!
      </Typography>

      <ContactForm elevation={3}>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="الاسم"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <StyledTextField
            fullWidth
            label="البريد الإلكتروني"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <StyledTextField
            fullWidth
            label="الموضوع"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <StyledTextField
            fullWidth
            label="الرسالة"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <SubmitButton type="submit" variant="contained" fullWidth>
            إرسال الرسالة
          </SubmitButton>
        </form>
      </ContactForm>

      <ContactInfo>
        <InfoCard>
          <EmailIcon />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              البريد الإلكتروني
            </Typography>
            <Typography variant="body1" color="rgba(255, 255, 255, 0.8)">
              support@ytdownloader.com
            </Typography>
          </Box>
        </InfoCard>

        <InfoCard>
          <PhoneIcon />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              الهاتف
            </Typography>
            <Typography variant="body1" color="rgba(255, 255, 255, 0.8)">
              +1 234 567 890
            </Typography>
          </Box>
        </InfoCard>

        <InfoCard>
          <LocationOnIcon />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              العنوان
            </Typography>
            <Typography variant="body1" color="rgba(255, 255, 255, 0.8)">
              123 شارع الرئيسي، المدينة
            </Typography>
          </Box>
        </InfoCard>
      </ContactInfo>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{
            width: '100%',
            bgcolor: '#4caf50',
            color: 'white',
          }}
        >
          تم إرسال رسالتك بنجاح! سنقوم بالرد عليك في أقرب وقت ممكن.
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default Contact; 