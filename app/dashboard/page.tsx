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
      {game === 'maze' && (
        <Maze sessionNumber={Number(session)} game={game} user={user} />
      )}
    </div>
  );
};

export default Dashboard;
