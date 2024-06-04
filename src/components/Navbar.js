"use client";

import { useState } from 'react';

export default function Navbar() {

  const [state, setState] = useState(false);

  return (
      <nav className="bg-[#142233] w-full border-b md:border-0 md:static">
          <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a>
                        <img
                            src="/Logo.png" 
                            width={80} 
                            height={40}
                            alt="logo"
                        />
                    </a>
              </div>
              <div className="flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0">
              </div>
              <div className="hidden md:inline-block">
                <a  className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                    Log out
                </a>
              </div>
          </div>
      </nav>
  )
}