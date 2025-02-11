import React from 'react';

const DiaryEntry = ({ diaryEntry, loading }) => {
  return (
    <div className="diary-entry">
      {loading ? (
        <p>加载中...</p>
      ) : (
        diaryEntry ? (
          <div className="diary-content">
            <h3>日记条目</h3>
            <pre>{JSON.stringify(diaryEntry, null, 2)}</pre>
          </div>
        ) : (
          <p>没有找到该日期的日记条目。</p>
        )
      )}
    </div>
  );
};

export default DiaryEntry;
