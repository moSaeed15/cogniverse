import Image from "next/image";
import DashboardMenu from "./components/DashboardMenu";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex justify-between">
      <Sidebar />
      <NavBar />
      <MainDashboard />
    </div>
  );
};

export default Dashboard;
