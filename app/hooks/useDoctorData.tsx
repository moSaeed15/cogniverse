'use client';
import { useState, useEffect } from 'react';
import { database, db } from '@/app/FirebaseConfig';
import { get, ref } from 'firebase/database';
import { collection, doc, getDocs } from 'firebase/firestore';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { capitalize } from '@/utils/captalize';

interface DbPatientData {
  id: string;
  name: string;
}

interface DoctorData {
  id: string;
  patientsData: DbPatientData[];
}

const useDoctorData = (): DoctorData | undefined => {
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null);

  const getDoctor = async (): Promise<string | null> => {
    const session: Session | null = await getSession();

    const data = await getDocs(collection(db, 'users'));

    const formattedData = data.docs.map(doc => {
      const email = doc.data().email;
      return {
        email: email,
        id: doc.id,
      };
    });

    const filteredData = formattedData.filter(dbUser => {
      return session?.user?.email === dbUser.email;
    });

    const userId = filteredData[0]?.id || null;
    return userId;
  };

  const getPatientsData = async (): Promise<DbPatientData[] | null> => {
    const userRef = ref(database, 'users');
    try {
      const snapshot = await get(userRef);
      const patientDataArr: DbPatientData[] = [];

      snapshot.forEach(childSnapshot => {
        const firstName = capitalize(childSnapshot.val().firstName);
        const lastName = capitalize(childSnapshot.val().lastName);
        const fullName = `${firstName} ${lastName}`.replace('  ', ' ');

        const patientData: DbPatientData = {
          id: childSnapshot.key || '',
          name: fullName,
        };
        patientDataArr.push(patientData);
      });
      return patientDataArr;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const cachedDoctorData = sessionStorage.getItem('doctorData');

      if (cachedDoctorData) {
        setDoctorData(JSON.parse(cachedDoctorData));
        return;
      }

      const userID = await getDoctor();
      if (!userID) return;

      const patientData = await getPatientsData();
      if (!patientData) return;

      const doctorData: DoctorData = {
        id: userID,
        patientsData: [...patientData],
      };

      sessionStorage.setItem('doctorData', JSON.stringify(doctorData));

      setDoctorData(doctorData);
    };

    fetchData();
  }, []);
  if (doctorData) return doctorData;
};

export default useDoctorData;
