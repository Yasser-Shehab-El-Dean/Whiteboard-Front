"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className='h-screen flex justify-center items-center	'>
      <div className='flex'>
        <div className='hidden md:block'>
          <Image src='/LoginImg.png' alt='me' width='400' height='64' />
        </div>
        <div className='p-[3rem] bg-white'>
          <div className='flex gap-2 items-center mb-10'>
            <Image src='/Logo.png' alt='me' width='20' height='20' />
            <h2 className='font-semibold text-md text-main'>Whiteboard.Apollonia</h2>
          </div>
          <div>
            <h1 className='text-lg font-medium'>Login to your account</h1>
            <p className='text-sm text-subText'>Please enter your email & password to log in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
