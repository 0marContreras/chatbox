"use client";
import React, { useState, useEffect } from 'react';
import InvalidRecovery from '@/components/InvalidRecovery';
import IsDone from '@/components/IsDone';

export default function PasswordReset() {
  const [isValid, setIsValid] = useState(null);
  const [isDone, setIsDone] = useState(false); 
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get('password');

    const response = await fetch('/api/recovery', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (response.status !== 200) {
      const data = await response.json();
      setError("Invalid password!");
    } else {
      setIsDone(true);
    }
  };

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch('/api/recovery');
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

  if (isValid === null) {
    return <main className="bg-[#142233] w-full h-screen flex flex-col items-center justify-center px-4" />;
  }

  if (!isValid) {
    return <InvalidRecovery />;
  }

  if (isDone) {
    return <IsDone />;
  }

  return (
    <main className="bg-[#142233] w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-white">
        <div className="text-center">
          <img src="/Logo.png" width={150} className="m-auto" />
          <h1 className='text-2xl font-bold text-[#6D72F2]'>ChatBox</h1>
          <div className="mt-4">
            <h3 className="text-white text-2xl font-bold sm:text-3xl">Create new password</h3>
            <p className="text-sm pt-4">Use a combination of uppercase, lowercase and symbols</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">New password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-800 bg-white outline-none border focus:border-[#6D72F2] shadow-sm rounded-lg"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-[#B165BC] hover:bg-[#6D72F2] active:bg-[#B165BC] rounded-lg duration-150"
          >
            Reset password
          </button>
        </form>
      </div>
    </main>
  );
}
