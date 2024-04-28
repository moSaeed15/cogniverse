import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import MainDashboard from './components/MainDashboard';
import Image from 'next/image';

const Dashboard = () => {
  return (
    <div className="flex ">
      <Image
        fill
        alt="main-background"
        src={'/background-image.png'}
        priority
        className="absolute  -z-10"
      />
      <Sidebar />
      <div className="flex flex-col w-full">
        <NavBar />
        <MainDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
