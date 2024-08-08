"use client";

import { useState } from 'react';
import Alert from './Alert';
import Review from './Review';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Button.css';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserModal, setShowUserModal] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [prompt, setPrompt] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const reconnect = () => {
    const ws = new WebSocket("wss://cbapi-v3wc.onrender.com/chatbox");
    setWebSocket(ws)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowReview(false); 
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUserSubmit = () => {
    if (!userName) {
      setAlertMessage('Please enter your name.');
      setShowAlert(true);
      return;
    }
    if (!userEmail || !validateEmail(userEmail)) {
      setAlertMessage('Please enter a valid email address.');
      setShowAlert(true);
      return;
    }
    setShowUserModal(false);
    setShowAlert(false);

    const ws = new WebSocket("wss://cbapi-v3wc.onrender.com/chatbox");
    ws.onmessage = function (event) {
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: event.data }]);
    };
    setWebSocket(ws);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const makePrompt = () => {
    const input = document.getElementById('messageInput');
    if (prompt.length === 0) {
      return;
    }
    webSocket.send(prompt);
    setMessages(prevMessages => [...prevMessages, { sender: 'user', text: prompt }]);
    setPrompt('');
    input.value = '';
  };

  const endChat = () => {
    setShowReview(true); 
  };

  return (
    <div>
      <div
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '5px',
          right: '20px',
          backgroundColor: '#B165BC',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '30px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        Do you need help?
      </div>

      {isOpen && !showUserModal && !showReview && (
        <div
          style={{
            position: 'fixed',
            bottom: '60px',
            right: '20px',
            width: '300px',
            height: '400px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <button
              onClick={() => reconnect()}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                color: 'black'
              }}
            >
              <i className="fas fa-sync-alt" style={{ color: 'black' }}></i>
            </button>
            <button
              onClick={endChat}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                color: 'black'
              }}
            >
              ✖
            </button>
          </div>
          <div id='chatbox' style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
            <p className="font-bold">Hello, {userName}. How can I help you?</p>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  justifyContent: msg.sender === 'bot' ? 'flex-start' : 'flex-end', 
                  marginBottom: '10px' 
                }}
              >
                <div 
                  style={{ 
                    backgroundColor: msg.sender === 'bot' ? '#e0e0e0' : '#B165BC', 
                    color: msg.sender === 'bot' ? 'black' : 'white', 
                    padding: '10px', 
                    borderRadius: '10px', 
                    maxWidth: '70%' 
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              id='messageInput'
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Escribe un mensaje..."
              style={{
                flex: 1,
                padding: '5px',
                boxSizing: 'border-box',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginRight: '5px'
              }}
            />
            <button
              onClick={makePrompt}
              style={{
                background: '#B165BC',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}

      {isOpen && showReview && <Review onClose={toggleChat} userName={userName} userEmail={userEmail} />}

      {isOpen && showUserModal && (
        <div
          style={{
            position: 'fixed',
            bottom: '60px',
            right: '20px',
            width: '300px',
            height: '400px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
          }}
        >
          <div
            style={{
              marginBottom: '10px',
              textAlign: 'right',
            }}
          >
            <button
              onClick={toggleChat}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              ✖
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
            <p className="font-bold">Please enter your details to start chatting:</p>
            {showAlert && <Alert onClose={closeAlert} message={alertMessage} />}
            <input
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '30px',
                marginBottom: '30px',
                boxSizing: 'border-box',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '30px',
                boxSizing: 'border-box',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <button
              onClick={handleUserSubmit}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#B165BC',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Start Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
