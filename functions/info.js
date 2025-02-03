const ytdl = require('youtube-dl-exec');

exports.handler = async (event) => {
  try {
    const { url } = event.queryStringParameters;

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'يرجى تقديم رابط الفيديو' })
      };
    }

    const videoInfo = await ytdl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(videoInfo)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'حدث خطأ أثناء جلب معلومات الفيديو' })
    };
  }
}; 