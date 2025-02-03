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

    const { url, itag } = event.queryStringParameters;
    
    if (!url || !itag) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL and itag parameters are required' })
      };
    }

    console.log('Downloading video:', url, 'with itag:', itag);
    
    const stream = ytdl(url, {
      quality: itag,
      filter: format => format.itag === itag
    });

    // Convert stream to buffer
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment'
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    console.error('Error in download function:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: error.message || 'An error occurred while downloading the video' 
      })
    };
  }
}; 