import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const GlassCard = styled(Card)({
  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
  backdropFilter: 'blur(16px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'white',
  boxShadow: '0 8px 32px 0 rgba(103, 58, 183, 0.2)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(103, 58, 183, 0.3)',
    border: '1px solid rgba(103, 58, 183, 0.2)',
  },
});

const StyledCardMedia = styled(CardMedia)({
  height: '300px',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '150px',
    background: 'linear-gradient(to top, rgba(26, 26, 46, 0.95), transparent)',
  },
});

const InfoChips = styled(Box)({
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  marginBottom: '1rem',
  '& .MuiChip-root': {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(103, 58, 183, 0.2)',
    },
  },
});

const StyledChip = styled(Chip)({
  background: 'rgba(103, 58, 183, 0.15)',
  color: 'white',
  borderRadius: '25px',
  border: '1px solid rgba(103, 58, 183, 0.2)',
  backdropFilter: 'blur(8px)',
  '& .MuiSvgIcon-root': {
    color: '#673ab7',
    filter: 'drop-shadow(0 0 4px rgba(103, 58, 183, 0.4))',
  },
  '&:hover': {
    background: 'rgba(103, 58, 183, 0.25)',
  },
});

const StyledDivider = styled(Divider)({
  margin: '1rem 0',
  borderColor: 'rgba(103, 58, 183, 0.2)',
  opacity: 0.5,
});

const VideoTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: 'white',
  '& .title-text': {
    background: 'linear-gradient(45deg, #ffffff, #673ab7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
});

const VideoDescription = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '1rem',
  lineHeight: '1.6',
  marginTop: '1rem',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-1rem',
    left: '0',
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, rgba(103, 58, 183, 0.5), transparent)',
  },
});

const VideoInfo = ({ videoInfo }) => {
  const { title, thumbnail, duration, author, views, likes, description } = videoInfo;

  const separateEmojiFromText = (text) => {
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F191}-\u{1F251}]|[\u{1F004}]|[\u{1F0CF}]|[\u{1F170}-\u{1F171}]|[\u{1F17E}-\u{1F17F}]|[\u{1F18E}]|[\u{3030}]|[\u{2B50}]|[\u{2B55}]|[\u{2934}-\u{2935}]|[\u{2B05}-\u{2B07}]|[\u{2B1B}-\u{2B1C}]|[\u{3297}]|[\u{3299}]|[\u{303D}]|[\u{00A9}]|[\u{00AE}]|[\u{2122}]/gu;
    
    const parts = text.split(emojiRegex);
    const emojis = text.match(emojiRegex) || [];
    
    const result = [];
    parts.forEach((part, index) => {
      if (part) result.push(<span key={`text-${index}`} className="title-text">{part}</span>);
      if (emojis[index]) result.push(<span key={`emoji-${index}`}>{emojis[index]}</span>);
    });
    
    return result;
  };

  return (
    <GlassCard>
      <StyledCardMedia
        image={thumbnail}
        title={title}
      />
      <CardContent>
        <VideoTitle variant="h5">
          {separateEmojiFromText(title)}
        </VideoTitle>
        
        <InfoChips>
          <StyledChip
            icon={<AccessTimeIcon />}
            label={duration}
          />
          <StyledChip
            icon={<PersonIcon />}
            label={author}
          />
          <StyledChip
            icon={<VisibilityIcon />}
            label={`${views} مشاهدة`}
          />
          <StyledChip
            icon={<ThumbUpIcon />}
            label={`${likes} إعجاب`}
          />
        </InfoChips>

        <StyledDivider />
        
        <VideoDescription>
          {description}
        </VideoDescription>
      </CardContent>
    </GlassCard>
  );
};

export default VideoInfo; 