'use client';

import useGameData from '@/app/hooks/useGameData';
import usePatientData from '@/app/hooks/usePatientData';
import { MazeObject } from '@/app/types/gameTypes';
import LineChartComponent from '../../../../components/LineChartComponent';
import PatientCard from '../PatientCard';
import WelcomeCard from '../WelcomeCard';
import MazeStatusCardGroup from './MazeStatusCardGroup';
import TrialsData from './TrialsData';

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
          <div className="grid grid-cols-2 gap-5 mt-10">
            <WelcomeCard
              sessionNumber={sessionNumber}
              game={game}
              image="/Spark.webp"
            />

            {patientData && sessionTime && (
              <PatientCard
                patientData={patientData}
                sessionTime={sessionTime}
                sessionNumber={sessionNumber}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-5 mt-10 ">
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
