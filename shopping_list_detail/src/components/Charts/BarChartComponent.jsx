import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartComponent = ({ data }) => {
  return (
    <BarChart width={1000} height={120} data={data}>
      <CartesianGrid strokeDasharray="1 3000" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />

      <Bar dataKey="Počet_položek" fill="#8884d8" />
    </BarChart>
  );
};

export default BarChartComponent;
