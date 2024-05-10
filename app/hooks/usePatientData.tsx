'use client';

import { useEffect, useState } from 'react';
import { database } from '../FirebaseConfig';
import { get, ref } from 'firebase/database';
import { capitalize } from '@/utils/captalize';

interface Props {
  user: string;
}

interface PatientData {
  age: number;
  name: string;
  diagnosis: string;
  email: string;
  gender: string;
  reinforcementType: string;
}

const mapReinforcementType = (
  isPostive: boolean,
  isNegative: boolean,
  isControl: boolean
): string => {
  if (isPostive) return 'Postive';
  if (isNegative) return 'Negative';
  if (isControl) return 'Control';

  return '';
};

const usePatientData = ({ user }: Props) => {
  const [patientData, setPatientData] = useState<null | PatientData>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const userRef = ref(database, `users/${user}`);

      try {
        const snapshot = await get(userRef);

        const userArray: any[] = Object.entries(snapshot.val()).map(
          ([key, value]) => ({
            [key]: value,
          })
        );

        const userData: PatientData = {
          age: userArray[16].age,
          name:
            capitalize(userArray[21].firstName) +
            capitalize(userArray[28].lastName),
          diagnosis: userArray[17].diagnosis,
          email: userArray[19].email,
          gender: userArray[20].femalegender === 'no' ? 'female' : 'male',
          reinforcementType: mapReinforcementType(
            userArray[27],
            userArray[26],
            userArray[25]
          ),
        };
        console.log(userData);
      } catch (error) {}
    };

    fetchData();
  }, []);
  // if (patientData) return patientData;
};

export default usePatientData;
