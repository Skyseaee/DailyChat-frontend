import React, { useState, useEffect } from'react';
import { conversation } from '../api/api';
import { useNavigate } from'react-router-dom';

const Conversation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return null;
  }

  const [input, setInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await conversation(input, token);
      setConversationHistory([...conversationHistory, { user: input, bot: response.data.response }]);
      setInput('');
    } catch (error) {
      console.error('Conversation failed:', error.message);
    }
  };

  useEffect(() => {
    document.title = 'Conversation';
  }, []);

  return (
    <div className="conversation-container">
      <h2>Conversation</h2>
      <div className="conversation-history">
        {conversationHistory.map((entry, index) => (
          <div key={index}>
            <p><strong>User:</strong> {entry.user}</p>
            <p><strong>Bot:</strong> {entry.bot}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInputChange} placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Conversation;