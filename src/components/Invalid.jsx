"use-client"
import Link from 'next/link';

export default function Invalid(){
    return(
    <main className="bg-[#142233] w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
        <img src="/Logo.png" width={120} className="mx-auto " />
          <h1 className="text-[#cf0041] text-2xl font-bold sm:text-3xl">Invalid verification</h1>
          <p className="text-white pb-5">Please try login again</p>
          <Link href="/signin" legacyBehavior>
                <a className="px-5 py-3 text-white text-bold duration-150 bg-[#B165BC] rounded-xl hover:bg-indigo-500 active:bg-indigo-700">
                  Log In
                </a>
              </Link>
        </div>
      </div>
    </main>    
    )
}