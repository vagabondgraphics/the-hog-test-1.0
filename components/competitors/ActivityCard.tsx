import { Activity } from '@/types/competitor';

interface ActivityCardProps {
  activity: Activity;
  competitorName: string;
  competitorLogo: string;
  onViewDetails: (activity: Activity) => void;
  onAddToReport: (activity: Activity) => void;
  onDismiss: (activity: Activity) => void;
  isLast?: boolean;
}

export default function ActivityCard({
  activity,
  competitorName,
  competitorLogo,
  onViewDetails,
  onAddToReport,
  onDismiss,
  isLast = false
}: ActivityCardProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${!isLast ? 'border-b border-gray-200' : ''}`}>
      {/* Header Row: Logo + Name + Metadata (left) | Impact Badge (right) */}
      <div className="flex items-start justify-between mb-2">
        {/* Left: Logo + Name + Metadata */}
        <div className="flex items-start gap-3">
          {/* Logo */}
          <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
            {competitorLogo}
          </div>

          {/* Name + Metadata */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              {competitorName}
            </h3>

            {/* Metadata row: Type • Time • Tags */}
            <div className="flex items-center gap-2 text-xs text-neutral">
              <span className="inline-flex items-center px-2 py-1 text-xs font-bold bg-gray-100 text-gray-700 rounded">
                {activity.type}
              </span>
              <span>•</span>
              <span>{activity.timestamp}</span>
              {activity.tags.length > 0 && (
                <>
                  <span>•</span>
                  <span>{activity.tags[0]}</span>
                  {activity.tags[1] && <span>{activity.tags[1]}</span>}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Impact Badge */}
        <span className={`inline-flex items-center px-2 py-1 text-xs font-bold flex-shrink-0 rounded ${getImpactColor(activity.impact)}`}>
          {activity.impact} Impact
        </span>
      </div>

      {/* Title */}
      <h4 className="text-base text-gray-900 leading-tight truncate">
        {activity.title}
      </h4>
    </div>
  );
}
