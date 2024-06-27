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
  accuracyChartData: { count: string; accuracy: number }[];
}

const AccuracyChartData = ({ accuracyChartData }: Props) => {
  return (
    <div className="bg-welcome rounded-3xl 2xl:p-7 lg:p-2 flex h-full  lg:items-stretch items-center ">
      {/* Large Screen Chart */}
      <LineChart
        width={500}
        height={300}
        className="mt-10 text-white hidden 2xl:block  "
        data={accuracyChartData}
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
          dataKey="accuracy"
          stroke="#8884d8"
          activeDot={{ r: 5 }}
        />
      </LineChart>
      {/* Medium Screen Chart */}

      <LineChart
        width={400}
        height={300}
        className="mt-10 text-white  hidden lg:block 2xl:hidden"
        data={accuracyChartData}
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
          dataKey="accuracy"
          stroke="#8884d8"
          activeDot={{ r: 5 }}
        />
      </LineChart>
      {/* Small Screen Chart */}
      <LineChart
        width={360}
        height={250}
        className="mt-10 text-white lg:hidden  mx-auto 2xl:hidden"
        data={accuracyChartData}
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
          dataKey="accuracy"
          stroke="#8884d8"
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </div>
  );
};

export default AccuracyChartData;
