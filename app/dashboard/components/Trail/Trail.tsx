'use client';
import PatientCard from '../PatientCard';
import StatusCard from '../StatusCard';
import WelcomeCard from '../WelcomeCard';
import usePatientData from '@/app/hooks/usePatientData';
import useGameData from '@/app/hooks/useGameData';
import { accuracyChartData, TrailGameObject } from '@/app/types/gameTypes';
import { useEffect, useState } from 'react';
import TrailTableData from './TrailTableData';
import LineChartComponent from '../../../../components/LineChartComponent';
import TrailGameMetrics from './TrailGameMetrics';
import AccuracyChartData from '@/components/AccuracyChartData';
import LoadingGame from '@/components/LoadingGame';

interface Props {
  sessionNumber: number;
  user: string;
  game: string;
  isDemo?: boolean;
}

const Trail = ({ sessionNumber, game, user, isDemo }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [accuracyChartData, setAccuracyChartData] = useState<
    accuracyChartData[] | null
  >(null);
  const patientData = usePatientData(user);

  const { tries, tableData, chartData, sessionTime } =
    useGameData<TrailGameObject>(user, sessionNumber, game);

  const tableTitles = [
    'Trial No.',
    'Time',
    'Accuracy',
    'overallTime',
    'Score Percent',
    'Number of Mistakes',
  ];

  useEffect(() => {
    const getProcessedAccuracyChartData = (filteredData: TrailGameObject[]) => {
      const processedData = filteredData.map((tryItem, index) => ({
        count: `trial ${index + 1}`,
        accuracy: tryItem.accuracy,
      }));
      setAccuracyChartData(processedData);
    };
    if (tries && tableData && chartData && sessionTime && patientData) {
      setIsLoading(false);
      getProcessedAccuracyChartData(tableData);
    }
  }, [tries, tableData, chartData, sessionTime, patientData]);

  return (
    <div className="overflow-hidden ">
      {!isLoading ? (
        <>
          {' '}
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-7 ">
            <StatusCard
              title="Number of Mistakes"
              image="/failed.svg"
              number={tries?.numberOfMistakes!}
            />

            <StatusCard
              title="Number of trials"
              image="/success.svg"
              number={tries?.numberOfTrials!}
            />
            <StatusCard
              title="Total time"
              image="/clock.svg"
              number={tries?.totalTime!}
              isTime={true}
            />
          </div>
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <WelcomeCard
              isDemo={isDemo}
              sessionNumber={sessionNumber}
              game={game}
              image="/gun.webp"
            />

            <PatientCard
              patientData={patientData!}
              sessionTime={sessionTime!}
              sessionNumber={sessionNumber}
            />

            <TrailTableData tableData={tableData!} tableTitles={tableTitles} />

            <TrailGameMetrics
              accuracy={tries?.accuracy!}
              scorePercent={tries?.scorePercent!}
            />

            <LineChartComponent chartData={chartData!} />
            {accuracyChartData && (
              <AccuracyChartData accuracyChartData={accuracyChartData} />
            )}
          </div>
        </>
      ) : (
        <LoadingGame />
      )}
    </div>
  );
};

export default Trail;
