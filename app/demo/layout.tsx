import Image from 'next/image';
import { Suspense } from 'react';
import NavBar from '../../components/NavBar';
import MainDashboard from '../dashboard/components/MainDashboard';
import DemoSelection from './DemoSelection';

export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Image
        fill
        alt="main-background"
        src={'/background-image.png'}
        priority
        className="absolute  -z-10"
      />
      <div className="flex min-h-screen relative max-w-4xl lg:max-w-7xl mx-auto">
        {/* <Sidebar /> */}
        <div className="flex flex-col w-full">
          <NavBar />
          <Suspense>
            <DemoSelection />
          </Suspense>
          {children}
        </div>
      </div>
    </>
  );
}
