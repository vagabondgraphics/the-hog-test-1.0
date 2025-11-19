'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Demo data: Daily channel engagement volume (realistic for lean team monitoring)
const data = [
  { date: 'Nov 11', reddit: 12, linkedin: 8, twitter: 5, slack: 4 },
  { date: 'Nov 12', reddit: 10, linkedin: 7, twitter: 4, slack: 3 },
  { date: 'Nov 13', reddit: 15, linkedin: 9, twitter: 6, slack: 5 },
  { date: 'Nov 14', reddit: 11, linkedin: 8, twitter: 5, slack: 4 },
  { date: 'Nov 15', reddit: 9, linkedin: 6, twitter: 4, slack: 3 },
  { date: 'Nov 16', reddit: 8, linkedin: 5, twitter: 3, slack: 2 },
  { date: 'Nov 17', reddit: 7, linkedin: 5, twitter: 4, slack: 3 },
  { date: 'Nov 18', reddit: 16, linkedin: 10, twitter: 7, slack: 6 },
  { date: 'Nov 19', reddit: 13, linkedin: 9, twitter: 6, slack: 5 },
  { date: 'Nov 20', reddit: 12, linkedin: 8, twitter: 5, slack: 4 },
  { date: 'Nov 21', reddit: 10, linkedin: 7, twitter: 5, slack: 4 },
  { date: 'Nov 22', reddit: 8, linkedin: 6, twitter: 4, slack: 3 },
  { date: 'Nov 23', reddit: 7, linkedin: 5, twitter: 3, slack: 2 },
  { date: 'Nov 24', reddit: 6, linkedin: 4, twitter: 3, slack: 2 },
  { date: 'Nov 25', reddit: 9, linkedin: 6, twitter: 4, slack: 3 },
  { date: 'Nov 26', reddit: 7, linkedin: 5, twitter: 3, slack: 2 },
  { date: 'Nov 27', reddit: 6, linkedin: 4, twitter: 3, slack: 2 },
  { date: 'Nov 28', reddit: 8, linkedin: 5, twitter: 4, slack: 3 },
  { date: 'Nov 29', reddit: 10, linkedin: 7, twitter: 5, slack: 4 },
  { date: 'Nov 30', reddit: 9, linkedin: 6, twitter: 4, slack: 3 },
  { date: 'Dec 1', reddit: 10, linkedin: 7, twitter: 5, slack: 4 },
  { date: 'Dec 2', reddit: 11, linkedin: 8, twitter: 5, slack: 4 },
  { date: 'Dec 3', reddit: 9, linkedin: 6, twitter: 4, slack: 3 },
  { date: 'Dec 4', reddit: 10, linkedin: 7, twitter: 5, slack: 4 },
  { date: 'Dec 5', reddit: 9, linkedin: 6, twitter: 4, slack: 3 },
  { date: 'Dec 6', reddit: 10, linkedin: 7, twitter: 5, slack: 4 },
  { date: 'Dec 7', reddit: 8, linkedin: 6, twitter: 4, slack: 3 },
  { date: 'Dec 8', reddit: 9, linkedin: 6, twitter: 4, slack: 3 },
  { date: 'Dec 9', reddit: 8, linkedin: 5, twitter: 3, slack: 2 },
  { date: 'Dec 10', reddit: 7, linkedin: 5, twitter: 3, slack: 2 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-lg p-2.5">
        <p className="text-xs font-bold text-gray-900 mb-1.5">{label}</p>
        <p className="text-xs text-gray-600 mb-1.5">Total: <span className="font-bold">{total.toLocaleString()}</span></p>
        {payload.reverse().map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-1.5 mb-0.5">
            <div
              className="w-2 h-2 rounded-sm"
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-xs text-gray-700">
              {entry.name}: <span className="font-bold">{entry.value.toLocaleString()}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function OpportunityTrendGraph() {
  return (
    <div className="p-5">
      {/* Header with segment breakdown */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Channel Engagement Volume</h2>
        <div className="flex gap-6 mb-1">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Reddit Communities</div>
            <div className="text-base font-bold text-gray-900">284</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">LinkedIn Posts</div>
            <div className="text-base font-bold text-gray-900">196</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Twitter Threads</div>
            <div className="text-base font-bold text-gray-900">128</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Slack Communities</div>
            <div className="text-base font-bold text-gray-900">102</div>
          </div>
        </div>
      </div>

      {/* Stacked Bar Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 0, left: -25, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="0" stroke="#F3F4F6" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={2}
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          <Bar dataKey="reddit" stackId="a" fill="#5B9BD5" name="Reddit Communities" radius={[0, 0, 0, 0]} />
          <Bar dataKey="linkedin" stackId="a" fill="#F4B084" name="LinkedIn Posts" radius={[0, 0, 0, 0]} />
          <Bar dataKey="twitter" stackId="a" fill="#70AD47" name="Twitter Threads" radius={[0, 0, 0, 0]} />
          <Bar dataKey="slack" stackId="a" fill="#FFC000" name="Slack Communities" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
