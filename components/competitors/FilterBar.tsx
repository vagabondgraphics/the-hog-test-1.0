import { Gear } from '@phosphor-icons/react';
import { Competitor } from '@/types/competitor';

interface FilterBarProps {
  competitors: Competitor[];
  selectedCompetitor: string;
  selectedActivity: string;
  selectedTimeframe: string;
  onCompetitorChange: (value: string) => void;
  onActivityChange: (value: string) => void;
  onTimeframeChange: (value: string) => void;
}

export default function FilterBar({
  competitors,
  selectedCompetitor,
  selectedActivity,
  selectedTimeframe,
  onCompetitorChange,
  onActivityChange,
  onTimeframeChange
}: FilterBarProps) {
  const activityTypes = [
    'All Activities',
    'Blog Post',
    'Product Launch',
    'Video Tutorial',
    'Webinar',
    'E-book',
    'Case Study',
    'Infographic'
  ];

  const timeframes = [
    { label: 'Last 24 hours', value: '24hours' },
    { label: 'Last 7 Days', value: '7days' },
    { label: 'Last 30 Days', value: '30days' }
  ];

  return (
    <div className="flex items-center justify-between mb-24">
      <div className="flex items-center gap-12">
        <span className="text-[14px] text-[#6B7280]">Filters</span>

        {/* Competitor Filter */}
        <select
          value={selectedCompetitor}
          onChange={(e) => onCompetitorChange(e.target.value)}
          className="px-12 py-8 border border-[#F2F2F2] text-[14px] text-[#0F172A] bg-white focus:outline-none focus:border-[#1B5066]"
        >
          <option value="all">All Competitors</option>
          {competitors.map((competitor) => (
            <option key={competitor.id} value={competitor.id}>
              {competitor.name}
            </option>
          ))}
        </select>

        {/* Activity Type Filter */}
        <select
          value={selectedActivity}
          onChange={(e) => onActivityChange(e.target.value)}
          className="px-12 py-8 border border-[#F2F2F2] text-[14px] text-[#0F172A] bg-white focus:outline-none focus:border-[#1B5066]"
        >
          {activityTypes.map((type) => (
            <option key={type} value={type === 'All Activities' ? 'all' : type}>
              {type}
            </option>
          ))}
        </select>

        {/* Timeframe Filter */}
        <select
          value={selectedTimeframe}
          onChange={(e) => onTimeframeChange(e.target.value)}
          className="px-12 py-8 border border-[#F2F2F2] text-[14px] text-[#0F172A] bg-white focus:outline-none focus:border-[#1B5066]"
        >
          {timeframes.map((timeframe) => (
            <option key={timeframe.value} value={timeframe.value}>
              {timeframe.label}
            </option>
          ))}
        </select>
      </div>

      {/* View Settings Button */}
      <button className="flex items-center gap-8 text-[14px] text-[#6B7280] hover:text-[#0F172A] transition-colors">
        <Gear size={16} weight="regular" />
        View settings
      </button>
    </div>
  );
}
