import axios from 'axios';

const API_URL = 'http://localhost:8000'; // 后端地址，根据实际情况修改

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 登录
export const login = (credentials) => api.post('/login', null, { auth: credentials });

// 对话
export const conversation = (input, token) => api.post('/conversation', { input }, { headers: { Authorization: `Bearer ${token}` } });

// 生成每日总结
export const generateDailySummary = (date, token) => api.post('/generate_daily_summary', { date }, { headers: { Authorization: `Bearer ${token}` } });

// 生成每月总结
export const generateMonthlySummary = (month, year, token) => api.post('/generate_monthly_summary', { month, year }, { headers: { Authorization: `Bearer ${token}` } });

// 获取日记
export const getDiary = (date, token) => api.get('/diary', { params: { date }, headers: { Authorization: `Bearer ${token}` } });