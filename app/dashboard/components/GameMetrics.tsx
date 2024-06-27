import ProgressBar from '@/components/ProgressBar';

interface GameMetricsProps {
  accuracy: number;
  scorePercent: number;
  goResponseTime: number;
  noGoResponseTime: number;
}
const GameMetrics = ({
  accuracy,
  scorePercent,
  goResponseTime,
  noGoResponseTime,
}: GameMetricsProps) => {
  return (
    <div className="bg-welcome rounded-3xl p-2 lg:p-5  py-14 md:col-span-1 col-span-2   ">
      <h2 className="text-2xl mb-5 font-semibold ml-5 md:text-left text-center">
        Last Trial Data:
      </h2>
      <div className=" flex flex-col xl:flex-row ml-5 lg:ml-3 gap-5  2xl:items-center md:items-start items-center">
        <div className="flex  gap-14 lg:gap-8  ">
          <ProgressBar progress={accuracy} label="Accuracy" />
          <ProgressBar progress={scorePercent} label="Score %" />
        </div>
        <div className="flex xl:flex-col flex-row gap-4 lg:gap-10 2xl:space-y-7 2xl:justify-center  items-center ">
          <div className="">
            <h3 className="text-gray-200 font-bold text-center whitespace-nowrap text-base lg:text-base md:text-sm">
              Go Response Time
            </h3>
            <p className="text-gray-200  text-center text-base lg:text-base md:text-sm">
              {goResponseTime.toFixed(3)} seconds
            </p>
          </div>
          <div className="">
            <h3 className="text-gray-200 font-bold text-center whitespace-nowrap text-base lg:text-base md:text-sm">
              No Go Response Time
            </h3>
            <p className="text-gray-200  text-center text-base lg:text-base md:text-sm">
              {noGoResponseTime.toFixed(3)} seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMetrics;
