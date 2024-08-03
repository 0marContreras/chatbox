'use client';

import { useEffect, useState } from 'react';

const Textbox = () => {
  const [info, setInfo] = useState(null); // Inicializar como null o un objeto vacío
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
        setInfo(inf[0]); // Asegurar que se toma el primer elemento del array si la respuesta es una lista
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
    //console.log(value);
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
      setValue(''); // Reiniciar el valor del textarea después de enviar los datos
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className="resizable-textarea">
      <div>
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
