
"use client"; 

import { useState } from 'react';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
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
      {isOpen && (
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
          <div  style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
            <p className='font-bold'>Hello, ¿How can I help you?</p>
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
    </div>
  );
};

export default Chat;
