'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { db } from './FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const LoginButton = () => {
  const [isError, setIsError] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      console.log(status);
      if (status === 'authenticated') {
        try {
          const datas = await getDocs(collection(db, 'allowedEmails'));
          const validEmails: string[] = datas.docs[0]?.data().emails || [];

          if (validEmails.includes(session.user?.email ?? '')) {
            router.push('/dashboard');
          } else {
            setIsError(true);
            await signOut({ redirect: false });
          }
        } catch (error) {
          if (!isError) {
            setIsError(true);
          }
        }
      }
    };

    if (status === 'authenticated' && !isError) {
      checkAuth();
    }
  }, [session, status, router, isError]);

  const handleSignIn = async () => {
    await signIn('google');
  };

  return (
    <>
      <button
        onClick={handleSignIn}
        className="flex items-center w-1/2 mt-5 justify-center border-2 border-gray-300 rounded-md shadow-sm py-2 px-4 text-base gap-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <Image src="/google.svg" alt="google icon" width={20} height={20} />
        Sign in with Google
      </button>

      {isError && (
        <p className="text-error mt-3 ">Email data is not authorized</p>
      )}
    </>
  );
};

export default LoginButton;
