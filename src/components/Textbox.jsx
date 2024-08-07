'use client';

import { useEffect, useState } from 'react';

const Textbox = () => {
  const [info, setInfo] = useState(null);
  const [value, setValue] = useState('');
  const [height, setHeight] = useState('100px');

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch('/api/info');
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const inf = await response.json();
        console.log(inf);
        setInfo(inf[0]); 
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleResize = (event) => {
    setHeight(`${event.target.scrollHeight}px`);
  };

  const handleSubmit = async () => {
    if (!info) {
      console.error('Info no cargado');
      return;
    }

    try {
      const response = await fetch('/api/info', {
        method: 'PUT',
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
      setValue(''); 
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div>
      <div className="">
        <div>
          <textarea
            value={value}
            onChange={handleChange}
            style={{
              height:'300px',
              width: '800px', 
              border: '2px solid black', 
              padding: '10px' 
            }}
            onInput={handleResize}
          />
        </div>
      </div>      
      <div>
        <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default Textbox;
