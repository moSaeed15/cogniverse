import PatientCard from './PatientCard';
import WelcomeCard from './WelcomeCard';
import StatusCard from './StatusCard';

const Maze = () => {
  return (
    <div>
      <div className=" grid grid-cols-4 gap-8 mt-7 ">
        <StatusCard title="Number of hits" image="/crash.svg" number={1} />
        <StatusCard title="Number of trials" image="/success.svg" number={2} />
        <StatusCard
          title="Total time"
          image="/clock.svg"
          number={18}
          isTime={true}
        />
        <StatusCard
          title="Average time per level"
          image="/hourglass.svg"
          number={1}
          isTime={true}
        />
      </div>
      <div className="flex gap-10 mt-10">
        <WelcomeCard />
        <PatientCard />
      </div>
      {/* {tries && <LineChartComponent tries={tries} />} */}
    </div>
  );
};

export default Maze;
