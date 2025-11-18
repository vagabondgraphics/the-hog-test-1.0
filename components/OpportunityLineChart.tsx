'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Demo data: Weekly opportunity discovery trends
const data = [
  { week: 'Nov 11', opportunities: 12, highIntent: 8, converted: 3 },
  { week: 'Nov 13', opportunities: 19, highIntent: 12, converted: 5 },
  { week: 'Nov 15', opportunities: 23, highIntent: 15, converted: 7 },
  { week: 'Nov 17', opportunities: 31, highIntent: 20, converted: 9 },
  { week: 'Nov 19', opportunities: 28, highIntent: 18, converted: 8 },
  { week: 'Nov 21', opportunities: 35, highIntent: 24, converted: 11 },
  { week: 'Nov 23', opportunities: 47, highIntent: 32, converted: 15 },
  { week: 'Nov 25', opportunities: 52, highIntent: 36, converted: 18 },
  { week: 'Nov 27', opportunities: 45, highIntent: 30, converted: 14 },
  { week: 'Nov 29', opportunities: 58, highIntent: 40, converted: 20 },
  { week: 'Dec 1', opportunities: 51, highIntent: 35, converted: 17 },
  { week: 'Dec 3', opportunities: 62, highIntent: 43, converted: 22 },
  { week: 'Dec 5', opportunities: 68, highIntent: 48, converted: 25 },
  { week: 'Dec 7', opportunities: 71, highIntent: 51, converted: 28 },
  { week: 'Dec 9', opportunities: 65, highIntent: 46, converted: 24 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-lg p-2.5">
        <p className="text-xs font-bold text-gray-900 mb-1.5">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-1.5 mb-0.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.stroke }}
            />
            <span className="text-xs text-gray-700">
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function OpportunityLineChart() {
  return (
    <div className="p-5">
      {/* Header with segment breakdown */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Opportunity Discovery Trends</h2>
        <div className="flex gap-6 mb-1">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Total Opportunities</div>
            <div className="text-base font-bold text-gray-900">685</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">High Intent</div>
            <div className="text-base font-bold text-gray-900">458</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Converted</div>
            <div className="text-base font-bold text-gray-900">226</div>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -25, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="0" stroke="#F3F4F6" vertical={false} />
          <XAxis
            dataKey="week"
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={1}
            style={{
              fontFamily: 'Akkurat, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'
            }}
          />
          <YAxis
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            style={{
              fontFamily: 'Akkurat, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }} />
          <Line
            type="monotone"
            dataKey="opportunities"
            stroke="#1B5066"
            strokeWidth={2.5}
            name="Total Opportunities"
            dot={{ fill: '#1B5066', r: 3.5 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="highIntent"
            stroke="#10B981"
            strokeWidth={2.5}
            name="High Intent"
            dot={{ fill: '#10B981', r: 3.5 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="converted"
            stroke="#F59E0B"
            strokeWidth={2.5}
            name="Converted to Campaigns"
            dot={{ fill: '#F59E0B', r: 3.5 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
