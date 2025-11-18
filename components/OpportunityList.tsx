import React from 'react';
import Button from './Button';

interface Opportunity {
  id: number;
  title: string;
  subreddit: string;
}

const opportunities: Opportunity[] = [
  { id: 1, title: 'Insights on Clay', subreddit: 'r/SaaS' },
  { id: 2, title: 'Strategies for AI-Driven Marketing Automation', subreddit: 'r/GrowthHacking' },
  { id: 3, title: 'Leveraging AI for Personalized Customer Journeys', subreddit: 'r/Marketing' },
];

export default function OpportunityList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900">Top Opportunities Found:</h2>
        <span className="text-xs text-neutral">Last 24 hours</span>
      </div>

      <div className="space-y-3">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
          >
            <div className="text-sm text-gray-700">
              {opp.subreddit}: {opp.title}
            </div>
            <Button variant="tertiary" size="sm">
              See More
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
