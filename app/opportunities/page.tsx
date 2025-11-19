'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Crosshair, Clock, TrendUp } from '@phosphor-icons/react';

interface Opportunity {
  id: number;
  title: string;
  channel: string;
  score: number;
  icpFit: number;
  urgency: string;
  date: string;
  status: 'active' | 'dismissed';
}

const opportunities: Opportunity[] = [
  { id: 1, title: 'High-Intent Discussion About GTM Tools', channel: 'r/SaaS', score: 9.2, icpFit: 87, urgency: '6 hours left', date: '2024-12-10', status: 'active' },
  { id: 2, title: 'Founders Seeking Marketing Automation Advice', channel: 'LinkedIn', score: 8.8, icpFit: 82, urgency: '12 hours left', date: '2024-12-10', status: 'active' },
  { id: 3, title: 'Pricing Strategy Discussion for B2B SaaS', channel: 'r/Entrepreneur', score: 8.5, icpFit: 79, urgency: '1 day left', date: '2024-12-09', status: 'active' },
  { id: 4, title: 'Product Hunt Launch Best Practices Thread', channel: 'Twitter', score: 8.3, icpFit: 75, urgency: '8 hours left', date: '2024-12-10', status: 'active' },
  { id: 5, title: 'B2B Growth Hacking Strategies', channel: 'Slack', score: 8.1, icpFit: 71, urgency: '2 days left', date: '2024-12-08', status: 'active' },
  { id: 6, title: 'Customer Acquisition Cost Benchmarks', channel: 'r/SaaS', score: 7.9, icpFit: 68, urgency: '1 day left', date: '2024-12-09', status: 'active' },
  { id: 7, title: 'Series A Fundraising Advice', channel: 'LinkedIn', score: 7.6, icpFit: 64, urgency: '3 days left', date: '2024-12-07', status: 'active' },
  { id: 8, title: 'Content Marketing for Technical Products', channel: 'r/Marketing', score: 7.4, icpFit: 61, urgency: '2 days left', date: '2024-12-08', status: 'active' },
];

export default function AllOpportunities() {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'date' | 'icpFit'>('score');

  const filteredOpportunities = opportunities
    .filter(opp => filter === 'all' || opp.channel.includes(filter))
    .sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'icpFit') return b.icpFit - a.icpFit;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <div className="flex h-screen bg-surface-light">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto bg-white p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">All Opportunities</h1>
            <p className="text-sm text-neutral">47 opportunities found across all channels</p>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div>
              <label className="text-xs text-neutral font-bold mb-2 block">Filter by Channel</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                <option value="all">All Channels</option>
                <option value="Reddit">Reddit</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Twitter">Twitter</option>
                <option value="Slack">Slack</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-neutral font-bold mb-2 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                <option value="score">Score (High to Low)</option>
                <option value="icpFit">ICP Fit %</option>
                <option value="date">Date (Newest)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Channel</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ICP Fit</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Urgency</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOpportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">{opp.title}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-800">
                        {opp.channel}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <TrendUp size={16} weight="fill" className="text-success" />
                        <span className="text-sm font-bold text-gray-900">{opp.score}/10</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-700">{opp.icpFit}%</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} className="text-warning" />
                        <span className="text-xs text-neutral">{opp.urgency}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-md hover:opacity-90">
                          Generate Reply
                        </button>
                        <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs font-bold rounded-md hover:bg-gray-50">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
