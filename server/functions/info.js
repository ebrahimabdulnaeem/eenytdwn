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
    const info = await ytdl.getInfo(url);
    
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

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(videoInfo)
    };
  } catch (error) {
    console.error('Error in info function:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: error.message || 'An error occurred while fetching video information' 
      })
    };
  }
}; 