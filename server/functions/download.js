const { YTDlpWrap } = require('yt-dlp-wrap');
const ytDlp = new YTDlpWrap();

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

    const { url, itag } = event.queryStringParameters;
    
    if (!url || !itag) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL and itag parameters are required' })
      };
    }

    console.log('Downloading video:', url, 'with format:', itag);
    
    // Download video using yt-dlp-wrap
    const output = await ytDlp.execPromise([
      url,
      '-f', itag,
      '-o', '-',
      '--no-warnings',
      '--no-call-home'
    ]);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment'
      },
      body: output.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    console.error('Error in download function:', error.message);
    console.error('Error stack:', error.stack);
    
    let statusCode = 500;
    let errorMessage = error.message || 'An error occurred while downloading the video';
    
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