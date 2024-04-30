import React from 'react';
import DashboardMenu from './DashboardMenu';
import { CiLogout } from 'react-icons/ci';
import Link from 'next/link';
import Image from 'next/image';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  return (
    <aside className="bg-sidebar-background w-72 max-h-[70vh] m-5 flex flex-col px-3 py-5  bg-white rounded-2xl custom-border">
      <div className="flex items-center gap-5">
        <Link href={'/'}>
          <Image
            src="/cogniverse-logo.svg"
            alt="congniverse logo"
            width={100}
            height={90}
            className="cursor-pointer"
            priority
          />
        </Link>
        <h1 className="text-white text-xl uppercase font-bold">Cogniverse</h1>
      </div>
      <div className="custom-divider"></div>

      <DashboardMenu />
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
