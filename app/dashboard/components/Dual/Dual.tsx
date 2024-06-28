'use client';
import WelcomeCard from '../WelcomeCard';
import PatientCard from '../PatientCard';
import usePatientData from '@/app/hooks/usePatientData';
import { useEffect, useState } from 'react';

import { SharedGameObject } from '@/app/types/gameTypes';
import TableGamesData from '../TableGamesData';
import StatusCard from '../StatusCard';
import useGameData from '@/app/hooks/useGameData';
import GameMetrics from '../GameMetrics';
import LoadingGame from '@/components/LoadingGame';
interface Props {
  sessionNumber: number;
  user: string;
  game: string;
  isDemo?: boolean;
}

const Dual = ({ sessionNumber, game, user, isDemo }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    if (tries && tableData && chartData && sessionTime && patientData) {
      setIsLoading(false);
    }
  }, [tries, tableData, chartData, sessionTime, patientData]);

  return (
    <>
      <div className="overflow-hidden">
        {!isLoading ? (
          <>
            {' '}
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-7 ">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
              <WelcomeCard
                isDemo={isDemo}
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

              {/* {chartData && <LineChartComponent chartData={chartData} />} */}
              {tableData && (
                <TableGamesData
                  tableData={tableData}
                  tableTitles={tableTitles}
                />
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
          </>
        ) : (
          <LoadingGame />
        )}
      </div>
    </>
  );
};

export default Dual;
