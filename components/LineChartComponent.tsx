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
    <div className="bg-welcome rounded-3xl 2xl:p-10 p-6 flex h-full col-span-2 md:col-span-1 lg:items-stretch items-center">
      {/* Large Screen Chart */}
      <LineChart
        width={500}
        height={300}
        className="mt-10 text-white hidden 2xl:block  "
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
      {/* Medium Screen Chart */}
      <LineChart
        width={450}
        height={300}
        className="mt-10 text-white  hidden lg:block 2xl:hidden"
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
      {/* Small Screen Chart */}
      <LineChart
        width={330}
        height={250}
        className="mt-10 text-white lg:hidden   2xl:hidden mx-auto md:-ml-5"
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
