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
    <div className="bg-welcome rounded-3xl p-2 lg:p-5  py-14 self-center">
      <h2 className="text-2xl mb-5 font-semibold">Last Trial Data:</h2>
      <div className=" flex gap-5 ml-3 items-center">
        <ProgressBar progress={accuracy} label="Accuracy" />
        <ProgressBar progress={scorePercent} label="Score %" />

        <div className="flex flex-col space-y-7 justify-center  ">
          <div>
            <h3 className="text-gray-200 font-bold text-center whitespace-nowrap">
              Go Response Time
            </h3>
            <p className="text-gray-200  text-center">
              {goResponseTime.toFixed(3)} seconds
            </p>
          </div>
          <div>
            <h3 className="text-gray-200 font-bold text-center whitespace-nowrap">
              No Go Response Time
            </h3>
            <p className="text-gray-200  text-center">
              {noGoResponseTime.toFixed(3)} seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMetrics;
