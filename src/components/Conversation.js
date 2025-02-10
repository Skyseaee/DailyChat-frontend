import React, { useState, useEffect } from'react';
import { conversation } from '../api/api';
import { useNavigate } from'react-router-dom';

const Conversation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [input, setInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    document.title = 'Conversation';
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter a message.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await conversation(input, token);
      setConversationHistory([...conversationHistory, { user: input, bot: response.data.response }]);
      setInput('');
    } catch (error) {
      console.error('Conversation failed:', error.message);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="conversation-container">
      <h2>Conversation</h2>
      {error && <p className="error">{error}</p>}
      <div className="conversation-history">
        {conversationHistory.map((entry, index) => (
          <div key={index}>
            <p><strong>User:</strong> {entry.user}</p>
            <p><strong>Bot:</strong> {entry.bot}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInputChange} placeholder="Type your message..." disabled={loading} />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Conversation;