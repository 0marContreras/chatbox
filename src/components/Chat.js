"use client";

import { useState } from 'react';
import Alert from './Alert';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserModal, setShowUserModal] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSubmit = () => {
    if (userName && userEmail) {
      setShowUserModal(false);
      setShowAlert(false); 
    } else {
      setShowAlert(true); 
    }
  };

  const closeAlert = () => {
    setShowAlert(false); 
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

      {isOpen && !showUserModal && (
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
            <p className="font-bold">Hello, {userName}. ¿How can I help you?</p>
          </div>
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            style={{
              width: '100%',
              padding: '10px',
              boxSizing: 'border-box',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      )}

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
            {showAlert && <Alert onClose={closeAlert} />} {/* Show alert if there is an error */}
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
