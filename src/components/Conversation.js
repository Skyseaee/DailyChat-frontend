import React, { useState, useEffect, useRef } from 'react';
import { conversation } from '../api/api';
import { useNavigate } from 'react-router-dom';
import './Conversation.css';

const Conversation = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const conversationContainerRef = useRef(null);

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

    // 在用户提交前，先显示“小助手正在输入中 . . .”
    setConversationHistory(prev => [
      ...prev, 
      { user: input, bot: '小助手正在输入中 . . .' }
    ]);
    setInput('');

    // 滚动到底部
    if (conversationContainerRef.current) {
      conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
    }

    try {
      const user_id = localStorage.getItem('user_id')
      const response = await conversation(input, user_id);

      // 替换“小助手正在输入中 . . .”为真实回复
      setConversationHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { user: input, bot: response.response.data.response };
        return newHistory;
      });

      // 再次滚动到底部
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
      <div className="conversation-history" ref={conversationContainerRef}>
        {conversationHistory.map((entry, index) => (
          <div key={index} className="conversation-entry">
          <div className="user-message-container">
            <p className="user-label"><strong>用户:</strong></p>
            <div className="user-message">{entry.user}</div>
          </div>
          <div className="bot-message-container">
            <p className="bot-label"><strong>小助手:</strong></p>
            <div className="bot-message">{entry.bot}</div>
          </div>
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
