import React from 'react';
import delay from 'delay';

const LoadingGame = () => {
  return (
    <>
      <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-8 mt-7   ">
        <div className="skeleton max-w-64  h-16"></div>
        <div className="skeleton max-w-64  h-16"></div>
        <div className="skeleton max-w-64   h-16"></div>
        <div className="skeleton  max-w-64  h-16"></div>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        <div className="skeleton w-[400px] sm:w-[500px]  lg:w-[400px] xl:w-[550px] h-[376px] "></div>
        <div className="skeleton  w-[400px]  sm:w-[500px]  lg:w-[400px] xl:w-[550px] h-[376px] "></div>
        <div className="skeleton  w-[400px]  sm:w-[500px]  lg:w-[400px] xl:w-[550px] h-[376px] "></div>
        <div className="skeleton w-[400px]  sm:w-[500px]  lg:w-[400px] xl:w-[550px] h-[376px]"></div>
      </div>
    </>
  );
};

export default LoadingGame;
