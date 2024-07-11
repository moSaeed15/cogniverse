import Image from 'next/image';
import Avatar from './Avatar';

const NavBar = () => {
  return (
    <nav className="flex items-center max-h-20 px-14 py-1 mt-5 gap-5 self-end  w-full justify-between">
      <h2 className=" text-xl md:text-3xl font-bold self-end flex items-center gap-5">
        <Image
          src="/cogniverse-logo.webp"
          alt="congniverse logo"
          width={90}
          height={80}
          className="cursor-pointer min-w-20 min-h-20 w-10  "
          priority={true}
        />{' '}
        Cogniverse
      </h2>
      <Avatar />
    </nav>
  );
};

export default NavBar;
