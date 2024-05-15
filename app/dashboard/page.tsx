import Daul from './components/Dual';
import Maze from './components/Maze';

interface Props {
  searchParams: {
    game: string;
    user: string;
    session: string;
  };
}

const Dashboard = ({ searchParams: { game, user, session } }: Props) => {
  return (
    <div className="flex px-14 pb-10 ">
      {game === 'maze' && session !== '3' && (
        <Maze sessionNumber={Number(session)} game={game} user={user} />
      )}

      {game === 'dualNback' && (
        <Daul sessionNumber={Number(session)} game={game} user={user} />
      )}
    </div>
  );
};

export default Dashboard;
