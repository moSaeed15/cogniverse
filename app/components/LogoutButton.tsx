'use client';
import { signOut } from 'next-auth/react';
import { CiLogout } from 'react-icons/ci';

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="btn bg-brand-red hover:bg-red-600 text-white mt-auto transition-colors "
    >
      <CiLogout size={20} color="white" /> Log out
    </button>
  );
};

export default LogoutButton;
