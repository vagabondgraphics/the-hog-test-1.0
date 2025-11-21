import React from 'react';
import Button from './Button';
import Badge from './Badge';

export default function OpportunityCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-5">
      {/* Header with badges */}
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="danger">Hot</Badge>
        <Badge variant="success">87% ICP Fit</Badge>
        <Badge variant="warning">6 hours left</Badge>
        <button className="ml-auto w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-lg">
          🔔
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-3">
        r/SaaS: High-Intent Discussion About [User&apos;s Product Category]
      </h3>

      {/* Score */}
      <div className="mb-3">
        <div className="text-3xl font-bold text-gray-900 leading-none">9.2/10</div>
        <div className="text-xs text-neutral mt-1">Opportunity Score</div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: '87%' }}></div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-2 leading-relaxed">
        32 founders discussing [specific pain point]. 87% match your ICP. Thread momentum peaked 2 hours ago.
      </p>

      <p className="text-sm text-gray-700 mb-5 leading-relaxed">
        Why this matters: High purchase intent + low competitor presence. Suggested action: Post value-add comment with case study link.
      </p>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button variant="primary" size="sm">Generate Reply</Button>
        <Button variant="secondary" size="sm">View Thread</Button>
        <Button variant="tertiary" size="sm">Dismiss</Button>
      </div>
    </div>
  );
}
