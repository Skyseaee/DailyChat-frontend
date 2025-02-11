import React, { useState, useEffect } from 'react';
import { generateMonthlySummary, getDiary } from '../api/api';
import { useNavigate } from 'react-router-dom';
import DiaryEntry from './DiaryEntry'; // 引入日记条目的子组件
import MonthlySummary from './MonthlySummary'; // 引入月度总结的子组件
import './Diary.css';  // 引入样式文件

const Diary = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [diaryEntry, setDiaryEntry] = useState(null); // 存储日记条目

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      // 加载页面时从后端获取已生成的日记
      const fetchDiary = async () => {
        setLoading(true);
        try {
          const response = await getDiary(date, token);
          setDiaryEntry(response.data);
        } catch (error) {
          console.error('获取日记失败:', error.message);
        }
        setLoading(false);
      };
      if (date) {
        fetchDiary();
      }
    }
  }, [token, date, navigate]);

  const handleDateChange = (e) => setDate(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  const handleGenerateMonthlySummary = async () => {
    setLoading(true);
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      navigate('/login');
      setLoading(false);
      return;
    }
    try {
      const response = await generateMonthlySummary(month, year, currentToken);
      setDiaryEntry(response.data.monthly_summary);
    } catch (error) {
      console.error('生成月度总结失败:', error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = '日记';
  }, []);

  return (
    <div className="diary-container">
      <h2>日记</h2>

      {/* 日期选择器 */}
      <div className="input-group">
        <label>选择日期:</label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="input-field"
        />
      </div>

      <div className="button-group">
        <button 
          onClick={() => setDate(date)} 
          disabled={!date || loading} 
          className="action-button"
        >
          获取日记条目
        </button>
      </div>

      {/* 月份和年份选择 */}
      <div className="input-group">
        <label>选择月份:</label>
        <input 
          type="number" 
          value={month} 
          onChange={handleMonthChange} 
          min="1" max="12" 
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label>选择年份:</label>
        <input 
          type="number" 
          value={year} 
          onChange={handleYearChange} 
          className="input-field"
        />
      </div>

      <button 
        onClick={handleGenerateMonthlySummary} 
        disabled={!month || !year || loading} 
        className="action-button"
      >
        生成月度总结
      </button>

      {/* 日记条目显示部分 */}
      <DiaryEntry diaryEntry={diaryEntry} loading={loading} />

      {/* 月度总结显示部分 */}
      <MonthlySummary month={month} year={year} loading={loading} />
    </div>
  );
};

export default Diary;
