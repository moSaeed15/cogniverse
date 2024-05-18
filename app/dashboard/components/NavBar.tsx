import Avatar from '../../../components/Avatar';

const NavBar = () => {
  return (
    <nav className="flex items-center max-h-20 px-14 py-5 mt-5 gap-5 self-end  w-full justify-between">
      <h2 className="text-xl self-end">Dashboard</h2>
      <Avatar />
    </nav>
  );
};

export default NavBar;
