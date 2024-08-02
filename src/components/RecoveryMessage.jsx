'use client';


const RecoveryMessage = () => {

  return (
    <main className="bg-[#142233] w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-white">
        <div className="text-center">
          <img src="/Logo.png" width={150} className="m-auto" />
          <h1 className='text-2xl font-bold text-[#6D72F2]'>ChatBox</h1>
          <div className="mt-4">
            <h3 className="text-white text-2xl font-bold sm:text-3xl">We sent you an email to reset your password</h3>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecoveryMessage;
