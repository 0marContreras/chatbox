
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Review = ({ onClose, userName, userEmail }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [thankYouMessage, setThankYouMessage] = useState('');
  const [review, setReview] = useState({ name: userName, email: userEmail, score: 0 });

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  const handleClick = async (index) => {
    setSelectedIndex(index);
    setThankYouMessage('Gracias por tu opinión');
    const score = index + 1;
    setReview((prevReview) => ({ ...prevReview, score }));

    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...review, score }), 
    });

    if (!response.ok) {
      console.error('Error al enviar la reseña');
    }
  };

  return (
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
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <div
        style={{
          marginBottom: '10px',
          textAlign: 'right',
          width: '100%',
        }}
      >
        <button
          onClick={onClose}
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
      <p className="font-bold">Por favor, califica tu experiencia:</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {[...Array(5)].map((_, index) => (
          <i
            key={index}
            className="fas fa-star"
            style={{
              fontSize: '24px',
              margin: '0 5px',
              cursor: 'pointer',
              color: (index <= hoverIndex || index <= selectedIndex) ? 'yellow' : '#ccc',
              transition: 'color 0.2s',
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          ></i>
        ))}
      </div>
      {thankYouMessage && <p style={{ marginTop: '20px', color: 'green' }}>{thankYouMessage}</p>}
    </div>
  );
};

export default Review;
