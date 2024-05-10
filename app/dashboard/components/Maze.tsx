'use client';

import PatientCard from './PatientCard';
import WelcomeCard from './WelcomeCard';
import StatusCard from './StatusCard';
import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '@/app/FirebaseConfig';
import LineChartComponent from './LineChartComponent';
import { capitalize } from '@/utils/captalize';

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

interface chartData {
  count: string;
  Time: number;
}

const Maze = ({ sessionNumber, game, user }: Props) => {
  const [tries, SetTries] = useState<MazeObject[] | null>(null);
  const [chartData, setChartData] = useState<chartData[] | null>(null);

  useEffect(() => {
    const getSessionData = async () => {
      const gameRef = ref(database, `users/${user}/maze`);

      try {
        const Gamesnapshot = await get(gameRef);
        if (Gamesnapshot.exists()) {
          // Game data processing

          const snapshotArr: MazeObject[] = Object.values(Gamesnapshot.val());

          // console.log(snapshotArr);
          let filteredData: MazeObject[] = [];

          // Filter data based on session number and date
          if (sessionNumber > 0 && sessionNumber <= snapshotArr.length) {
            // get unique dates

            const sessionDates: string[] = [
              ...new Set(snapshotArr.map(snapshot => snapshot.date)),
            ];

            const sessionDate = sessionDates[sessionNumber - 1];
            filteredData = snapshotArr.filter(
              data => data.date === sessionDate
            );
          }

          SetTries(filteredData);
          snapshotArr.sort((a, b) => a.overallTime - b.overallTime);

          const processedData = snapshotArr.map((tryItem, index) => ({
            count: `trial ${index + 1}`,

            Time: tryItem.overallTime,
          }));

          setChartData(processedData);
        }
      } catch (error) {}
    };

    getSessionData();
  }, [game, user, sessionNumber]);

  return (
    <>
      {tries && (
        <div>
          <div className=" grid grid-cols-4 gap-8 mt-7 ">
            <StatusCard title="Number of hits" image="/crash.svg" number={1} />
            <StatusCard
              title="Number of trials"
              image="/success.svg"
              number={2}
            />
            <StatusCard
              title="Total time"
              image="/clock.svg"
              number={18}
              isTime={true}
            />
            <StatusCard
              title="Average time per level"
              image="/hourglass.svg"
              number={1}
              isTime={true}
            />
          </div>
          <div className="flex gap-10 mt-10">
            <WelcomeCard sessionNumber={sessionNumber} game={game} />
            <PatientCard />
          </div>
          {/* {chartData && <LineChartComponent chartData={chartData} />} */}
        </div>
      )}
    </>
  );
};

export default Maze;
