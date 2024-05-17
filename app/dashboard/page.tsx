import Daul from './components/Dual/Dual';
import Focus from './components/Focus/Focus';
import Maze from './components/Maze/Maze';

interface Props {
  searchParams: {
    game: string;
    user: string;
    session: string;
  };
}

const Dashboard = ({ searchParams: { game, user, session } }: Props) => {
  return (
    <div className="flex pl-14 pb-10 ">
      {game === 'maze' && session !== '3' && (
        <Maze sessionNumber={Number(session)} game={game} user={user} />
      )}

      {game === 'dualNback' && (
        <Daul sessionNumber={Number(session)} game={game} user={user} />
      )}
      {game === 'focus' && (
        <Focus sessionNumber={Number(session)} game={game} user={user} />
      )}
    </div>
  );
};

export default Dashboard;
