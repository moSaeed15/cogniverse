import React, { useEffect, useState } from 'react';

const ProgressBar = ({ progress, label }) => {
  const [progressAnimiationValue, setprogressAnimiationValue] = useState(0);
  if (progress > 100) {
    progress = 100;
  }
  useEffect(() => {
    const timer = setInterval(() => {
      if (progressAnimiationValue < progress) {
        setprogressAnimiationValue(prevProgress => prevProgress + 5);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, progressAnimiationValue]);

  return (
    <div className="  space-y-7">
      <h3 className="text-gray-200 text-xl font-bold text-center whitespace-nowrap">
        {label}
      </h3>
      <div
        className={`radial-progress hidden lg:inline-grid    ${
          progressAnimiationValue > 50 ? 'text-[#A0DDFF]' : 'text-[#E63462]'
        } `}
        style={{ '--value': progressAnimiationValue, '--size': '10rem' }}
        role="progressbar"
      >
        {progressAnimiationValue}%
      </div>

      <div
        className={`radial-progress md:inline-grid  hidden lg:hidden   ${
          progressAnimiationValue > 50 ? 'text-[#A0DDFF]' : 'text-[#E63462]'
        } `}
        style={{ '--value': progressAnimiationValue, '--size': '7rem' }}
        role="progressbar"
      >
        {progressAnimiationValue}%
      </div>

      <div
        className={`radial-progress  inline-grid md:hidden  ${
          progressAnimiationValue > 50 ? 'text-[#A0DDFF]' : 'text-[#E63462]'
        } `}
        style={{ '--value': progressAnimiationValue, '--size': '10rem' }}
        role="progressbar"
      >
        {progressAnimiationValue}%
      </div>
    </div>
  );
};

export default ProgressBar;
