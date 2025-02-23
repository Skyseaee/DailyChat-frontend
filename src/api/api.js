import axios from 'axios';

// 配置环境变量（建议在项目根目录创建 .env 文件）
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// 请求拦截器（自动添加token）
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 统一错误处理
const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    const message = data?.error || `请求失败 (${status})`;
    throw new Error(message);
  }
  throw new Error('网络连接异常，请检查网络设置');
};

export const conversation = async (input) => {
  try {
    const response = await api.post('/api/v1/conversation', { input });
    return {
      success: true,
      response: response.response || response // 兼容新旧版本
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// 用户认证相关API
export const login = {
  login: async (credentials) => {
    try {
      const response = await api.post('/api/v1/login', {}, {
        auth: credentials,
      });
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  },

  register: async (username, password) => {
    try {
      const response = await api.post('/api/v1/register', {
        username,
        password
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// 日记相关API
export const diaryApi = {
  // 获取日记列表（支持分页和过滤）
  getDiaries: async (params = {}) => {
    try {
      const response = await api.get('/api/v1/diaries', {
        params: {
          page: 1,
          per_page: 20,
          ...params
        }
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  // 获取单日日记
  getDailyDiary: async (date, user_id) => {
    try {
      const response = await api.get(`/api/v1/diaries`, {
        params: { date, user_id }
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // 生成每日总结
  generateDailySummary: async (date) => {
    try {
      const response = await api.post('/api/v1/generate-daily-summary', { date });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getDailyDiaryByMonth: async (year, month, user_id) => {
    try {
      const response = await api.get('/api/v1/monthly-diaries', {
        params: { 
          year: String(year).padStart(4, '0'), // 确保4位年份
          month: String(month).padStart(2, '0'), // 确保2位月份
          user_id 
        }
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getMonthlyDiaryByYear: async (year, user_id) => {
    try {
      const response = await api.get('/api/v1/yearly-monthly-diaries', {
        params: { 
          year: String(year).padStart(4, '0'), // 确保4位年份
          user_id 
        }
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

// 月度总结相关API
export const summaryApi = {
  // 获取月度总结列表
  getMonthlySummaries: async (year, user_id) => {
    try {
      const response = await api.get('/api/v1/monthly-summaries', {
        params: { year, user_id }
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // 生成月度总结
  generateMonthlySummary: async (year, month) => {
    try {
      const response = await api.post('/api/v1/generate-monthly-summary', {
        year,
        month
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// 对话相关API
export const chatApi = {
  sendMessage: async (message) => {
    try {
      const response = await api.post('/api/v1/conversation', {
        input: message
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

export const generateYearlyMonthlySummaries = {
    generateSummarise: async (month, year) => {
      try {
        const response = await api.post('/api/v1/generate-monthly-summary', {
          month, year 
        })
      } catch (error) {
        return handleApiError(error)
      }
    }
};

export const getDiariesByMonth = {
  getMonthlySummaries: async (year) => {
    try {
      const response = await api.get('/api/v1/monthly-summaries', {
        params: { year }
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};
