'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';

const errorMessages: Record<string, string> = {
  AccessDenied: 'This Google account is not authorized',
  default: 'Sign in failed, please try again',
};

// Only allow same-site relative paths to prevent open redirects.
const getSafeCallbackUrl = (url: string | null): string =>
  url && url.startsWith('/') && !url.startsWith('//') ? url : '/dashboard';

const LoginButton = () => {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const callbackUrl = getSafeCallbackUrl(searchParams.get('callbackUrl'));

  // Authorization is enforced on the server during sign in, so an
  // authenticated session here is always an allowed user.
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleSignIn = async () => {
    await signIn('google', { callbackUrl });
  };

  return (
    <>
      <button
        onClick={handleSignIn}
        disabled={status !== 'unauthenticated'}
        className=" disabled:opacity-50 flex items-center w-1/2 mt-5 justify-center border-2 min-w-52 whitespace-nowrap border-gray-300 rounded-md shadow-sm py-2 px-4 text-base gap-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <Image src="/google.svg" alt="google icon" width={20} height={20} />
        Sign in with Google
      </button>

      {error && (
        <p className="text-error mt-3 ">
          {errorMessages[error] ?? errorMessages.default}
        </p>
      )}
    </>
  );
};

export default LoginButton;
