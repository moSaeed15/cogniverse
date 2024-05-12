import React from 'react';

import { MazeObject } from './Maze';

interface Props {
  tableData: MazeObject[];
}

const TrialsData = ({ tableData }: Props) => {
  return (
    <div className="overflow-x-auto bg-welcome rounded-3xl p-10 w-[55%] ">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="text-lg text-white font-bold">
            <th>Trial Number</th>
            <th>Time</th>
            <th>Number of hits</th>
            <th>Trial time</th>
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
