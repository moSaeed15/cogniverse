'use client';

import { useSession } from 'next-auth/react';
import Daul from './components/Dual/Dual';
import Focus from './components/Focus/Focus';
import Maze from './components/Maze/Maze';
import Trail from './components/Trail/Trail';
import Whack from './components/Whack/Whack';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  searchParams: {
    game: string;
    user: string;
    session: string;
  };
}

const Dashboard = ({ searchParams: { game, user, session } }: Props) => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(data);
    if (data === undefined) router.push('/');
  }, []);

  return (
    <div className="flex pl-14 pb-10 mr-5  ">
      {game === 'maze' && (
        <Maze sessionNumber={Number(session)} game={game} user={user} />
      )}

      {game === 'dualNback' && (
        <Daul sessionNumber={Number(session)} game={game} user={user} />
      )}
      {game === 'focus' && (
        <Focus sessionNumber={Number(session)} game={game} user={user} />
      )}

      {game === 'whack' && (
        <Whack sessionNumber={Number(session)} game={game} user={user} />
      )}

      {game === 'trail' && (
        <Trail sessionNumber={Number(session)} game={game} user={user} />
      )}
    </div>
  );
};

export default Dashboard;
