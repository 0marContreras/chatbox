'use client';

import { useEffect, useState } from 'react';

const Textbox = () => {
  const [info, setInfo] = useState(null);
  const [value, setValue] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const fetchInfo = async () => {
    try {
      const response = await fetch('/api/info');
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const inf = await response.json();
      console.log(inf);
      setValue(inf[0].Additional_info);
      setInfo(inf[0]); 
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (!info) {
      console.error('Info no cargado');
      return;
    }

    try {
      const response = await fetch('/api/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: info._id, newInfo: value }),
      });
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      fetchInfo();

      // Mostrar la alerta
      setAlertVisible(true);
      // Ocultar la alerta después de 2 segundos
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);

    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div>
      <div className="relative">
        {alertVisible && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-green-100 border border-green-400 text-green-700 px-2 py-1 rounded transition-opacity duration-500 fade-in-out">
            <span className="text-sm">Successfully updated.</span>
          </div>
        )}
        <textarea
          value={value}
          onChange={handleChange}
          style={{
            height: '300px',
            width: '800px', 
            border: '2px solid black', 
            padding: '10px',
            marginTop: '50px' // Espacio para la alerta
          }}
        />
      </div>      
      <div>
        <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default Textbox;
