'use client';
import { useEffect, useState } from 'react';
import WelcomeCard from './WelcomeCard';
import { database } from '@/app/FirebaseConfig';
import { get, ref } from 'firebase/database';
import PatientCard from './PatientCard';
import usePatientData from '@/app/hooks/usePatientData';

import {
  filterDataBySession,
  getProcessedChartData,
  getTotalTime,
  setSessionTimeState,
} from '../../../utils/dataUtils';

import { chartData, DualObject, SessionTime } from '@/app/types/gameTypes';
import LineChartComponent from './LineChartComponent';
import TableDualData from './TableDuallData';

interface Props {
  sessionNumber: number;
  user: string;
  game: string;
}

const Dual = ({ sessionNumber, game, user }: Props) => {
  const [sessionTime, setSessionTime] = useState<SessionTime | null>(null);
  const [tableData, SetTableData] = useState<DualObject[] | null>(null);
  const [chartData, setChartData] = useState<chartData[] | null>(null);

  const patientData = usePatientData(user);

  const tableTitles = [
    'Trial No.',
    'Time',

    'Accuracy',
    'Go response time',
    'No Go Response Time',
    'Score Percent',
  ];

  useEffect(() => {
    const getSessionData = async () => {
      const gameRef = ref(database, `users/${user}/${game}`);

      try {
        const Gamesnapshot = await get(gameRef);

        if (Gamesnapshot.exists()) {
          console.log(Object.values(Gamesnapshot.val()));

          const snapshotArr: DualObject[] = Object.values(Gamesnapshot.val());

          const filteredData = filterDataBySession<DualObject>(
            sessionNumber,
            snapshotArr
          );

          console.log(filteredData);

          SetTableData(filteredData);

          const totalTime = getTotalTime<DualObject>(filteredData);

          // const triesData = {
          //   totalTime: Math.floor(totalTime),
          //   numberOfHits: filteredData[filteredData.length - 1].numberOfHits,
          //   numberOfTrials: filteredData.length,
          // };

          const processedData = getProcessedChartData<DualObject>(filteredData);

          setSessionTime(setSessionTimeState(filteredData));

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
      <div className="">
        <div className="flex gap-10 mt-10">
          <WelcomeCard
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
        </div>
        <div className="flex gap-10 mt-10">
          {/* {chartData && <LineChartComponent chartData={chartData} />} */}
          {tableData && (
            <TableDualData tableData={tableData} tableTitles={tableTitles} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dual;
