import React from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface Props {
  chartData: { count: string; Time: number }[];
}

const LineChartComponent = ({ chartData }: Props) => {
  return (
    <div className="bg-welcome rounded-3xl p-7 w-[44%] mt-10 ">
      <LineChart
        width={500}
        height={300}
        className="mt-10 text-white"
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="count"
          className="text-white"
          style={{
            fill: 'rgb(255, 255, 255)',
          }}
        />

        <YAxis
          className="text-white"
          style={{
            fill: 'rgb(255, 255, 255)',
          }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Time"
          stroke="#8884d8"
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
