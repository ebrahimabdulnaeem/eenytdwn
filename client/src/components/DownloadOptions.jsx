import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import HdIcon from '@mui/icons-material/Hd';
import VideocamIcon from '@mui/icons-material/Videocam';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import InfoIcon from '@mui/icons-material/Info';
import { formatFileSize } from '../utils/format';

const GlassTableContainer = styled(TableContainer)({
  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
  backdropFilter: 'blur(16px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(103, 58, 183, 0.2)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  position: 'relative',
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

const StyledTable = styled(Table)({
  '& .MuiTableCell-root': {
    borderColor: 'rgba(103, 58, 183, 0.2)',
    color: 'white',
    padding: '16px',
    transition: 'all 0.3s ease',
  },
  '& .MuiTableHead-root .MuiTableCell-root': {
    background: 'rgba(103, 58, 183, 0.15)',
    fontWeight: 'bold',
    fontSize: '1rem',
    backdropFilter: 'blur(8px)',
    borderBottom: '2px solid rgba(103, 58, 183, 0.3)',
  },
  '& .MuiTableBody-root .MuiTableRow-root': {
    transition: 'all 0.3s ease',
    position: 'relative',
    '&:hover': {
      background: 'rgba(103, 58, 183, 0.1)',
      transform: 'scale(1.01)',
      '& .MuiTableCell-root': {
        color: '#fff',
      },
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '5%',
      width: '90%',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(103, 58, 183, 0.2), transparent)',
    },
  },
});

const DownloadButton = styled(Button)({
  background: 'linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)',
  color: 'white',
  padding: '8px 20px',
  borderRadius: '25px',
  textTransform: 'none',
  boxShadow: '0 3px 15px rgba(103, 58, 183, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #3f51b5 30%, #673ab7 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 20px rgba(103, 58, 183, 0.4)',
  },
});

const AudioButton = styled(Button)({
  background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
  color: 'white',
  padding: '8px 20px',
  borderRadius: '25px',
  textTransform: 'none',
  boxShadow: '0 3px 15px rgba(63, 81, 181, 0.2)',
  transition: 'all 0.3s ease',
  marginLeft: '8px',
  '&:hover': {
    background: 'linear-gradient(45deg, #2196f3 30%, #3f51b5 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 20px rgba(63, 81, 181, 0.4)',
  },
});

const ButtonGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '8px',
});

const QualityChip = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '6px 14px',
  borderRadius: '15px',
  background: 'rgba(103, 58, 183, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  color: 'white',
  fontSize: '0.875rem',
  transition: 'all 0.3s ease',
  '& .MuiSvgIcon-root': {
    transition: 'all 0.3s ease',
    filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))',
  },
  '&:hover': {
    background: 'rgba(103, 58, 183, 0.25)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(103, 58, 183, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    '& .MuiSvgIcon-root': {
      transform: 'scale(1.2) rotate(5deg)',
      filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))',
    },
  },
});

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
    color: 'white',
    transition: 'all 0.3s ease',
    filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.1)',
    '& .MuiSvgIcon-root': {
      filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))',
    },
  },
});

const InfoChip = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '4px 8px',
  borderRadius: '12px',
  background: 'rgba(255, 152, 0, 0.15)',
  border: '1px solid rgba(255, 152, 0, 0.2)',
  color: 'white',
  fontSize: '0.75rem',
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
    color: '#ff9800',
  },
});

const TableTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1.5rem',
  color: 'white',
  textAlign: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-0.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '50px',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(103, 58, 183, 0.5), transparent)',
  },
});

const DownloadOptions = ({ formats, onDownload, videoInfo }) => {
  if (!formats || formats.length === 0) return null;

  const videoFormats = formats.filter(format => format.hasVideo && format.quality);
  const audioFormats = formats.filter(format => !format.hasVideo && format.hasAudio);

  const bestAudioFormat = audioFormats.reduce((best, current) => {
    if (!best || (current.contentLength && best.contentLength && current.contentLength > best.contentLength)) {
      return current;
    }
    return best;
  }, null);

  const getDownloadFileName = (format) => {
    const baseTitle = videoInfo?.title || 'video';
    const quality = format.hasVideo ? ` (${format.quality})` : ' (Audio)';
    const cleanTitle = (baseTitle + quality).replace(/[/\\?%*:|"<>]/g, '-');
    return cleanTitle;
  };

  return (
    <Box sx={{ mt: 4 }}>
      <TableTitle>
        اختر جودة التحميل المناسبة
      </TableTitle>
      
      <GlassTableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>الجودة</TableCell>
              <TableCell>النوع</TableCell>
              <TableCell>حجم الملف</TableCell>
              <TableCell>الصوت</TableCell>
              <TableCell align="right">التحميل</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videoFormats.map((format) => (
              <TableRow key={format.itag}>
                <TableCell>
                  <QualityChip>
                    <IconWrapper>
                      <HdIcon />
                    </IconWrapper>
                    {format.quality}
                  </QualityChip>
                </TableCell>
                <TableCell>
                  <QualityChip>
                    <IconWrapper>
                      <VideocamIcon />
                    </IconWrapper>
                    {format.mimeType.split(';')[0]}
                  </QualityChip>
                </TableCell>
                <TableCell>
                  <QualityChip>
                    <IconWrapper>
                      <DataUsageIcon />
                    </IconWrapper>
                    {formatFileSize(format.contentLength)}
                  </QualityChip>
                </TableCell>
                <TableCell>
                  <QualityChip>
                    <IconWrapper>
                      {format.hasAudio ? (
                        <VolumeUpIcon sx={{ 
                          color: 'white',
                          filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))'
                        }} />
                      ) : (
                        <VolumeOffIcon sx={{ 
                          color: 'rgba(255, 255, 255, 0.3)',
                          filter: 'none'
                        }} />
                      )}
                    </IconWrapper>
                    {format.hasAudio ? 'نعم' : 'لا'}
                  </QualityChip>
                  {!format.hasAudio && (
                    <Tooltip title="هذه الجودة لا تحتوي على صوت. يمكنك تحميل الصوت بشكل منفصل" arrow>
                      <InfoChip sx={{ ml: 1 }}>
                        <InfoIcon />
                        تنبيه
                      </InfoChip>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="right">
                  <ButtonGroup>
                    <DownloadButton
                      variant="contained"
                      size="small"
                      startIcon={<DownloadIcon />}
                      onClick={() => onDownload(format.itag, getDownloadFileName(format))}
                    >
                      تحميل الفيديو
                    </DownloadButton>
                    {!format.hasAudio && bestAudioFormat && (
                      <Tooltip title="تحميل الصوت بأعلى جودة متاحة" arrow>
                        <AudioButton
                          variant="contained"
                          size="small"
                          startIcon={<AudioFileIcon />}
                          onClick={() => onDownload(bestAudioFormat.itag, getDownloadFileName(bestAudioFormat))}
                        >
                          تحميل الصوت
                        </AudioButton>
                      </Tooltip>
                    )}
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </GlassTableContainer>
    </Box>
  );
};

export default DownloadOptions; 