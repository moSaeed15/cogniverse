import React from 'react';
import StatusCard from '../StatusCard';
import { TriesData } from '@/app/types/gameTypes';

interface Props {
  tries: TriesData;
}

const MazeStatusCardGroup = ({ tries }: Props) => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-7 ">
      <StatusCard
        title="Number of hits"
        image="/crash.svg"
        number={tries.numberOfHits!}
      />

      <StatusCard
        title="Number of trials"
        image="/success.svg"
        number={tries.numberOfTrials}
      />
      <StatusCard
        title="Total time"
        image="/clock.svg"
        number={tries.totalTime}
        isTime={true}
      />
    </div>
  );
};

export default MazeStatusCardGroup;
