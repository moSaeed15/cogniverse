'use client';
import LogoutButton from './LogoutButton';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Avatar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="avatar cursor-pointer   ">
      <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-10">
        <Image
          src={status === 'authenticated' ? session?.user!.image! : ''}
          alt="avatar"
          width={300}
          height={300}
        />
      </div>
      <LogoutButton />
    </div>
  );
};

export default Avatar;
