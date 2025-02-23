import React from 'react';

// MonthlySummaryList.js
const MonthlySummaryList = ({ summaries, emptyMessage }) => {
  if (!summaries?.length) return <div className="empty-message">{emptyMessage}</div>;

  return (
    <div className="summary-grid">
      {summaries.map(summary => (
        <div key={summary.month} className="summary-card">
          <h4>{formatMonthToChinese(summary.month)}</h4>
          <p className="summary-content">
            {summary.monthly_summary || '该月暂无总结'}
          </p>
          <div className="summary-footer">
            <span>
              生成时间: {getLastDayOfMonth(summary.month)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const formatMonthToChinese = (month) => {
  const [year, monthNum] = month.split('-');
  return `${year}年${parseInt(monthNum)}月`; // 去掉前导零
};

const getLastDayOfMonth = (month) => {
  const [year, monthNum] = month.split('-').map(Number); // 拆分并转换为数字
  const date = new Date(year, monthNum, 0); 
  return date.toLocaleDateString(); 
};

export default MonthlySummaryList;
