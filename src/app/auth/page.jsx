"use client";
import { useState, useRef, useEffect } from 'react';



export default () => {
  const [tokens, setTokens] = useState(['', '', '', '']);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newTokens = [...tokens];
    newTokens[index] = value;
    setTokens(newTokens);

    if (value && index < 3) {
      // Move to the next input if current input is filled
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && tokens[index] === '' && index > 0) {
      // Move to the previous input if current input is empty and backspace is pressed
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <main className="bg-[#142233] w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <img src="/Logo.png" width={120} className="mx-auto " />
          <div className="mt-5 space-y-2">
            <h3 className="text-[#6D72F2] text-2xl font-bold sm:text-3xl">Enter your Token</h3>
            <p className="text-white">You received a Token in your email to verify your email</p>
          </div>
        </div>
        <div className="flex justify-center items-center mb-4">
          {tokens.map((token, index) => (
            <div key={index} className="flex items-center">
              <input
                ref={(el) => inputsRef.current[index] = el}
                value={token}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 mx-1 px-3 py-2 text-black bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg text-center"
              />
              {index < tokens.length - 1 && <span className="text-white mx-1">-</span>}
            </div>
          ))}
        </div>
        <button
          className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Enter
        </button>
        <div className="text-center mt-4">
          <a className="text-white hover:text-indigo-600">Didn't receive your Token?</a>
        </div>
      </div>
    </main>
  );
};
