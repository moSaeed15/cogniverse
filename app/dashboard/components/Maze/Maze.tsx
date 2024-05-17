'use client';

import PatientCard from '../PatientCard';
import WelcomeCard from '../WelcomeCard';
import StatusCard from '../StatusCard';
import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '@/app/FirebaseConfig';
import LineChartComponent from '../LineChartComponent';
import usePatientData from '@/app/hooks/usePatientData';
import TrialsData from './TrialsData';
import { chartData, MazeObject, SessionTime } from '@/app/types/gameTypes';
import {
  filterDataBySession,
  getProcessedChartData,
  getTotalTime,
  setSessionTimeState,
} from '@/utils/dataUtils';
import MazeStatusCardGroup from './MazeStatusCardGroup';
import useMazeData from '@/app/hooks/useGameData';
import useGameData from '@/app/hooks/useGameData';

interface Props {
  sessionNumber: number;
  user: string;
  game: string;
}

const Maze = ({ sessionNumber, game, user }: Props) => {
  const tableTitles = ['Trial Number', 'Time', 'Number of hits', 'Trial time'];

  const patientData = usePatientData(user);

  const { tries, tableData, chartData, sessionTime } = useGameData<MazeObject>(
    user,
    sessionNumber,
    game
  );

  console.log(tries, tableData, chartData, sessionTime);
  return (
    <>
      {tries && (
        <div>
          {tries && <MazeStatusCardGroup tries={tries} />}
          <div className="flex gap-10 mt-10">
            <WelcomeCard
              sessionNumber={sessionNumber}
              game={game}
              image="/spark.webp"
            />

            {patientData && sessionTime && (
              <PatientCard
                patientData={patientData}
                sessionTime={sessionTime}
                sessionNumber={sessionNumber}
              />
            )}
          </div>
          <div className="flex gap-10 mt-10">
            {chartData && <LineChartComponent chartData={chartData} />}
            {tableData && (
              <TrialsData tableData={tableData} tableTitles={tableTitles} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Maze;
