const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();

router.get('/info', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'يرجى إدخال رابط الفيديو' });
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'رابط الفيديو غير صالح' });
    }

    const info = await ytdl.getInfo(url);
    const formats = info.formats
      .filter(format => format.hasVideo) // Only include formats with video
      .map(format => ({
        itag: format.itag,
        quality: format.qualityLabel || format.quality,
        hasAudio: format.hasAudio,
        hasVideo: format.hasVideo,
        container: format.container,
        codecs: format.codecs,
        contentLength: format.contentLength,
      }));

    res.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0].url,
      duration: info.videoDetails.lengthSeconds,
      formats: formats,
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ 
      error: 'حدث خطأ أثناء جلب معلومات الفيديو. يرجى المحاولة مرة أخرى' 
    });
  }
});

router.get('/download', async (req, res) => {
  try {
    const { url, itag } = req.query;
    if (!url || !itag) {
      return res.status(400).json({ 
        error: 'يرجى تحديد رابط الفيديو وجودة التحميل' 
      });
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'رابط الفيديو غير صالح' });
    }

    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: itag });

    if (!format) {
      return res.status(400).json({ 
        error: 'جودة الفيديو المطلوبة غير متوفرة' 
      });
    }

    res.setHeader('Content-Type', format.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${info.videoDetails.title}.${format.container}"`);

    ytdl(url, { format: format })
      .on('error', (err) => {
        console.error('Download error:', err);
        res.status(500).json({ 
          error: 'حدث خطأ أثناء تحميل الفيديو. يرجى المحاولة مرة أخرى' 
        });
      })
      .pipe(res);
  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).json({ 
      error: 'حدث خطأ أثناء تحميل الفيديو. يرجى المحاولة مرة أخرى' 
    });
  }
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app); 