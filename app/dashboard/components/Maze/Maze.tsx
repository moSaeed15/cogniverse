'use client';

import useGameData from '@/app/hooks/useGameData';
import usePatientData from '@/app/hooks/usePatientData';
import { MazeObject } from '@/app/types/gameTypes';
import LineChartComponent from '../../../../components/LineChartComponent';
import PatientCard from '../PatientCard';
import WelcomeCard from '../WelcomeCard';
import MazeStatusCardGroup from './MazeStatusCardGroup';
import TrialsData from './TrialsData';
import { useEffect, useState } from 'react';
import LoadingGame from '@/components/LoadingGame';

interface Props {
  sessionNumber: number;
  user: string;
  game: string;
  isDemo?: boolean;
}

const Maze = ({ sessionNumber, game, user, isDemo }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const tableTitles = ['Trial Number', 'Time', 'Number of hits', 'Trial time'];

  const patientData = usePatientData(user);

  const { tries, tableData, chartData, sessionTime } = useGameData<MazeObject>(
    user,
    sessionNumber,
    game
  );

  useEffect(() => {
    if (tries && tableData && chartData && sessionTime && patientData) {
      setIsLoading(false);
    }
  }, [tries, tableData, chartData, sessionTime, patientData]);

  return (
    <>
      <div>
        {!isLoading ? (
          <>
            {tries && <MazeStatusCardGroup tries={tries} />}
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-5 mt-10">
              <WelcomeCard
                isDemo={isDemo}
                sessionNumber={sessionNumber}
                game={game}
                image="/Spark.webp"
              />

              <PatientCard
                patientData={patientData}
                sessionTime={sessionTime!}
                sessionNumber={sessionNumber}
              />
              <TrialsData tableData={tableData} tableTitles={tableTitles} />
              <LineChartComponent chartData={chartData} />
            </div>
          </>
        ) : (
          <LoadingGame />
        )}
      </div>
    </>
  );
};

export default Maze;
