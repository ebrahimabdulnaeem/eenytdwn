import express from 'express';
import cors from 'cors';
import youtubeDl from 'youtube-dl-exec';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Readable } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize YouTube API
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyCeqaVB01zut1WBkEIBXJEfZziZK6ZB_vY'
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'حدث خطأ في الخادم' });
});

// Validate YouTube URL
const isValidYouTubeUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const isYoutube = ['youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com'].includes(hostname);
    
    if (!isYoutube) return false;
    
    if (hostname === 'youtu.be') {
      return urlObj.pathname.length > 1;
    }
    
    const videoId = urlObj.searchParams.get('v');
    return !!videoId;
  } catch (e) {
    console.error('URL validation error:', e);
    return false;
  }
};

// Get video ID from URL
const getVideoId = (url) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    return urlObj.searchParams.get('v');
  } catch (e) {
    console.error('Error getting video ID:', e);
    return null;
  }
};

// Get video info using YouTube API
const getVideoDetails = async (videoId) => {
  try {
    console.log('Fetching video details for ID:', videoId);
    const response = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      id: [videoId]
    });

    if (!response.data.items || response.data.items.length === 0) {
      throw new Error('فيديو غير موجود');
    }

    const video = response.data.items[0];
    console.log('Video details fetched successfully');
    return {
      apiInfo: video,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url,
      duration: video.contentDetails.duration,
      author: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount
    };
  } catch (error) {
    console.error('YouTube API Error:', error);
    throw error;
  }
};

// Get available formats using youtube-dl
const getFormats = async (url) => {
  try {
    const info = await youtubeDl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    });

    return info.formats
      .filter(format => {
        return (
          format.ext === 'mp4' &&
          format.format_note &&
          !format.format_note.includes('2160p') &&
          !format.format_note.includes('1440p')
        );
      })
      .map(format => ({
        itag: format.format_id,
        quality: format.format_note,
        mimeType: 'video/mp4',
        hasAudio: format.acodec !== 'none',
        hasVideo: format.vcodec !== 'none',
        contentLength: format.filesize,
        fps: format.fps,
      }))
      .sort((a, b) => {
        const getQualityNumber = (quality) => parseInt(quality?.replace('p', '') || '0');
        return getQualityNumber(b.quality) - getQualityNumber(a.quality);
      });
  } catch (error) {
    console.error('Error getting formats:', error);
    throw error;
  }
};

// Get video info
app.get('/api/video-info', async (req, res) => {
  try {
    console.log('Received video info request:', req.query);
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'يرجى إدخال رابط فيديو يوتيوب' });
    }

    if (!isValidYouTubeUrl(url)) {
      return res.status(400).json({ error: 'رابط يوتيوب غير صالح. يرجى التأكد من صحة الرابط' });
    }

    const videoId = getVideoId(url);
    if (!videoId) {
      return res.status(400).json({ error: 'لم يتم العثور على معرف الفيديو في الرابط' });
    }

    // Get video details from YouTube API
    const videoDetails = await getVideoDetails(videoId);
    console.log('Video details retrieved successfully');

    // Get available formats
    console.log('Fetching video formats...');
    const formats = await getFormats(url);
    console.log(`Found ${formats.length} available formats`);

    // Combine API info with formats
    res.json({
      ...videoDetails,
      formats: formats,
    });

  } catch (error) {
    console.error('Video info error:', error);
    let errorMessage = 'حدث خطأ أثناء جلب معلومات الفيديو';
    
    if (error.message.includes('age-restricted')) {
      errorMessage = 'هذا الفيديو مقيد بالعمر ولا يمكن تحميله';
    } else if (error.message.includes('private')) {
      errorMessage = 'هذا الفيديو خاص ولا يمكن الوصول إليه';
    } else if (error.message.includes('copyright')) {
      errorMessage = 'هذا الفيديو غير متاح بسبب قيود حقوق النشر';
    }
    
    res.status(400).json({ error: errorMessage });
  }
});

// Download video
app.get('/api/download', async (req, res) => {
  try {
    console.log('Received download request:', req.query);
    const { url, itag } = req.query;

    if (!url || !itag) {
      return res.status(400).json({ error: 'يجب تحديد رابط الفيديو وتنسيق التحميل' });
    }

    if (!isValidYouTubeUrl(url)) {
      return res.status(400).json({ error: 'رابط يوتيوب غير صالح' });
    }

    const videoId = getVideoId(url);
    if (!videoId) {
      return res.status(400).json({ error: 'لم يتم العثور على معرف الفيديو' });
    }

    console.log('Getting video details...');
    const videoDetails = await getVideoDetails(videoId);
    
    const sanitizedTitle = videoDetails.title.replace(/[^\w\s-]/g, '');
    res.header('Content-Disposition', `attachment; filename="${sanitizedTitle}.mp4"`);
    
    console.log('Starting download stream...');
    const downloadProcess = youtubeDl.exec(url, {
      format: itag,
      output: '-',
    });

    downloadProcess.stdout.pipe(res);
    console.log('Download stream started successfully');

  } catch (error) {
    console.error('Download error:', error);
    res.status(400).json({ error: 'فشل تحميل الفيديو. يرجى المحاولة مرة أخرى' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server time: ${new Date().toISOString()}`);
  console.log('CORS enabled for http://localhost:3000');
}); 