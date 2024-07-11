'use client';
import { capitalize } from '@/utils/captalize';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

const DemoSelection = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get('user');
  const game = searchParams.get('game');
  const session = searchParams.get('session');

  const [selectedGame, setSelectedGame] = useState<string>(
    game ? game : 'maze'
  );
  const [patientName, setSelectedPatientName] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<string>(
    user ? user : 'x8Y8rnE0EEWaxbRiNpQpDU3KUNl1'
  );
  const [selectedSession, setSelectedSession] = useState<string>(
    session ? session : '1'
  );

  const games = ['maze', 'focus', 'whack', 'trail', 'dualNback'];

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    switch (name) {
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

  return (
    <div className="ml-14 mr-14 mb-10 mt-10  flex gap-5 flex-wrap md:flex-nowrap ">
      <select
        className="select select-primary   md:min-w-44 2xl:min-w-64"
        value={selectedPatient}
        name="patient"
        onChange={handleChange}
        aria-label="Select Patient"
      >
        <option value="x8Y8rnE0EEWaxbRiNpQpDU3KUNl1">Test 5</option>
      </select>

      {/* Game Select */}

      <select
        className="select select-primary  md:min-w-44  2xl:min-w-64"
        value={selectedGame}
        name="game"
        onChange={handleChange}
        aria-label="Select Game"
      >
        {games.map((game, i) => (
          <option key={i} value={game}>
            {capitalize(game)}
          </option>
        ))}
      </select>

      {/* Session Select */}

      <select
        className="select select-primary md:min-w-44  2xl:min-w-64"
        value={selectedSession}
        name="session"
        aria-label="Select Session"
        onChange={handleChange}
      >
        <option value="1">Session One</option>
        <option value="2">Session Two</option>
        <option value="3">Session Three</option>
      </select>
      <Link
        href={`/demo?user=${selectedPatient}&game=${selectedGame}&session=${selectedSession}`}
      >
        <button className="btn btn-primary text-white">Apply</button>{' '}
      </Link>
    </div>
  );
};

export default DemoSelection;
