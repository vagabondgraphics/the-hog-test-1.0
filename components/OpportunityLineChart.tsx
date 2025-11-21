'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Demo data: Weekly opportunity discovery trends (realistic for small team)
const data = [
  { week: 'Nov 11', opportunities: 2, highIntent: 1, converted: 0 },
  { week: 'Nov 13', opportunities: 3, highIntent: 1, converted: 1 },
  { week: 'Nov 15', opportunities: 4, highIntent: 2, converted: 1 },
  { week: 'Nov 17', opportunities: 5, highIntent: 2, converted: 1 },
  { week: 'Nov 19', opportunities: 3, highIntent: 1, converted: 0 },
  { week: 'Nov 21', opportunities: 6, highIntent: 3, converted: 1 },
  { week: 'Nov 23', opportunities: 7, highIntent: 4, converted: 2 },
  { week: 'Nov 25', opportunities: 8, highIntent: 3, converted: 1 },
  { week: 'Nov 27', opportunities: 6, highIntent: 2, converted: 1 },
  { week: 'Nov 29', opportunities: 9, highIntent: 5, converted: 2 },
  { week: 'Dec 1', opportunities: 7, highIntent: 3, converted: 1 },
  { week: 'Dec 3', opportunities: 10, highIntent: 6, converted: 3 },
  { week: 'Dec 5', opportunities: 11, highIntent: 7, converted: 2 },
  { week: 'Dec 7', opportunities: 13, highIntent: 8, converted: 3 },
  { week: 'Dec 9', opportunities: 12, highIntent: 6, converted: 2 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-md shadow-lg p-2.5">
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
            <div className="text-base font-bold text-gray-900">47</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">High Intent</div>
            <div className="text-base font-bold text-gray-900">18</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Converted</div>
            <div className="text-base font-bold text-gray-900">7</div>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={240}>
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
