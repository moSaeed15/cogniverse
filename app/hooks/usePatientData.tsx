'use client';

import { useEffect, useState } from 'react';
import { database } from '../FirebaseConfig';
import { get, ref } from 'firebase/database';
import { capitalize } from '@/utils/captalize';

export interface PatientData {
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

const usePatientData = (user: string): PatientData | null => {
  const [patientData, setPatientData] = useState<null | PatientData>(null);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const userRef = ref(database, `users/${user}`);

      try {
        const snapshot = await get(userRef);

        const patientArray: any[] = Object.entries(snapshot.val()).map(
          ([key, value]) => ({
            [key]: value,
          })
        );

        const patientObject = patientArray.reduce((acc, current) => {
          const [key, value] = Object.entries(current)[0];
          return { ...acc, [key]: value };
        }, {});

        const patientData: PatientData = {
          age: patientObject.age,
          name:
            capitalize(patientObject.firstName) +
            ' ' +
            capitalize(patientObject.lastName),
          diagnosis: patientObject.diagnosis,
          email: patientObject.email,
          gender: patientObject.femalegender !== 'no' ? 'Female' : 'Male',
          reinforcementType: mapReinforcementType(
            patientObject.ispositiveGroup,
            patientObject.isnegativeGroup,
            patientObject.iscontrolGroup
          ),
        };

        setPatientData(patientData);
      } catch (error) {}
    };

    fetchData();
  }, [user]);

  if (patientData) return patientData;

  return null;
};

export default usePatientData;
