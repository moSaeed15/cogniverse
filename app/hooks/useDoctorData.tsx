'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

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
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch('/api/getpatients');
        const result = await response.json();

        if (result.success && result.data) {
          setDoctorData({
            id: session.user?.email ?? '',
            patientsData: result.data,
          });
        } else {
          console.error('Error fetching patients:', result.message);
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchData();
  }, [status, session]);

  if (doctorData) return doctorData;
};

export default useDoctorData;
