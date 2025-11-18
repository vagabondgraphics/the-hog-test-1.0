'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Demo data: Daily channel engagement volume (stacked by audience segment)
const data = [
  { date: 'Nov 11', reddit: 890, linkedin: 620, twitter: 450, slack: 380 },
  { date: 'Nov 12', reddit: 780, linkedin: 580, twitter: 420, slack: 360 },
  { date: 'Nov 13', reddit: 920, linkedin: 640, twitter: 480, slack: 420 },
  { date: 'Nov 14', reddit: 850, linkedin: 610, twitter: 440, slack: 390 },
  { date: 'Nov 15', reddit: 740, linkedin: 560, twitter: 410, slack: 350 },
  { date: 'Nov 16', reddit: 680, linkedin: 520, twitter: 380, slack: 320 },
  { date: 'Nov 17', reddit: 710, linkedin: 540, twitter: 390, slack: 340 },
  { date: 'Nov 18', reddit: 950, linkedin: 660, twitter: 500, slack: 440 },
  { date: 'Nov 19', reddit: 890, linkedin: 630, twitter: 470, slack: 410 },
  { date: 'Nov 20', reddit: 820, linkedin: 590, twitter: 450, slack: 380 },
  { date: 'Nov 21', reddit: 760, linkedin: 570, twitter: 430, slack: 360 },
  { date: 'Nov 22', reddit: 640, linkedin: 510, twitter: 390, slack: 330 },
  { date: 'Nov 23', reddit: 580, linkedin: 480, twitter: 360, slack: 310 },
  { date: 'Nov 24', reddit: 550, linkedin: 460, twitter: 350, slack: 290 },
  { date: 'Nov 25', reddit: 610, linkedin: 490, twitter: 370, slack: 320 },
  { date: 'Nov 26', reddit: 520, linkedin: 440, twitter: 340, slack: 280 },
  { date: 'Nov 27', reddit: 490, linkedin: 420, twitter: 330, slack: 270 },
  { date: 'Nov 28', reddit: 540, linkedin: 450, twitter: 350, slack: 290 },
  { date: 'Nov 29', reddit: 620, linkedin: 480, twitter: 370, slack: 320 },
  { date: 'Nov 30', reddit: 580, linkedin: 470, twitter: 360, slack: 300 },
  { date: 'Dec 1', reddit: 610, linkedin: 490, twitter: 380, slack: 320 },
  { date: 'Dec 2', reddit: 640, linkedin: 510, twitter: 390, slack: 340 },
  { date: 'Dec 3', reddit: 590, linkedin: 480, twitter: 370, slack: 310 },
  { date: 'Dec 4', reddit: 620, linkedin: 500, twitter: 380, slack: 330 },
  { date: 'Dec 5', reddit: 580, linkedin: 470, twitter: 360, slack: 310 },
  { date: 'Dec 6', reddit: 600, linkedin: 490, twitter: 375, slack: 320 },
  { date: 'Dec 7', reddit: 560, linkedin: 460, twitter: 350, slack: 300 },
  { date: 'Dec 8', reddit: 590, linkedin: 480, twitter: 365, slack: 315 },
  { date: 'Dec 9', reddit: 540, linkedin: 450, twitter: 345, slack: 290 },
  { date: 'Dec 10', reddit: 520, linkedin: 440, twitter: 340, slack: 280 },
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
            <div className="text-base font-bold text-gray-900">19,240</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">LinkedIn Posts</div>
            <div className="text-base font-bold text-gray-900">15,630</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Twitter Threads</div>
            <div className="text-base font-bold text-gray-900">11,450</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Slack Communities</div>
            <div className="text-base font-bold text-gray-900">9,870</div>
          </div>
        </div>
      </div>

      {/* Stacked Bar Chart */}
      <ResponsiveContainer width="100%" height={320}>
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
            tickFormatter={(value) => `${value / 1000}K`}
            ticks={[0, 1000, 2000, 3000, 4000, 5000]}
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
