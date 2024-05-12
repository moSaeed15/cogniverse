'use client';
import { ChangeEvent, useState } from 'react';
import useDoctorData from '@/app/hooks/useDoctorData';
import { capitalize } from '@/utils/captalize';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const MainDashboard = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get('user');
  const game = searchParams.get('game');
  const session = searchParams.get('session');

  const [selectedGame, setSelectedGame] = useState<string>(
    game ? game : 'maze'
  );
  const [patientName, setSelectedPatientName] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<string>(
    user ? user : '0VLnT4k4MZVe7l57JSjcTpXDQ8z1'
  );
  const [selectedSession, setSelectedSession] = useState<string>(
    session ? session : '1'
  );

  const games = ['maze', 'focus', 'whack', 'trail', 'dualNback'];

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'patient':
        setSelectedPatient(value);
        if (event.target.textContent) {
          setSelectedPatientName(event.target.textContent);
        }
        break;
      case 'game':
        setSelectedGame(value);
        break;
      case 'session':
        setSelectedSession(value);
        break;
      default:
        break;
    }
  };

  const doctorData = useDoctorData();

  return (
    <>
      {/* Patient Select */}
      {doctorData ? (
        <div className="ml-14 mr-14 mb-10 mt-5  flex gap-10">
          <select
            className="select select-primary min-w-72"
            value={selectedPatient}
            name="patient"
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
            name="game"
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
            name="session"
            onChange={handleChange}
          >
            <option value="1">Session One</option>
            <option value="2">Session Two</option>
            <option value="3">Session Three</option>
          </select>
          <Link
            href={`/dashboard?user=${selectedPatient}&game=${selectedGame}&session=${selectedSession}`}
          >
            <button className="btn btn-primary text-white">Apply</button>{' '}
          </Link>
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
