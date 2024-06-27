import { SharedGameObject } from '@/app/types/gameTypes';

interface Props {
  tableData: SharedGameObject[];
  tableTitles: string[];
}

const TableGamesData = ({ tableData, tableTitles }: Props) => {
  return (
    <div className="overflow-x-auto bg-welcome rounded-3xl p-10 py-16  max-h-96 lg:col-span-1 col-span-2">
      <table className="table table-zebra ">
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
              <td>{tryItem.accuracy.toFixed(3)}</td>
              <td>{tryItem.goResponseTime.toFixed(3)}</td>
              <td>{tryItem.noGoResponseTime.toFixed(3)}</td>
              <td>{+tryItem.scorePercent.toFixed(2) * 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableGamesData;
