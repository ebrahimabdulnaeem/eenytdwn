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

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions'
  : 'http://localhost:5000';

export const getVideoInfo = async (url) => {
  try {
    const response = await fetch(`${API_BASE_URL}/info?url=${encodeURIComponent(url)}`);
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('استجابة غير صالحة من الخادم');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل في جلب معلومات الفيديو');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in getVideoInfo:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى');
    }
    throw error;
  }
};

export const downloadVideo = async (url, itag, title) => {
  try {
    const response = await fetch(`${API_BASE_URL}/download?url=${encodeURIComponent(url)}&itag=${itag}`);
    
    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const error = await response.json();
        throw new Error(error.error || 'فشل في تحميل الفيديو');
      }
      throw new Error('فشل في تحميل الفيديو');
    }

    const contentType = response.headers.get('content-type');
    const extension = contentType?.includes('video/mp4') ? 'mp4' : 'webm';
    const blob = await response.blob();
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
    if (error.message === 'Failed to fetch') {
      throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى');
    }
    throw error;
  }
}; 