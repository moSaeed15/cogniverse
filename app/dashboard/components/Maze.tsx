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

interface Props {
  sessionNumber: number;
  user: string;
  game: string;
}

export interface MazeObject {
  date: string;
  level: number;
  numberOfHits: number;
  overallTime: number;
  time: string;
}

interface TriesData {
  numberOfHits: number;
  numberOfTrials: number;
  totalTime: number;
}

interface chartData {
  count: string;
  Time: number;
}

export interface SessionTime {
  time: string;
  date: string;
}

const Maze = ({ sessionNumber, game, user }: Props) => {
  const [tries, SetTries] = useState<TriesData | null>(null);
  const [tableData, SetTableData] = useState<MazeObject[] | null>(null);

  const [chartData, setChartData] = useState<chartData[] | null>(null);

  const [sessionTime, setSessionTime] = useState<SessionTime | null>(null);

  const patientData = usePatientData(user);

  useEffect(() => {
    const getSessionData = async () => {
      const gameRef = ref(database, `users/${user}/maze`);

      try {
        const Gamesnapshot = await get(gameRef);

        if (Gamesnapshot.exists()) {
          const snapshotArr: MazeObject[] = Object.values(Gamesnapshot.val());

          const filteredData = filterDataBySession(snapshotArr);
          SetTableData(filteredData);
          const totalTime = getTotalTime(filteredData);

          const triesData = {
            totalTime: Math.floor(totalTime),
            numberOfHits: filteredData[filteredData.length - 1].numberOfHits,
            numberOfTrials: filteredData.length,
          };

          const processedData = getProcessedChartData(filteredData);

          setSessionTimeAndTries(filteredData, triesData);

          setChartData(processedData);
        }
      } catch (error) {
        // Handle error
      }
    };

    getSessionData();
  }, [game, user, sessionNumber]);

  const filterDataBySession = (snapshotArr: MazeObject[]): MazeObject[] => {
    if (sessionNumber <= 0 || sessionNumber > snapshotArr.length) {
      return [];
    }

    const sessionDates: string[] = [
      ...new Set(snapshotArr.map(snapshot => snapshot.date)),
    ];
    const sessionTimes: string[] = [
      ...new Set(snapshotArr.map(snapshot => snapshot.time)),
    ];
    const sessionDate = sessionDates[sessionNumber - 1];
    const sessionTime = sessionTimes[sessionNumber - 1];

    return snapshotArr.filter(data => data.date === sessionDate);
  };

  const getTotalTime = (filteredData: MazeObject[]): number => {
    return filteredData.reduce((acc, current) => acc + current.overallTime, 0);
  };

  const getProcessedChartData = (
    filteredData: MazeObject[]
  ): { count: string; Time: number }[] => {
    const processedData = filteredData.map((tryItem, index) => ({
      count: `trial ${index + 1}`,
      Time: tryItem.overallTime,
    }));

    return processedData;
    // return processedData.sort((a, b) => a.Time - b.Time);
  };

  const setSessionTimeAndTries = (
    filteredData: MazeObject[],
    triesData: any
  ) => {
    const firstItem = filteredData[0];
    const sessionDate = firstItem.date;
    const sessionTime = firstItem.time;

    setSessionTime({
      date: sessionDate,
      time: sessionTime,
    });

    SetTries(triesData);
  };

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
            <WelcomeCard sessionNumber={sessionNumber} game={game} />
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
            {tableData && <TrialsData tableData={tableData} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Maze;
