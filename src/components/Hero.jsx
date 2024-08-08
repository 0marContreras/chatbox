"use client";

import { useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="bg-[#142233]">
        <header className="relative">
          <nav className="items-center pt-3 px-4 mx-auto max-w-screen-xl sm:px-8 flex justify-between">
            <div className="flex items-center">
              <a>
                <img src="/Logo.png" width={90} height={90} alt="logo" />
              </a>
              <a className="text-white font-bold text-xl ml-2">ChatBox</a>
            </div>
            <div className="hidden sm:block absolute top-0 right-64 p-8">
              <Link href="/signin" legacyBehavior>
                <a className="px-5 py-3 text-white text-bold duration-150 bg-[#B165BC] rounded-full hover:bg-indigo-500 active:bg-indigo-700 flex items-center">
                  Log In
                </a>
              </Link>
            </div>
            <div className="sm:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </nav>
          <ul
            className={`py-4 sm:py-0 flex-1 items-center flex space-x-3 sm:space-x-6 sm:justify-end ${
              menuOpen ? "block" : "hidden"
            } sm:flex`}
          >
            <li className="sm:hidden">
              <Link href="/signin" legacyBehavior>
                <a className="px-5 py-3 text-white text-bold duration-150 bg-[#B165BC] rounded-full hover:bg-indigo-500 active:bg-indigo-700 flex items-center">
                  Log In
                </a>
              </Link>
            </li>
          </ul>
        </header>
        <section className="mt-10 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
          <div className="space-y-4 flex-1 text-center lg:text-left">
            <h1 className="text-[#6D72F2] font-bold text-4xl xl:text-5xl">
              ChatBox:
              <span className="block text-3xl text-white lg:inline">
                {" "}
                A Chatbot MVP
              </span>
            </h1>
            <p className="text-gray-300 text-xl max-w-xl leading-relaxed mx-auto lg:ml-0">
             Automated support for users powered with AI.
            </p>
          </div>
          <div className="flex-1 text-center mt-8 lg:mt-0 lg:ml-3">
            <img
              src="/Fondo.png"
              className="w-full h-auto mx-auto sm:w-10/12 lg:w-full"
            />
          </div>
        </section>
      </div>
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto md:px-8">
          <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
            <div className="flex-1 sm:hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                className="md:max-w-lg sm:rounded-lg"
                alt=""
              />
            </div>
            <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
              <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                Manage the information and bot configurations through user interfaces
              </p>
              <p className="mt-3 text-gray-600">
                  This MVP is meant to be a contemporary customer support solution in companies, 
                  businesses, entrepreneurships, or even institutions. By using the latest technologies 
                  like large language models, the development project seeks to further innovative 
                  features to fit in with a user interface that makes working easier and training of AI simpler. 
                  This will augment the efficiency and effectiveness of a customer support team by shortening turnaround 
                  time with almost pinpoint responses. It also combines robust analytics and reporting tools, 
                  which tap into interaction details of customers, to provide an organization with valuable insights 
                  into how service quality can be continuously improved.

              </p>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
