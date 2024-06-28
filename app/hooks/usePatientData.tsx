'use client';

import { useEffect, useState } from 'react';
import { PatientData } from '@/app/types/patientTypes';

const usePatientData = (user: string): PatientData | null => {
  const [patientData, setPatientData] = useState<null | PatientData>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/getpatientdata?user=${user}`);
        const result = await response.json();

        if (result.success && result.data) {
          setPatientData(result.data);
        } else {
          console.error('Error fetching patient data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchData();
  }, [user]);

  return patientData;
};

export default usePatientData;
