const ytdl = require('youtube-dl-exec');

exports.handler = async (event) => {
  try {
    const { url, itag } = event.queryStringParameters;

    if (!url || !itag) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'يرجى تقديم رابط الفيديو ومعرف الجودة' })
      };
    }

    const downloadUrl = await ytdl(url, {
      format: itag,
      getUrl: true,
      noCheckCertificates: true,
      noWarnings: true
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ url: downloadUrl })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'حدث خطأ أثناء تحميل الفيديو' })
    };
  }
}; 