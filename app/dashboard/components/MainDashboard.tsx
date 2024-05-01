'use client';
import { get, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database, db } from '@/app/FirebaseConfig';
import PatientCard from './PatientCard';
import StatusCard from './StatusCard';
import WelcomeCard from './WelcomeCard';
import LineChartComponent from './LineChartComponent';
import { getSession } from 'next-auth/react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { Session } from 'next-auth';

interface TryItem {
  date: string;
  level: number;
  numberOfHits: number;
  overallTime: number;
  time: string;
}

const MainDashboard = () => {
  const [tries, setTries] = useState<{ count: string; Time: number }[]>();
  const usersCollectionRef = collection(db, 'users');
  useEffect(() => {
    let doctor: Session;

    const getDoctor = async () => {
      const session = await getSession();
      console.log(session);
      doctor = session!;

      try {
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map(doc => ({
          id: doc.id,
        }));
        console.log(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    getDoctor();

    // code for patient retrival
    const userRef = ref(database, 'users/28Vwffza7FRCQnulxvoursRyhYL2/maze');

    get(userRef).then(snapshot => {
      if (snapshot.exists()) {
        const snapshotArr: TryItem[] = Object.values(snapshot.val());
        snapshotArr.sort((a, b) => a.overallTime - b.overallTime);

        let prevTime = 0;

        const processedData = snapshotArr.map((tryItem, index) => {
          const newItem = {
            count: `trial ${index + 1}`,
            Time: tryItem.overallTime,
          };
          // prevTime = tryItem.overallTime;

          return newItem;
        });

        setTries(processedData);
        console.log(processedData);
      }
    });
  }, []);

  return (
    <div className="ml-5 mr-5 mb-10">
      <div className=" grid grid-cols-4 gap-8 mt-7 ">
        <StatusCard title="Number of hits" image="/crash.svg" number={1} />
        <StatusCard title="Number of trials" image="/success.svg" number={2} />
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
        <WelcomeCard />
        <PatientCard />
      </div>
      {/* {tries && <LineChartComponent tries={tries} />} */}
    </div>
  );
};

export default MainDashboard;
