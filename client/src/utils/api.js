import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // استخدام المسار النسبي في الإنتاج
  : 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
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
      throw new Error('لا يمكن الاتصال بالخادم. يرجى التأكد من اتصال الإنترنت والمحاولة مرة أخرى');
    }
    throw error.response?.data?.error || error.message || 'حدث خطأ غير معروف';
  }
);

export const getVideoInfo = async (url) => {
  try {
    console.log('Fetching video info for URL:', url);
    const response = await api.get(`/.netlify/functions/info?url=${encodeURIComponent(url)}`);
    console.log('Video info response:', response.data);
    
    // التحقق من البيانات المستلمة
    if (!response.data || typeof response.data !== 'object') {
      console.error('Invalid response data:', response.data);
      throw new Error('استجابة غير صالحة من الخادم');
    }

    // التحقق من وجود الحقول المطلوبة
    const requiredFields = ['title', 'thumbnail', 'duration', 'author', 'views', 'likes', 'description', 'formats'];
    const missingFields = requiredFields.filter(field => !response.data[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      throw new Error('بيانات الفيديو غير مكتملة');
    }

    return response.data;
  } catch (error) {
    console.error('Error in getVideoInfo:', error);
    if (error.message === 'Network Error') {
      throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى');
    }
    throw new Error(error.response?.data?.error || error.message || 'فشل في جلب معلومات الفيديو');
  }
};

export const downloadVideo = async (url, itag, title) => {
  try {
    const response = await api.get(`/.netlify/functions/download?url=${encodeURIComponent(url)}&itag=${itag}`, {
      responseType: 'blob'
    });

    const contentType = response.headers['content-type'];
    const extension = contentType?.includes('video/mp4') ? 'mp4' : 'webm';
    const blob = new Blob([response.data], { type: contentType });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${title || 'video'}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 100);
  } catch (error) {
    console.error('Error in downloadVideo:', error);
    if (error.message === 'Network Error') {
      throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى');
    }
    throw new Error(error.response?.data?.error || error.message || 'فشل في تحميل الفيديو');
  }
}; 