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
  ? '/.netlify/functions/api'
  : 'http://localhost:5000';

export const getVideoInfo = async (url) => {
  try {
    const response = await fetch(`${API_BASE_URL}/info?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch video info');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getVideoInfo:', error);
    throw error;
  }
};

export const downloadVideo = async (url, itag, title) => {
  try {
    const response = await fetch(`${API_BASE_URL}/download?url=${encodeURIComponent(url)}&itag=${itag}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to download video');
    }

    const contentType = response.headers?.['content-type'] || '';
    const extension = contentType.includes('video/mp4') ? 'mp4' : 'webm';
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
    throw error;
  }
}; 