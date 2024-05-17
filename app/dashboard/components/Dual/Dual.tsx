'use client';
import { useEffect, useState } from 'react';
import WelcomeCard from '../WelcomeCard';
import { database } from '@/app/FirebaseConfig';
import { get, ref } from 'firebase/database';
import PatientCard from '../PatientCard';
import usePatientData from '@/app/hooks/usePatientData';
import ProgressBar from '@/components/ProgressBar';

import {
  filterDataBySession,
  getProcessedChartData,
  getTotalTime,
  setSessionTimeState,
} from '../../../../utils/dataUtils';

import {
  chartData,
  SharedGameObject,
  SessionTime,
} from '@/app/types/gameTypes';
import TableGamesData from '../TableGamesData';
import StatusCard from '../StatusCard';
import useGameData from '@/app/hooks/useGameData';
import GameMetrics from '../GameMetrics';

interface Props {
  sessionNumber: number;
  user: string;
  game: string;
}

const Dual = ({ sessionNumber, game, user }: Props) => {
  const patientData = usePatientData(user);

  const { tries, tableData, chartData, sessionTime } =
    useGameData<SharedGameObject>(user, sessionNumber, game);

  const tableTitles = [
    'Trial No.',
    'Time',
    'Accuracy',
    'Go response time',
    'No Go Response Time',
    'Score Percent',
  ];

  return (
    <>
      <div className="overflow-hidden">
        <div className=" grid grid-cols-4 gap-8 mt-7 ">
          {tries && (
            <StatusCard
              title="Number of trials"
              image="/success.svg"
              number={tries.numberOfTrials}
            />
          )}
          {tries && (
            <StatusCard
              title="Total time"
              image="/clock.svg"
              number={tries.totalTime}
              isTime={true}
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-10 mt-10">
          <WelcomeCard
            sessionNumber={sessionNumber}
            game={game}
            image="/potion.webp"
          />
          {patientData && sessionTime && (
            <PatientCard
              patientData={patientData}
              sessionTime={sessionTime}
              sessionNumber={sessionNumber}
            />
          )}
        </div>
        <div className="grid grid-cols-2  gap-10 mt-10 ">
          {/* {chartData && <LineChartComponent chartData={chartData} />} */}
          {tableData && (
            <TableGamesData tableData={tableData} tableTitles={tableTitles} />
          )}

          {tries && (
            <GameMetrics
              accuracy={tries.accuracy!}
              scorePercent={tries.scorePercent!}
              goResponseTime={tries.goResponseTime!}
              noGoResponseTime={tries.noGoResponseTime!}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Dual;
