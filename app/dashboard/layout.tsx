import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import MainDashboard from './components/MainDashboard';
import Image from 'next/image';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen relative ">
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
        <Suspense>
          <MainDashboard />
        </Suspense>
        {children}
      </div>
    </div>
  );
}
