'use client';
import React, { useState } from 'react';

const LoginForm = () => {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status != 200) {
      const data = await response.json();
      setError(data.error); 
    } else {
      window.location.href = '/auth';
    }
  };

  return (
    <main className="bg-[#142233] w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-white">
        <div className="text-center">
          <img src="/Logo.png" width={150} className="m-auto" />
          <h1 className='text-2xl font-bold text-[#6D72F2]'>ChatBot</h1>
          <div className="mt-4">
            <h3 className="text-white text-2xl font-bold sm:text-3xl">Log in to your account</h3>
            <p className="text-sm pt-4">Your credentials are provided by the university, if you do not have yet, communicate with the institution</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-800 bg-white outline-none border focus:border-[#6D72F2] shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
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
            Sign in
          </button>
          <div className="text-center">
            <a className="hover:text-[#6D72F2]">Forgot password?</a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
