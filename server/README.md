# YouTube Video Downloader API

خادم API لتحميل مقاطع فيديو YouTube بتنسيقات وجودة مختلفة.

## نقاط النهاية API

### GET /video-info
الحصول على معلومات الفيديو وقائمة التنسيقات المتاحة.

### GET /download
تحميل الفيديو بالتنسيق المحدد.

## المتغيرات البيئية
- `PORT`: منفذ الخادم (الافتراضي: 3000)
- `NODE_ENV`: بيئة التشغيل
- `YOUTUBE_API_KEY`: مفتاح API يوتيوب
- `CORS_ORIGIN`: عنوان العميل المسموح به

## التشغيل
```bash
npm install
npm start
``` 