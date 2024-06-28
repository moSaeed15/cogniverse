import NavBar from '../../components/NavBar';
// import Sidebar from './components/Sidebar';
import MainDashboard from './components/MainDashboard';
import Image from 'next/image';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Image
        fill
        alt="main-background"
        src={'/background-image.webp'}
        priority
        className="absolute  -z-10"
      />
      <div className="flex min-h-screen relative max-w-4xl lg:max-w-7xl mx-auto">
        {/* <Sidebar /> */}
        <div className="flex flex-col w-full">
          <NavBar />
          <Suspense>
            <MainDashboard />
          </Suspense>
          {children}
        </div>
      </div>
    </>
  );
}
