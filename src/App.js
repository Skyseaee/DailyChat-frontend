import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Conversation from './components/Conversation';
import Diary from './components/Diary';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/conversation" element={<Conversation />} />
        <Route path="/diary" element={<Diary />} />
      </Routes>
    </Router>
  );
}

export default App;
