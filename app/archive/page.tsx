'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Archive, ArrowCounterClockwise, Trash } from '@phosphor-icons/react';

interface ArchivedItem {
  id: number;
  type: 'opportunity' | 'task' | 'campaign';
  title: string;
  archivedDate: string;
  originalDate: string;
}

const archivedItems: ArchivedItem[] = [
  { id: 1, type: 'opportunity', title: 'Community Discussion on Growth Strategies', archivedDate: '2024-12-09', originalDate: '2024-12-08' },
  { id: 2, type: 'task', title: 'Update competitor pricing comparison', archivedDate: '2024-12-08', originalDate: '2024-12-07' },
  { id: 3, type: 'opportunity', title: 'Indie Hackers Product Launch Thread', archivedDate: '2024-12-07', originalDate: '2024-12-05' },
  { id: 4, type: 'campaign', title: 'LinkedIn Thought Leadership Series Q4', archivedDate: '2024-12-06', originalDate: '2024-10-01' },
  { id: 5, type: 'task', title: 'Research new channel: Discord communities', archivedDate: '2024-12-05', originalDate: '2024-12-04' },
];

export default function ArchivePage() {
  const [filter, setFilter] = useState<string>('all');

  const filteredItems = archivedItems.filter(
    item => filter === 'all' || item.type === filter
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-blue-100 text-blue-800';
      case 'task': return 'bg-green-100 text-green-800';
      case 'campaign': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-surface-light">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto bg-white p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Archive size={28} weight="fill" className="text-neutral" />
              <h1 className="text-2xl font-bold text-gray-900">Archive</h1>
            </div>
            <p className="text-sm text-neutral">Dismissed opportunities, completed tasks, and inactive campaigns (last 30 days)</p>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Items ({archivedItems.length})
            </button>
            <button
              onClick={() => setFilter('opportunity')}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                filter === 'opportunity' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Opportunities
            </button>
            <button
              onClick={() => setFilter('task')}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                filter === 'task' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setFilter('campaign')}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                filter === 'campaign' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Campaigns
            </button>
          </div>

          {/* List */}
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${getTypeColor(item.type)}`}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                      <span className="text-xs text-neutral">
                        Archived on {new Date(item.archivedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-neutral">
                      Originally created: {new Date(item.originalDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-bold rounded-md hover:bg-gray-50 transition-colors">
                      <ArrowCounterClockwise size={14} weight="bold" />
                      Restore
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-red-300 text-red-700 text-xs font-bold rounded-md hover:bg-red-50 transition-colors">
                      <Trash size={14} weight="bold" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Archive size={48} weight="thin" className="text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-neutral">No archived items found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
