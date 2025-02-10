import React, { useState, useEffect } from 'react';
import { generateDailySummary, generateMonthlySummary, getDiary } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Diary = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [date, setDate] = useState('');
  const [diaryEntry, setDiaryEntry] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    document.title = 'Diary';
  }, [token, navigate]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleGenerateDailySummary = async () => {
    try {
      const response = await generateDailySummary(date, token);
      setDiaryEntry(response.data.daily_summary);
    } catch (error) {
      console.error('Generate daily summary failed:', error.message);
    }
  };

  const handleGenerateMonthlySummary = async () => {
    try {
      const response = await generateMonthlySummary(month, year, token);
      setDiaryEntry(response.data.monthly_summary);
    } catch (error) {
      console.error('Generate monthly summary failed:', error.message);
    }
  };

  const handleGetDiary = async () => {
    try {
      const response = await getDiary(date, token);
      setDiaryEntry(response.data);
    } catch (error) {
      console.error('Get diary failed:', error.message);
    }
  };

  return (
    <div className="diary-container">
      <h2>Diary</h2>
      <label>
        Date:
        <input type="date" value={date} onChange={handleDateChange} />
      </label>
      <button onClick={handleGenerateDailySummary}>Generate Daily Summary</button>
      <button onClick={handleGetDiary}>Get Diary Entry</button>
      <br />
      <label>
        Month:
        <input type="number" value={month} onChange={handleMonthChange} min="1" max="12" />
      </label>
      <label>
        Year:
        <input type="number" value={year} onChange={handleYearChange} />
      </label>
      <button onClick={handleGenerateMonthlySummary}>Generate Monthly Summary</button>
      <div>
        {diaryEntry && (
          <div>
            <h3>Diary Entry</h3>
            <p>{JSON.stringify(diaryEntry)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diary;