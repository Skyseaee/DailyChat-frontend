import React from 'react';

const MonthlySummary = ({ month, year, loading }) => {
  return (
    <div className="monthly-summary">
      {loading ? (
        <p>加载中...</p>
      ) : (
        month && year && (
          <div className="monthly-summary-content">
            <h3>{year}年{month}月总结</h3>
            {/* 这里展示月度总结的内容，可能来自API */}
            <pre>{/* 这里显示月度总结内容 */}</pre>
          </div>
        )
      )}
    </div>
  );
};

export default MonthlySummary;
