const ytdl = require('ytdl-core');

exports.handler = async (event) => {
  try {
    // Enable CORS
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
        body: ''
      };
    }

    const { url } = event.queryStringParameters;
    
    if (!url) {
      console.error('Error: URL parameter is missing');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL parameter is required' })
      };
    }

    console.log('Fetching info for URL:', url);
    
    // Add options to handle age-restricted videos and use latest API version
    const info = await ytdl.getInfo(url, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        }
      }
    });

    if (!info || !info.videoDetails) {
      console.error('Error: Invalid video info response');
      throw new Error('Could not fetch video information');
    }
    
    const videoInfo = {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
      duration: info.videoDetails.lengthSeconds,
      author: info.videoDetails.author.name,
      views: info.videoDetails.viewCount,
      likes: info.videoDetails.likes || 0,
      description: info.videoDetails.description,
      formats: info.formats
        .filter(format => format.hasVideo && format.hasAudio)
        .map(format => ({
          itag: format.itag,
          quality: format.qualityLabel,
          container: format.container,
          size: format.contentLength
        }))
    };

    if (videoInfo.formats.length === 0) {
      console.error('Error: No valid formats found');
      throw new Error('No valid video formats available');
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(videoInfo)
    };
  } catch (error) {
    console.error('Error in info function:', error.message);
    console.error('Error stack:', error.stack);
    
    let statusCode = 500;
    let errorMessage = error.message || 'An error occurred while fetching video information';
    
    if (error.message.includes('Status code: 410')) {
      statusCode = 410;
      errorMessage = 'This video is no longer available';
    } else if (error.message.includes('private video')) {
      statusCode = 403;
      errorMessage = 'This video is private';
    } else if (error.message.includes('sign in')) {
      statusCode = 403;
      errorMessage = 'This video requires authentication';
    }

    return {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
}; 