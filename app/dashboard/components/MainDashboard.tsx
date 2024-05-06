'use client';
import { ChangeEvent, useState } from 'react';
import useDoctorData from '@/app/hooks/useDoctorData';
import { capitalize } from '@/utils/captalize';
import { useRouter } from 'next/navigation';

const MainDashboard = () => {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<string>('');

  const games = ['maze', 'focus', 'whack', 'trail', 'dualNback'];

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(event.target.value);
  };

  const doctorData = useDoctorData();

  return (
    <>
      {/* Patient Select */}

      {doctorData ? (
        <div className="ml-10 mr-5 mb-10 mt-5  flex gap-10">
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

          {/* Game Select */}

          <select
            className="select select-primary min-w-72"
            value={selectedGame}
            onChange={handleChange}
          >
            {games.map((game, i) => (
              <option key={i} value={game}>
                {capitalize(game)}
              </option>
            ))}
          </select>

          {/* Session Select */}

          <select
            className="select select-primary min-w-72"
            value={selectedSession}
            onChange={handleChange}
          >
            <option value="1">Session One</option>
            <option value="2">Session Two</option>
            <option value="3">Session Three</option>
          </select>

          <button
            className="btn btn-primary text-white"
            onClick={() => {
              // router.push();
            }}
          >
            Apply
          </button>
        </div>
      ) : (
        <div className="ml-10 mr-5 mb-10  mt-5  flex  gap-10">
          <div className="skeleton w-64 h-12"></div>
          <div className="skeleton w-64 h-12"></div>
          <div className="skeleton w-64 h-12"></div>
          <button className="btn btn-primary text-white skeleton min-w-20"></button>
        </div>
      )}
    </>
  );
};

export default MainDashboard;
