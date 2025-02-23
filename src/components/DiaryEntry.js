import React from 'react';

// DiaryEntryList.js
const DiaryEntryList = ({ entries, emptyMessage }) => {
  return (
    <div className="diary-list">
      {entries.length === 0 ? (
        <div className="empty-state">{emptyMessage}</div>
      ) : (
        entries.map((entry) => (
          <div key={entry.date} className="diary-card">
            <div className="date-badge">
              {new Date(entry.date).getDate()}日
            </div>
            <div className="content-box">
              {entry.daily_summary || <i>无详细内容</i>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DiaryEntryList;
