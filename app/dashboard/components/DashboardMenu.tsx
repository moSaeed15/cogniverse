import Image from 'next/image';
import Link from 'next/link';
import { IoHome } from 'react-icons/io5';

const DashboardMenu = () => {
  return (
    <div className="my-5">
      <Link
        className="hover:bg-[#1A1F37] p-3 rounded-xl flex items-center gap-3 text-sm"
        href="/dashboard"
      >
        <IoHome size={30} className="bg-[#0075FF] p-1 rounded-lg" /> Dashboard
      </Link>
      <h2 className="mt-5">ACCOUNT PAGES</h2>
      <Link
        href="/dashboard"
        className="hover:bg-[#1A1F37] p-3 rounded-xl flex items-center gap-3 text-sm mt-2"
      >
        <Image src={'/profile.svg'} width={25} height={25} alt="profile" />
        Profile
      </Link>
    </div>
  );
};

export default DashboardMenu;
