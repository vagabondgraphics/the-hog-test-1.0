import React from 'react';
import Button from './Button';

interface Activity {
  id: number;
  avatar: string;
  title: string;
  description: string;
  timestamp: string;
  action?: {
    label: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
  };
}

const activities: Activity[] = [
  {
    id: 1,
    avatar: '👤',
    title: 'John shared a new feature update in r/ProductManagement',
    description: '',
    timestamp: '1 hour ago',
    action: { label: 'Review Feedback', variant: 'secondary' }
  },
  {
    id: 2,
    avatar: '🔵',
    title: 'The Hog detected new competitor move: Clay launched pricing page',
    description: '',
    timestamp: '15 minutes ago',
    action: { label: 'Vote Now', variant: 'secondary' }
  },
  {
    id: 3,
    avatar: '⚙️',
    title: 'AI Agent generated 3 content variants for LinkedIn post',
    description: '',
    timestamp: '30 minutes ago',
    action: { label: 'View Drafts', variant: 'secondary' }
  },
  {
    id: 4,
    avatar: '🔵',
    title: 'Marketing team reviewed the new campaign strategies',
    description: '',
    timestamp: '1 hour ago',
    action: { label: 'View Details', variant: 'secondary' }
  },
  {
    id: 5,
    avatar: '⚙️',
    title: 'User feedback collected for the latest app update',
    description: '',
    timestamp: '2 hours ago',
  },
];

export default function ActivityFeed() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Activity Feed (7)</h2>
        <span className="text-xs text-neutral">Last 24 hours</span>
      </div>

      {/* Activities list */}
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex gap-3">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-base flex-shrink-0">
                {activity.avatar}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 mb-1 leading-snug">{activity.title}</p>
                {activity.description && (
                  <p className="text-sm text-neutral mb-2">{activity.description}</p>
                )}
                <p className="text-xs text-neutral">{activity.timestamp}</p>

                {/* Action button */}
                {activity.action && (
                  <div className="mt-2">
                    <Button variant={activity.action.variant || 'secondary'} size="sm">
                      {activity.action.label}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
