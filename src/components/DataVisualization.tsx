import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataVisualizationProps {
  data: { name: string; value: number }[];
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return null; // Or return a message indicating no data
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-800 p-4">Data Visualization</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataVisualization;
