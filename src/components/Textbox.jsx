'use client';

import { useState } from 'react';

const Textbox = () => {
  const [value, setValue] = useState('');
  const [height, setHeight] = useState('100px');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleResize = (event) => {
    setHeight(`${event.target.scrollHeight}px`);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/info/', {
        method: 'PUT', // Cambiado de POST a PUT
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: 'some_id', newInfo: value }), // Asegúrate de reemplazar 'some_id' con el id correcto
      });
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className="resizable-textarea">
    <div >
      <textarea
        value={value}
        onChange={handleChange}
        style={{ height }}
        onInput={handleResize}      
      />   
    </div>
    <div>
        <button onClick={handleSubmit}>Enviar</button>
    </div>
     
    </div>

  );
};

export default Textbox;
