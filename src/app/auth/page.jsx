"use client";
import { useState, useRef, useEffect } from 'react';
import Invalid from '@/components/Invalid';

export default () => {
  const [token, setToken] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [error, setError] = useState(null);
  const inputsRef = useRef([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (response.status !== 200) {
      const data = await response.json();
      setError(data.error);
      console.log(error);
    } else {
      window.location.href = '/dashboard';
    }
  };

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth');
        if (response.status === 200) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        setIsValid(false);
      }
    };

    fetchAuthStatus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    let newToken = token.split('');
    newToken[index] = value;
    newToken = newToken.join('').slice(0, 4);
    setToken(newToken);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !token[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const getTokenChar = (index) => token[index] || '';

  if (isValid === null) {
    return <main className="bg-[#142233] w-full h-screen flex flex-col items-center justify-center px-4" />;
  }

  if (!isValid) {
    return <Invalid />;
  }

  return (
    <main className="bg-[#142233] w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <img src="/Logo.png" width={120} className="mx-auto" />
          <div className="mt-5 space-y-2">
            <h3 className="text-[#6D72F2] text-2xl font-bold sm:text-3xl">Enter your Token</h3>
            <p className="text-white">You received a Token in your email to verify your session</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center mb-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex items-center">
                <input
                  ref={(el) => (inputsRef.current[index] = el)}
                  value={getTokenChar(index)}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 mx-1 px-3 py-2 text-black bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg text-center"
                  name="token"
                />
                {index < 3 && <span className="text-white mx-1">-</span>}
              </div>
            ))}
          </div>
          {error && <p className="text-red-500 flex justify-center pb-4">Invalid code try again please</p>}
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            type="submit"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
};
