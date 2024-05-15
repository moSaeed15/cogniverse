// dataUtils.ts

import { GameObject, SessionTime } from '@/app/types/gameTypes';

export const filterDataBySession = <T extends GameObject>(
  sessionNumber: number,
  snapshotArr: T[]
): T[] => {
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

export const getTotalTime = <T extends GameObject>(
  filteredData: T[]
): number => {
  return filteredData.reduce((acc, current) => acc + current.overallTime, 0);
};

export const getProcessedChartData = <T extends GameObject>(
  filteredData: T[]
): { count: string; Time: number }[] => {
  const processedData = filteredData.map((tryItem, index) => ({
    count: `trial ${index + 1}`,
    Time: tryItem.overallTime,
  }));

  return processedData;
};

export const setSessionTimeState = <T extends GameObject>(
  filteredData: T[]
): SessionTime => {
  const firstItem = filteredData[0];
  const sessionDate = firstItem.date;
  const sessionTime = firstItem.time;

  return {
    date: sessionDate,
    time: sessionTime,
  };
};
