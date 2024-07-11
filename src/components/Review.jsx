import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Review = ({ onClose }) => {
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
      <p className="font-bold">Por favor, califica tu experiencia:</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {[...Array(5)].map((_, index) => (
          <i key={index} className="fas fa-star" style={{ fontSize: '24px', margin: '0 5px', cursor: 'pointer', color: '#ccc' }}></i>
        ))}
      </div>
      <button
        onClick={onClose}
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#B165BC',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Cerrar
      </button>
    </div>
  );
};

export default Review;
