import React, { useState, useEffect } from 'react';
import { 
  getDiariesByMonth, 
  summaryApi,
  diaryApi,
  generateYearlyMonthlySummaries 
} from '../api/api';
import { useNavigate } from 'react-router-dom';
import DiaryEntryList from './DiaryEntry';
import MonthlySummaryList from './MonthlySummary';
import './Diary.css';

const Diary = () => {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem('token'));
  const [currentDate] = useState(new Date());

  const [diaryData, setDiaryData] = useState(null); // 存储获取到的日记数据
  const [isModalOpen, setIsModalOpen] = useState(false); // 控制弹窗开关
  
  // 状态管理
  const [filterDate, setFilterDate] = useState('');
  const [filterMonth, setFilterMonth] = useState(currentDate.getMonth() + 1);
  const [filterYear, setFilterYear] = useState(currentDate.getFullYear());
  const [diaries, setDiaries] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState({
    diaries: false,
    summaries: false
  });
  const [error, setError] = useState(null);

  // 自动加载初始数据
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const user_id = localStorage.getItem('user_id')
    setError(null);

    // 获取本月日记
    setLoading(prev => ({...prev, diaries: true}));
    diaryApi.getDailyDiaryByMonth(filterYear, filterMonth, user_id)
    .then(data => {
        if (data.success) {
          setDiaries(data.data.entries || []); // 处理空数据情况
        } else {
          setError(data.error?.message || "获取数据失败");
        }
      }).catch(err => {
        setError("网络连接异常，请稍后重试");
        console.error("API Error:", err);
      }).finally(() => {
        setLoading(prev => ({...prev, diaries: false}));
      });

    // 获取本年总结
    setLoading(prev => ({...prev, summaries: true}));
    diaryApi.getMonthlyDiaryByYear(filterYear, user_id)
    .then(data => {
      if (data.success) {
        setSummaries(data.data.entries || []); // 处理空数据情况
      } else {
        setError(data.error?.message || "获取数据失败");
      }
    }).catch(err => {
      setError("网络连接异常，请稍后重试");
      console.error("API Error:", err);
    }).finally(() => {
      setLoading(prev => ({...prev, diaries: false}));
    });
      // .then(data => setSummaries(data))
      // .catch(console.error)
      // .finally(() => setLoading(prev => ({...prev, summaries: false})));

  }, [token, navigate, filterYear, filterMonth]);

  // 处理日期筛选
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!filterDate) return;

    setLoading(prev => ({...prev, diaries: true}));
    try {
      // 调用 getDailyDiary 方法获取单日日记
      const user_id = localStorage.getItem('user_id')
      const data = await diaryApi.getDailyDiary(filterDate, user_id);
      // 根据返回的数据结构进行处理
      // { status: 'success', data: [ { date: '2023-10-05', content: '...' }, ... ] }
      if (data) {
        console.log(data)
        // setDiaries(data.data);
        setDiaryData({
          date: data.date,
          content: data.daily_summary
        });
        setIsModalOpen(true);
      } else {
        throw new Error(data.message || '未找到日记');
      }
    } catch (error) {
      console.error('搜索失败:', error);
    }
    setLoading(prev => ({...prev, diaries: false}));
  };

  return (
    <div className="diary-container">
      <h2>日记系统</h2>

      {/* 顶部搜索栏 */}
      <div className="search-bar">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="search-input"
        />
        <button 
          onClick={handleSearch}
          disabled={!filterDate}
          className="search-button"
        >
          搜索特定日期
        </button>
      </div>

      {isModalOpen && (
        <DiaryModal 
          data={diaryData}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* 主要内容区域 */}
      <div className="content-wrapper">
        {/* 日记列表区块 */}
        <div className="diary-section">
          <h3>
            {filterYear}年{filterMonth}月日记
            <div className="loading-indicator">
              {loading.diaries && '加载中...'}
            </div>
          </h3>
          <DiaryEntryList 
            entries={diaries} 
            emptyMessage="本月暂无日记记录"
          />
        </div>

        {/* 月度总结区块 */}
        <div className="summary-section">
          <h3>
            {filterYear}年度月度总结
            <div className="loading-indicator">
              {loading.summaries && '加载中...'}
            </div>
          </h3>
          <MonthlySummaryList 
            summaries={summaries}
            emptyMessage="本年暂无月度总结"
          />
        </div>
      </div>
    </div>
  );
};

const DiaryModal = ({ data, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{data.date} 的日记</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="diary-content">
          <p>{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Diary;