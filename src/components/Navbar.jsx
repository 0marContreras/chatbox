"use client";

import { useState } from 'react';

export default function Navbar() {

  const [state, setState] = useState(false);

  const toggleMenu = () => {
    setState(!state);
  };

async function logout(){
    const response = await fetch('/api/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.status != 200) {
        const data = await response.json();
        setError(data.error); 
      } else {
        window.location.href = '/';
      }
  }

  return (
      <nav className="bg-[#142233] w-full border-b md:border-0 md:static">
          <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                  <a>
                      <img
                          src="/Logo.png" 
                          width={80} 
                          height={20}
                          alt="logo"
                      />
                  </a>
                  <div className="md:hidden">
                      <button className="text-white" onClick={toggleMenu}>
                          {state ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                          ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                              </svg>
                          )}
                      </button>
                  </div>
              </div>
              <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>

                  <div className="mt-3 md:hidden">
                      <a className="block py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                          Log out
                      </a>
                  </div>
              </div>
              <div className="hidden md:inline-block">
                  <button onClick={logout}  className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                      Log out
                  </button>
              </div>
          </div>
      </nav>
  )
}
