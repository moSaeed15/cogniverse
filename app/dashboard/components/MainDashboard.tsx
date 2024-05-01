"use client";
import PatientCard from "./PatientCard";
import StatusCard from "./StatusCard";
import WelcomeCard from "./WelcomeCard";

interface TryItem {
  date: string;
  level: number;
  numberOfHits: number;
  overallTime: number;
  time: string;
}

interface DbData {
  email: string;
  id: string;
  emailVerified: boolean | null;
  image: string;
  name: string;
}

const MainDashboard = () => {


  return (
    <div className="ml-5 mr-5 mb-10">
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

export default MainDashboard;
