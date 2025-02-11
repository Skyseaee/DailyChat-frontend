import React, { useState, useEffect, useRef } from 'react';
import { conversation } from '../api/api';
import { useNavigate } from 'react-router-dom';
import './Conversation.css'; // 引入外部CSS文件

const Conversation = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const conversationContainerRef = useRef(null); // 用于自动滚动

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await conversation(input, token);
      setConversationHistory(prev => [
        ...prev, 
        { user: input, bot: response.data.response }
      ]);
      setInput('');
      // 滚动到最新的对话
      if (conversationContainerRef.current) {
        conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
      }
    } catch (error) {
      console.error('对话失败:', error.message);
    }
  };

  useEffect(() => {
    document.title = '对话';
  }, []);

  return (
    <div className="conversation-container">
      <h2>对话</h2>
      
      {/* 历史对话 */}
      <div 
        className="conversation-history" 
        ref={conversationContainerRef}
      >
        {conversationHistory.map((entry, index) => (
          <div key={index} className="conversation-entry">
            <p><strong>用户:</strong> {entry.user}</p>
            <p><strong>小助手:</strong> {entry.bot}</p>
          </div>
        ))}
      </div>
      
      {/* 对话输入框及按钮 */}
      <form onSubmit={handleSubmit} className="conversation-form">
        <input 
          type="text" 
          value={input} 
          onChange={handleInputChange} 
          placeholder="请输入您的消息..." 
          className="conversation-input" 
        />
        <button type="submit" className="conversation-submit-button">发送</button>
      </form>
    </div>
  );
};

export default Conversation;