'use client';
import GameMetrics from '../GameMetrics';
import TableGamesData from '../TableGamesData';
import PatientCard from '../PatientCard';
import StatusCard from '../StatusCard';
import WelcomeCard from '../WelcomeCard';
import usePatientData from '@/app/hooks/usePatientData';
import useGameData from '@/app/hooks/useGameData';
import { accuracyChartData, SharedGameObject } from '@/app/types/gameTypes';
import { useEffect, useState } from 'react';
import LineChartComponent from '@/components/LineChartComponent';
import AccuracyChartData from '@/components/AccuracyChartData';

interface Props {
  sessionNumber: number;
  user: string;
  game: string;
}

const Whack = ({ sessionNumber, game, user }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const patientData = usePatientData(user);
  const [accuracyChartData, setAccuracyChartData] = useState<
    accuracyChartData[] | null
  >(null);

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
    const getProcessedAccuracyChartData = (
      filteredData: SharedGameObject[]
    ) => {
      const processedData = filteredData.map((tryItem, index) => ({
        count: `trial ${index + 1}`,
        accuracy: tryItem.accuracy,
      }));
      setAccuracyChartData(processedData);
    };
    if (tries && tableData && chartData && sessionTime) {
      setIsLoading(false);
      getProcessedAccuracyChartData(tableData);
    }
  }, [tries, tableData, chartData, sessionTime]);

  return (
    <div className="overflow-hidden">
      <div className=" grid grid-cols-4 gap-8 mt-7 ">
        {!isLoading && (
          <StatusCard
            title="Number of trials"
            image="/success.svg"
            number={tries?.numberOfTrials!}
          />
        )}
        {!isLoading && (
          <StatusCard
            title="Total time"
            image="/clock.svg"
            number={tries?.totalTime!}
            isTime={true}
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-5 mt-10">
        {!isLoading && (
          <WelcomeCard
            sessionNumber={sessionNumber}
            game={game}
            image="/ufo.webp"
          />
        )}

        {!isLoading && (
          <PatientCard
            patientData={patientData!}
            sessionTime={sessionTime!}
            sessionNumber={sessionNumber}
          />
        )}
      </div>
      <div className="grid grid-cols-2  gap-5 mt-10 ">
        {!isLoading && (
          <TableGamesData tableData={tableData!} tableTitles={tableTitles} />
        )}

        {!isLoading && (
          <GameMetrics
            accuracy={tries?.accuracy!}
            scorePercent={tries?.scorePercent!}
            goResponseTime={tries?.goResponseTime!}
            noGoResponseTime={tries?.noGoResponseTime!}
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-5 mt-10">
        {chartData && <LineChartComponent chartData={chartData} />}
        {accuracyChartData && (
          <AccuracyChartData accuracyChartData={accuracyChartData} />
        )}
      </div>
    </div>
  );
};

export default Whack;
