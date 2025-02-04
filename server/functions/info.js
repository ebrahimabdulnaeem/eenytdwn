const youtubedl = require('youtube-dl-exec');

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
    
    // Get video info using youtube-dl-exec
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true
    });

    if (!info) {
      console.error('Error: Invalid video info response');
      throw new Error('Could not fetch video information');
    }
    
    const videoInfo = {
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      author: info.uploader,
      views: info.view_count,
      likes: info.like_count || 0,
      description: info.description,
      formats: info.formats
        .filter(format => format.vcodec !== 'none' && format.acodec !== 'none')
        .map(format => ({
          itag: format.format_id,
          quality: format.height ? `${format.height}p` : 'Audio only',
          container: format.ext,
          size: format.filesize
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
    
    if (error.message.includes('Video unavailable')) {
      statusCode = 410;
      errorMessage = 'This video is no longer available';
    } else if (error.message.includes('Private video')) {
      statusCode = 403;
      errorMessage = 'This video is private';
    } else if (error.message.includes('Sign in')) {
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