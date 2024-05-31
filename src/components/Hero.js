export default () => {

      return (
          <div className="bg-[#142233]">
              <header>
                  <nav className="items-center pt-3 pl-2 mx-auto max-w-screen-xl sm:pl-4 sm:flex sm:space-l-6">
                      <a>
                          <img
                              src="/Logo.png" 
                              width={90} 
                              height={90}
                              alt="logo"
                          />
                      </a>
                      <a className="text-white font-bold text-xl">
                        ChatBox
                      </a>
                      <ul className="py-4 flex-1 items-center flex space-x-3 sm:space-x-6 sm:justify-end">
                          <li>
                              <button className="px-5 py-3 text-white text-bold duration-150 bg-[#B165BC] rounded-full hover:bg-indigo-500 active:bg-indigo-700 flex items-center">
                                  Log In
                              </button>
                          </li>
                      </ul>
                  </nav>
              </header>
              <section className="mt-10 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
                  <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                      <h1 className="text-[#6D72F2] font-bold text-4xl xl:text-5xl">
                         ChatBox:
                           <span className="text-3xl text-white"> A Chatbot MVP</span>
                      </h1>
                      <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
                      </p>
                  </div>
                  <div className="flex-1 text-center mt-8 lg:mt-0 lg:ml-3">
                      <img src="/Fondo.png" className="w-64 h-[550px]  mx-auto sm:w-10/12  lg:w-full" />
                  </div>
              </section>
          </div>
      )
  }
  