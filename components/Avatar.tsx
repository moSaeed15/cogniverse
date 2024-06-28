'use client';
import LogoutButton from './LogoutButton';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CiLogout } from 'react-icons/ci';

const Avatar = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  return (
    <div className="avatar cursor-pointer   ">
      <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-10 sm:!block !hidden">
        {status === 'authenticated' ? (
          <Image
            src={session?.user!.image!}
            alt="avatar"
            width={300}
            height={300}
          />
        ) : (
          <Image src="/profile.webp" alt="avatar" width={300} height={300} />
        )}
      </div>
      {status === 'authenticated' ? (
        <LogoutButton />
      ) : (
        <button
          onClick={() => router.push('/')}
          className="btn bg-brand-red hover:bg-red-600 text-white mt-auto transition-colors "
        >
          <CiLogout size={20} color="white" />{' '}
          <span className="hidden md:block">Return</span>
        </button>
      )}
    </div>
  );
};

export default Avatar;
