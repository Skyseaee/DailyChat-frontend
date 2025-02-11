import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 引入外部CSS文件

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // 清除之前的错误信息
    try {
      const response = await login({ username, password });
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        console.log(response.data.token)
        navigate('/conversation');
      } else {
        throw new Error('服务器返回无效响应');
      }
    } catch (error) {
      setError('登录失败：用户名或密码错误');
      console.error('登录失败:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>登录</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>用户名：</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            placeholder="请输入用户名" 
          />
        </div>
        <div className="input-group">
          <label>密码：</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="请输入密码" 
          />
        </div>
        <button type="submit" className="submit-button">登录</button>
      </form>
    </div>
  );
};

export default Login;
