import React from 'react';
import Maze from '../dashboard/components/Maze/Maze';
import Focus from '../dashboard/components/Focus/Focus';
import Dual from '../dashboard/components/Dual/Dual';
import Whack from '../dashboard/components/Whack/Whack';
import Trail from '../dashboard/components/Trail/Trail';

interface Props {
  searchParams: {
    game: string;
    user: string;
    session: string;
  };
}

const DemoPage = ({ searchParams: { game, user, session } }: Props) => {
  return (
    <div className="flex pl-14 pb-10 mr-5  ">
      {' '}
      {game === 'maze' && (
        <Maze
          sessionNumber={Number(session)}
          game={game}
          user={user}
          isDemo={true}
        />
      )}
      {game === 'dualNback' && (
        <Dual
          sessionNumber={Number(session)}
          game={game}
          user={user}
          isDemo={true}
        />
      )}
      {game === 'focus' && (
        <Focus
          sessionNumber={Number(session)}
          game={game}
          user={user}
          isDemo={true}
        />
      )}
      {game === 'whack' && (
        <Whack
          sessionNumber={Number(session)}
          game={game}
          user={user}
          isDemo={true}
        />
      )}
      {game === 'trail' && (
        <Trail
          sessionNumber={Number(session)}
          game={game}
          user={user}
          isDemo={true}
        />
      )}
    </div>
  );
};

export default DemoPage;
