'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Kanban, Calendar, TrendUp, User } from '@phosphor-icons/react';

interface Campaign {
  id: number;
  title: string;
  channel: string;
  status: 'planned' | 'in_progress' | 'completed';
  assignee: string;
  dueDate: string;
  leads: number;
  conversionRate: number;
}

const campaigns: Campaign[] = [
  { id: 1, title: 'Reddit Community Engagement Series', channel: 'Reddit', status: 'in_progress', assignee: 'Sarah M.', dueDate: '2024-12-15', leads: 24, conversionRate: 12.5 },
  { id: 2, title: 'LinkedIn Thought Leadership Posts', channel: 'LinkedIn', status: 'in_progress', assignee: 'John D.', dueDate: '2024-12-12', leads: 18, conversionRate: 15.2 },
  { id: 3, title: 'Twitter Product Launch Thread', channel: 'Twitter', status: 'planned', assignee: 'Emma K.', dueDate: '2024-12-20', leads: 0, conversionRate: 0 },
  { id: 4, title: 'Slack Community Building', channel: 'Slack', status: 'in_progress', assignee: 'Mike R.', dueDate: '2024-12-18', leads: 12, conversionRate: 8.3 },
  { id: 5, title: 'Product Hunt Launch Prep', channel: 'Product Hunt', status: 'planned', assignee: 'Sarah M.', dueDate: '2024-12-25', leads: 0, conversionRate: 0 },
  { id: 6, title: 'Q4 GTM Campaign Retrospective', channel: 'Multiple', status: 'completed', assignee: 'Team', dueDate: '2024-12-01', leads: 156, conversionRate: 18.9 },
  { id: 7, title: 'Competitor Response Posts', channel: 'Reddit', status: 'completed', assignee: 'John D.', dueDate: '2024-11-28', leads: 42, conversionRate: 14.3 },
  { id: 8, title: 'Email Newsletter Series', channel: 'Email', status: 'in_progress', assignee: 'Emma K.', dueDate: '2024-12-14', leads: 31, conversionRate: 11.8 },
];

export default function CampaignsPage() {
  const getCampaignsByStatus = (status: string) =>
    campaigns.filter(c => c.status === status);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-gray-100 text-gray-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex h-screen bg-surface-light">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto bg-surface-light p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Kanban size={28} weight="fill" className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">Campaigns Dashboard</h1>
            </div>
            <p className="text-sm text-neutral">8 active campaigns across 4 channels</p>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-3 gap-6">
            {/* Planned Column */}
            <div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Planned</h3>
                <p className="text-xs text-neutral">{getCampaignsByStatus('planned').length} campaigns</p>
              </div>

              <div className="space-y-3">
                {getCampaignsByStatus('planned').map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                  >
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{campaign.title}</h4>

                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${getStatusColor(campaign.status)}`}>
                        {campaign.channel}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-neutral">
                        <User size={14} weight="bold" />
                        <span>{campaign.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral">
                        <Calendar size={14} weight="bold" />
                        <span>Due: {new Date(campaign.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In Progress Column */}
            <div>
              <div className="bg-white border border-blue-200 rounded-lg p-4 mb-3">
                <h3 className="text-sm font-bold text-blue-700 mb-1">In Progress</h3>
                <p className="text-xs text-neutral">{getCampaignsByStatus('in_progress').length} campaigns</p>
              </div>

              <div className="space-y-3">
                {getCampaignsByStatus('in_progress').map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-white border border-blue-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer"
                  >
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{campaign.title}</h4>

                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-700`}>
                        {campaign.channel}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-neutral">
                        <User size={14} weight="bold" />
                        <span>{campaign.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral">
                        <Calendar size={14} weight="bold" />
                        <span>Due: {new Date(campaign.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral">Leads:</span>
                        <span className="font-bold text-gray-900">{campaign.leads}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-neutral">Conv. Rate:</span>
                        <span className="font-bold text-success">{campaign.conversionRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Column */}
            <div>
              <div className="bg-white border border-green-200 rounded-lg p-4 mb-3">
                <h3 className="text-sm font-bold text-green-700 mb-1">Completed</h3>
                <p className="text-xs text-neutral">{getCampaignsByStatus('completed').length} campaigns</p>
              </div>

              <div className="space-y-3">
                {getCampaignsByStatus('completed').map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-white border border-green-200 rounded-lg p-4 hover:border-green-400 transition-colors cursor-pointer"
                  >
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{campaign.title}</h4>

                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700`}>
                        {campaign.channel}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-neutral">
                        <User size={14} weight="bold" />
                        <span>{campaign.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral">
                        <Calendar size={14} weight="bold" />
                        <span>Completed: {new Date(campaign.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-1 text-xs mb-1">
                        <TrendUp size={14} weight="bold" className="text-success" />
                        <span className="font-bold text-gray-900">{campaign.leads} leads generated</span>
                      </div>
                      <div className="text-xs text-neutral">
                        {campaign.conversionRate}% conversion rate
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
