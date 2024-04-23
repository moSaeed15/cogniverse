import Image from "next/image";
import { CiLogout } from "react-icons/ci";

const NavBar = () => {
  return (
    <nav className=" flex items-start max-h-20 px-10 py-5 gap-10 ml-auto">
      <div className="avatar cursor-pointer">
        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <Image
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="avatar"
            width={300}
            height={300}
          />
        </div>
      </div>
      <button className="btn bg-brand-red hover:bg-red-600 transition-colors h-12 ">
        <CiLogout size={20} fill="white" />
      </button>
    </nav>
  );
};

export default NavBar;
