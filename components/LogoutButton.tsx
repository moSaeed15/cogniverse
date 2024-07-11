'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="btn bg-brand-red hover:bg-red-600 text-white mt-auto transition-colors "
      aria-label="Log out"
    >
      <CiLogout size={20} color="white" />{' '}
      <span className="hidden md:block">Log out</span>
    </button>
  );
};

export default LogoutButton;
