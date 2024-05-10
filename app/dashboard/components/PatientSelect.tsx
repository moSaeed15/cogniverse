'use client';
import { ChangeEvent, Dispatch, useState } from 'react';

interface PatientData {
  id: string;
  name: string;
}

interface DoctorData {
  id: string;
  patientsData: PatientData[];
}

interface Props {
  selectedPatient: string;
  setSelectedPatient: Dispatch<React.SetStateAction<string>>;
  doctorData: DoctorData;
}

const PatientSelect = ({
  selectedPatient,
  setSelectedPatient,
  doctorData,
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPatient(event.target.value);
  };

  return (
    <>
      <select
        className="select select-primary min-w-72"
        value={selectedPatient}
        onChange={handleChange}
      >
        {doctorData?.patientsData.map((patient, i) => (
          <option key={i} value={patient.id}>
            {patient.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default PatientSelect;
