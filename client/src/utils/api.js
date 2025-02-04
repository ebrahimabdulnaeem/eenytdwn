import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for logging
api.interceptors.request.use(
  config => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.status);
    return response;
  },
  error => {
    console.error('API Response Error:', error);
    if (error.code === 'ERR_NETWORK') {
      throw new Error('لا يمكن الاتصال بالخادم. يرجى التأكد من تشغيل الخادم والمحاولة مرة أخرى');
    }
    throw error.response?.data?.error || error.message || 'حدث خطأ غير معروف';
  }
);

export const getVideoInfo = async (url) => {
  try {
    const response = await api.get('/video-info', {
      params: { url }
    });
    return response.data;
  } catch (error) {
    console.error('Error in getVideoInfo:', error);
    throw error;
  }
};

export const downloadVideo = async (url, itag, title = 'video') => {
  try {
    const response = await api.get('/download', {
      params: { url, itag },
      responseType: 'blob'
    });

    // تنظيف عنوان الفيديو من الأحرف غير المسموح بها في اسم الملف
    const cleanTitle = (title || 'video').replace(/[/\\?%*:|"<>]/g, '-');
    
    // تحديد امتداد الملف بناءً على نوع المحتوى
    const contentType = response.headers?.['content-type'] || '';
    let extension = 'mp4'; // الامتداد الافتراضي

    // التحقق من نوع المحتوى بشكل آمن
    if (contentType) {
      if (contentType.toLowerCase().includes('audio')) {
        extension = 'mp3';
      } else if (contentType.toLowerCase().includes('video')) {
        extension = 'mp4';
      }
    }

    // إنشاء كائن Blob مع نوع المحتوى المناسب
    const blob = new Blob([response.data], { type: contentType || 'video/mp4' });
    
    // إنشاء رابط تحميل مؤقت
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `${cleanTitle}.${extension}`);
    
    // إضافة الرابط وتنفيذ التحميل
    document.body.appendChild(link);
    link.click();
    
    // تنظيف الموارد
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    }, 100);
  } catch (error) {
    console.error('Error in downloadVideo:', error);
    throw new Error('فشل في تحميل الفيديو. يرجى المحاولة مرة أخرى.');
  }
}; 