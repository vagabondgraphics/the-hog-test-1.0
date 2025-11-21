import { Activity } from '@/types/competitor';

interface ActivityCardProps {
  activity: Activity;
  competitorName: string;
  competitorLogo: string;
  onViewDetails: (activity: Activity) => void;
  onAddToReport: (activity: Activity) => void;
  onDismiss: (activity: Activity) => void;
}

export default function ActivityCard({
  activity,
  competitorName,
  competitorLogo,
  onViewDetails,
  onAddToReport,
  onDismiss
}: ActivityCardProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-[#FEE2E2] text-[#7F1D1D]';
      case 'Medium':
        return 'bg-[#FEF3C7] text-[#92400E]';
      case 'Low':
        return 'bg-[#F3F4F6] text-[#6B7280]';
      default:
        return 'bg-[#F3F4F6] text-[#6B7280]';
    }
  };

  return (
    <div className="w-full border border-[#F2F2F2] bg-white p-20 mb-12 hover:border-[#1B5066] transition-colors cursor-pointer rounded-[0px]">
      {/* Header Row: Logo + Name + Metadata (left) | Impact Badge (right) */}
      <div className="flex items-start justify-between mb-12">
        {/* Left: Logo + Name + Metadata */}
        <div className="flex items-start gap-12">
          {/* Logo */}
          <div className="w-48 h-48 rounded-[8px] bg-[#F3F4F6] flex items-center justify-center text-[20px] flex-shrink-0">
            {competitorLogo}
          </div>

          {/* Name + Metadata */}
          <div>
            <h3 className="text-[16px] font-bold text-[#0F172A] mb-6">
              {competitorName}
            </h3>

            {/* Metadata row: Type • Time • Tags */}
            <div className="flex items-center gap-8 text-[12px] text-[#6B7280]">
              <span className="px-8 py-2 bg-[#F3F4F6] rounded-[4px] font-bold">
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
        <span className={`px-10 py-4 text-[12px] font-bold rounded-[4px] flex-shrink-0 ${getImpactColor(activity.impact)}`}>
          {activity.impact} Impact
        </span>
      </div>

      {/* Title */}
      <h4 className="text-[16px] font-bold text-[#0F172A] mb-8 leading-[24px] line-clamp-2">
        {activity.title}
      </h4>

      {/* Summary */}
      <p className="text-[14px] text-[#6B7280] mb-16 leading-[20px] line-clamp-2">
        {activity.summary}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-12">
        <button
          onClick={() => onViewDetails(activity)}
          className="px-16 py-8 bg-[#1B5066] text-white text-[14px] font-bold rounded-[6px] hover:opacity-90 transition-opacity"
        >
          View Details
        </button>

        <button
          onClick={() => onAddToReport(activity)}
          className="px-16 py-8 border border-[#1B5066] bg-white text-[#1B5066] text-[14px] font-bold rounded-[6px] hover:bg-[#F0F9FF] transition-colors"
        >
          Add to Report
        </button>

        <button
          onClick={() => onDismiss(activity)}
          className="text-[14px] font-bold text-[#6B7280] hover:text-[#EF4444] transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
