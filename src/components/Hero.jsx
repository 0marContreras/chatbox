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
            <p className="text-gray-300 max-w-xl leading-relaxed mx-auto lg:ml-0">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum
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
              <h3 className="text-indigo-600 font-semibold">
                Professional services
              </h3>
              <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                Build your SaaS solution with help from our experts
              </p>
              <p className="mt-3 text-gray-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum, sed ut perspiciatis unde omnis iste
                natus error sit voluptatem accusantium doloremque laudantium
              </p>
              <a
                href="#"
                className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
