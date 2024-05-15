'use client';

import PatientCard from './PatientCard';
import WelcomeCard from './WelcomeCard';
import StatusCard from './StatusCard';
import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '@/app/FirebaseConfig';
import LineChartComponent from './LineChartComponent';
import usePatientData from '@/app/hooks/usePatientData';
import TrialsData from './TrialsData';
import { chartData, MazeObject, SessionTime } from '@/app/types/gameTypes';
import {
  filterDataBySession,
  getProcessedChartData,
  getTotalTime,
  setSessionTimeState,
} from '@/utils/dataUtils';

interface Props {
  sessionNumber: number;
  user: string;
  game: string;
}

interface TriesData {
  numberOfHits: number;
  numberOfTrials: number;
  totalTime: number;
}

const Maze = ({ sessionNumber, game, user }: Props) => {
  const [tries, SetTries] = useState<TriesData | null>(null);
  const [tableData, SetTableData] = useState<MazeObject[] | null>(null);
  const [chartData, setChartData] = useState<chartData[] | null>(null);
  const [sessionTime, setSessionTime] = useState<SessionTime | null>(null);

  const tableTitles = ['Trial Number', 'Time', 'Number of hits', 'Trial time'];

  const patientData = usePatientData(user);

  useEffect(() => {
    const getSessionData = async () => {
      const gameRef = ref(database, `users/${user}/maze`);

      try {
        const Gamesnapshot = await get(gameRef);

        if (Gamesnapshot.exists()) {
          const snapshotArr: MazeObject[] = Object.values(Gamesnapshot.val());

          const filteredData = filterDataBySession(sessionNumber, snapshotArr);

          SetTableData(filteredData);

          const totalTime = getTotalTime(filteredData);

          const triesData = {
            totalTime: Math.floor(totalTime),
            numberOfHits: filteredData[filteredData.length - 1].numberOfHits,
            numberOfTrials: filteredData.length,
          };

          const processedData = getProcessedChartData(filteredData);

          setSessionTimeState(filteredData);
          SetTries(triesData);

          setChartData(processedData);
        }
      } catch (error) {
        // Handle error
      }
    };

    getSessionData();
  }, [game, user, sessionNumber]);

  return (
    <>
      {tries && (
        <div>
          <div className=" grid grid-cols-4 gap-8 mt-7 ">
            {tries && (
              <StatusCard
                title="Number of hits"
                image="/crash.svg"
                number={tries.numberOfHits}
              />
            )}

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

            {/* <StatusCard
              title="Average time per level"
              image="/hourglass.svg"
              number={1}
              isTime={true}
            /> */}
          </div>
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
