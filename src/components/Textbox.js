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

  return (
    <textarea
      value={value}
      onChange={handleChange}
      style={{ height }}
      onInput={handleResize}
      className="resizable-textarea"
    />
  );
};

export default Textbox;