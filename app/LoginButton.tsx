'use client';
import Image from 'next/image';
import React from 'react';
import { signIn } from 'next-auth/react';

const LoginButton = () => {
  return (
    <button
      onClick={() => signIn('google')}
      className="flex items-center w-1/2 mt-5 justify-center border-2 border-gray-300 rounded-md shadow-sm py-2 px-4 text-base gap-5 focus:outline-none focus:ring-2  focus:ring-indigo-500 focus:border-indigo-500 "
    >
      <Image src="/google.svg" alt="google icon" width={20} height={20} />
      Sign in with Google
    </button>
  );
};

export default LoginButton;
