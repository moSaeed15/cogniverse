import { MazeObject } from '@/app/types/gameTypes';

interface Props {
  tableData: MazeObject[];
  tableTitles: string[];
}

const TrialsData = ({ tableData, tableTitles }: Props) => {
  return (
    <div className="overflow-x-auto bg-welcome rounded-3xl p-10 w-[55%] ">
      <table className="table table-zebra">
        <thead>
          <tr className="text-lg text-white font-bold">
            {tableTitles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((tryItem, index) => (
            <tr key={index} className="text-gray-300">
              <th>Trial {index + 1}</th>
              <td>{tryItem.time}</td>
              <td>{tryItem.numberOfHits}</td>
              <td>{tryItem.overallTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrialsData;
