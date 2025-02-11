import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'; // 引入外部CSS文件

const Navbar = () => {
  const navigate = useNavigate();
  
  // 状态初始化时直接从 localStorage 中获取 token
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // 监听组件更新，更新 isAuthenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
    window.location.reload(); // 解决 React 可能未检测到状态变化的问题
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        {!isAuthenticated ? (
          <NavLink to="/login" className="nav-item">登录</NavLink>
        ) : (
          <>
            <NavLink to="/conversation" className="nav-item">对话</NavLink>
            <NavLink to="/diary" className="nav-item">日记</NavLink>
            <button onClick={handleLogout} className="nav-item logout-button">登出</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
