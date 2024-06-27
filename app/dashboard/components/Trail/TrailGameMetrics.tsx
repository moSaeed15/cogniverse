import ProgressBar from '@/components/ProgressBar';

interface TrailGameMetricsProps {
  accuracy: number;
  scorePercent: number;
}
const TrailGameMetrics = ({
  accuracy,
  scorePercent,
}: TrailGameMetricsProps) => {
  return (
    <div className="bg-welcome rounded-3xl p-10 py-14 self-center md:col-span-1 col-span-2 flex flex-col ">
      <h2 className="text-2xl mb-5 font-semibold md:text-left text-center">
        Last Trial Data:
      </h2>
      <div className=" flex gap-5 sm:gap-14 lg:gap-8 items-center self-center md:self-start  flex-col sm:flex-row ">
        <ProgressBar progress={accuracy} label="Accuracy" />
        <ProgressBar progress={scorePercent} label="Score %" />
      </div>
    </div>
  );
};

export default TrailGameMetrics;
