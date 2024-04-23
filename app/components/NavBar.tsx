import Image from "next/image";
import { CiLogout } from "react-icons/ci";

const NavBar = () => {
  return (
    <nav className="flex items-center max-h-20 px-10 py-5 mt-5 gap-10 self-end  w-full justify-between">
      <h2 className="text-xl self-end">Dashboard</h2>
      <div className="avatar cursor-pointer  ">
        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <Image
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="avatar"
            width={300}
            height={300}
          />
        </div>
        <button className="btn bg-brand-red hover:bg-red-600 transition-colors h-12 ml-14 ">
          <CiLogout size={20} fill="white" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
