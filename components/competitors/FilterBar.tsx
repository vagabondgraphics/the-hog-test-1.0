import { Competitor } from '@/types/competitor';

interface FilterBarProps {
  competitors: Competitor[];
  selectedCompetitor: string;
  selectedActivity: string;
  selectedTimeframe: string;
  onCompetitorChange: (value: string) => void;
  onActivityChange: (value: string) => void;
  onTimeframeChange: (value: string) => void;
  onClearFilters?: () => void;
}

export default function FilterBar({
  competitors,
  selectedCompetitor,
  selectedActivity,
  selectedTimeframe,
  onCompetitorChange,
  onActivityChange,
  onTimeframeChange,
  onClearFilters
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
    <div className="flex items-center px-6 py-[10px] gap-4 border-b border-[#EEEFF1]">
      {/* Filters Label */}
      <span className="text-[12px] font-bold leading-4 text-[#6B7280]">
        Filters
      </span>

      {/* Filter Buttons Container */}
      <div className="flex items-center gap-[10px]">
        {/* All Competitors Dropdown */}
        <div className="relative">
          <button className="flex items-center px-[5px] h-7 gap-[5px] bg-white border border-[#E3E5E8] rounded hover:border-[#1B5066] cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <path d="M2.67 2.67h4v4h-4v-4zm0 6.66h4v4h-4v-4zm6.66-6.66h4v4h-4v-4zm0 6.66h4v4h-4v-4z" stroke="#6B7280" strokeWidth="1"/>
            </svg>
            <span className="text-[12px] font-bold leading-4 text-[#1E293B]">
              {selectedCompetitor === 'all' ? 'All Competitors' : competitors.find(c => c.id === selectedCompetitor)?.name}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <path d="M4 6l4 4 4-4" stroke="#6B7280" strokeWidth="2"/>
            </svg>
          </button>
          <select
            value={selectedCompetitor}
            onChange={(e) => onCompetitorChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            <option value="all">All Competitors</option>
            {competitors.map((competitor) => (
              <option key={competitor.id} value={competitor.id}>
                {competitor.name}
              </option>
            ))}
          </select>
        </div>

        {/* All Activities Dropdown */}
        <div className="relative">
          <button className="flex items-center px-[5px] h-7 gap-[5px] bg-white border border-[#E3E5E8] rounded hover:border-[#1B5066] cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <path d="M2.67 2.67h4v4h-4v-4zm0 6.66h4v4h-4v-4zm6.66-6.66h4v4h-4v-4zm0 6.66h4v4h-4v-4z" stroke="#6B7280" strokeWidth="1"/>
            </svg>
            <span className="text-[12px] font-bold leading-4 text-[#1E293B]">
              {selectedActivity === 'all' ? 'All Activities' : selectedActivity}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <path d="M4 6l4 4 4-4" stroke="#6B7280" strokeWidth="2"/>
            </svg>
          </button>
          <select
            value={selectedActivity}
            onChange={(e) => onActivityChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            {activityTypes.map((type) => (
              <option key={type} value={type === 'All Activities' ? 'all' : type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Last 7 Days Dropdown */}
        <div className="relative">
          <button className="flex items-center px-[5px] h-7 gap-[5px] bg-white border border-[#E3E5E8] rounded hover:border-[#1B5066] cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <path d="M2.67 2.67h4v4h-4v-4zm0 6.66h4v4h-4v-4zm6.66-6.66h4v4h-4v-4zm0 6.66h4v4h-4v-4z" stroke="#6B7280" strokeWidth="1"/>
            </svg>
            <span className="text-[12px] font-bold leading-4 text-[#1E293B]">
              {timeframes.find(t => t.value === selectedTimeframe)?.label || 'Last 7 Days'}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <path d="M4 6l4 4 4-4" stroke="#6B7280" strokeWidth="2"/>
            </svg>
          </button>
          <select
            value={selectedTimeframe}
            onChange={(e) => onTimeframeChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            {timeframes.map((timeframe) => (
              <option key={timeframe.value} value={timeframe.value}>
                {timeframe.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="text-[12px] font-bold text-[#6B7280] hover:text-[#1B5066] transition-colors ml-2"
          >
            Clear filters
          </button>
        )}
      </div>

    </div>
  );
}
