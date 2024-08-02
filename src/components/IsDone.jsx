"use-client"
import Link from 'next/link';

export default function IsDone(){
    return(
    <main className="bg-[#142233] w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
        <img src="/Logo.png" width={120} className="mx-auto " />
          <h1 className="text-[#00cf56] text-2xl font-bold sm:text-3xl">Password changed successfuly</h1>
          <p className="text-white pb-5">Go to sign in</p>
          <Link href="/signin" legacyBehavior>
                <a className="px-5 py-3 text-white text-bold duration-150 bg-[#B165BC] rounded-xl hover:bg-indigo-500 active:bg-indigo-700">
                  Sign in
                </a>
              </Link>
        </div>
      </div>
    </main>    
    )
}