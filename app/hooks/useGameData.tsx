import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '@/app/FirebaseConfig';
import {
  MazeObject,
  SessionTime,
  chartData,
  SharedGameObject,
  TriesData,
  TrailGameObject,
} from '@/app/types/gameTypes';

import {
  filterDataBySession,
  getProcessedChartData,
  getTotalTime,
  setSessionTimeState,
} from '@/utils/dataUtils';

const useGameData = <T extends MazeObject | SharedGameObject | TrailGameObject>(
  user: string,
  sessionNumber: number,
  game: string
) => {
  const [tries, setTries] = useState<TriesData | null>(null);
  const [tableData, setTableData] = useState<T[] | null>(null);
  const [chartData, setChartData] = useState<chartData[] | null>(null);
  const [sessionTime, setSessionTime] = useState<SessionTime | null>(null);

  useEffect(() => {
    const getSessionData = async () => {
      const gameRef = ref(database, `users/${user}/${game}`);

      try {
        const Gamesnapshot = await get(gameRef);

        if (Gamesnapshot.exists()) {
          const snapshotArr: T[] = Object.values(Gamesnapshot.val());
          const filteredData = filterDataBySession(sessionNumber, snapshotArr);

          setTableData(filteredData);

          const totalTime = getTotalTime(filteredData);
          const lastTrial = filteredData[filteredData.length - 1];

          const triesData: TriesData = {
            totalTime: Math.floor(totalTime),
            numberOfTrials: filteredData.length,
            ...('numberOfHits' in lastTrial && {
              numberOfHits: lastTrial.numberOfHits,
            }),
            ...('numberOfMistakes' in lastTrial && {
              numberOfMistakes: lastTrial.numberOfMistakes,
            }),
            ...('accuracy' in lastTrial && {
              accuracy: lastTrial.accuracy * 100,
            }),
            ...('goResponseTime' in lastTrial && {
              goResponseTime: lastTrial.goResponseTime,
            }),
            ...('noGoResponseTime' in lastTrial && {
              noGoResponseTime: lastTrial.noGoResponseTime,
            }),
            ...('scorePercent' in lastTrial && {
              scorePercent: lastTrial.scorePercent * 100,
            }),
          };

          const processedData = getProcessedChartData(filteredData);

          setSessionTime(setSessionTimeState(filteredData));
          setTries(triesData);
          setChartData(processedData);
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    getSessionData();
  }, [user, sessionNumber, game]);
  return { tries, tableData, chartData, sessionTime };
};

export default useGameData;
