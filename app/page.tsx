import Image from "next/image";
import DashboardMenu from "./components/DashboardMenu";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import MainDashboard from "./components/MainDashboard";

const Dashboard = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex flex-col w-full">
        <NavBar />
        <MainDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
