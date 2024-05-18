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
    <div className="bg-welcome rounded-3xl p-10 py-14   self-center  ">
      <h2 className="text-2xl mb-5 font-semibold">Last Trial Data:</h2>
      <div className=" flex gap-5 ml-3 items-center">
        <ProgressBar progress={accuracy} label="Accuracy" />
        <ProgressBar progress={scorePercent} label="Score %" />
      </div>
    </div>
  );
};

export default TrailGameMetrics;
