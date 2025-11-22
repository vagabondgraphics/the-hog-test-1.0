'use client';

import { useState, useMemo, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNavigationHistory } from '@/contexts/NavigationHistoryContext';
import Sidebar from '@/components/Sidebar';
import NavigationArrows from '@/components/NavigationArrows';
import ChannelCard from '@/components/channels/ChannelCard';
import ChannelListItem from '@/components/channels/ChannelListItem';
import { Channel } from '@/types/channel';
import channelsData from '@/data/channels.json';
import { SquaresFour, ListBullets, SortAscending, Bell } from '@phosphor-icons/react';

type ViewMode = 'grid' | 'list';
type SortOption = 'score' | 'name' | 'activity';

export default function ChannelsPage() {
  const pathname = usePathname();
  const { pushHistory } = useNavigationHistory();

  const [channels] = useState<Channel[]>(channelsData as Channel[]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('score');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Track page visits for navigation history
  useEffect(() => {
    pushHistory(pathname);
  }, [pathname, pushHistory]);

  // Sort channels
  const sortedChannels = useMemo(() => {
    const sorted = [...channels];
    switch (sortBy) {
      case 'score':
        return sorted.sort((a, b) => b.opportunityScore - a.opportunityScore);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'activity':
        return sorted.sort((a, b) => a.lastActivity.localeCompare(b.lastActivity));
      default:
        return sorted;
    }
  }, [channels, sortBy]);

  const handleChannelClick = (channel: Channel) => {
    setToastMessage(`Exploring ${channel.name}...`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const totalOpportunities = channels.reduce((sum, ch) => sum + ch.activeOpportunities, 0);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header - Doesn't scroll */}
        <div className="flex-shrink-0">
          {/* Compact Combined Header */}
          <div className="bg-white border-b border-[#F2F2F2] px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Left: Logo + Nav Arrows + Title + Summary Badge */}
              <div className="flex items-center gap-3">
                <h1 className="text-base font-bold text-[#0F172A]">THE HOG</h1>
                <span className="text-[#6B7280]">•</span>

                {/* Navigation Arrows (Back/Forward) */}
                <NavigationArrows />

                <h2 className="text-base font-bold text-[#0F172A]">Channels</h2>

                <span className="px-2 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-full">
                  {totalOpportunities} opportunities across {channels.length} channels
                </span>
              </div>

              {/* Right: Bell Icon */}
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                  <Bell size={20} weight="regular" />
                </button>
              </div>
            </div>
          </div>

          {/* Controls Bar - Grid/List Toggle + Sort */}
          <div className="flex items-center justify-between px-6 py-[10px] border-b border-[#EEEFF1]">
            {/* Left: View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center px-3 h-7 gap-2 rounded transition-all ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-[#E3E5E8] text-neutral hover:border-primary'
                }`}
              >
                <SquaresFour size={16} weight="bold" />
                <span className="text-xs font-bold">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center px-3 h-7 gap-2 rounded transition-all ${
                  viewMode === 'list'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-[#E3E5E8] text-neutral hover:border-primary'
                }`}
              >
                <ListBullets size={16} weight="bold" />
                <span className="text-xs font-bold">List</span>
              </button>
            </div>

            {/* Right: Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#6B7280]">Sort by</span>
              <div className="relative">
                <button className="flex items-center px-3 h-7 gap-2 bg-white border border-[#E3E5E8] rounded hover:border-primary cursor-pointer">
                  <SortAscending size={16} weight="bold" className="text-neutral" />
                  <span className="text-xs font-bold text-[#0F172A]">
                    {sortBy === 'score' && 'Opportunity Score'}
                    {sortBy === 'name' && 'Name'}
                    {sortBy === 'activity' && 'Last Activity'}
                  </span>
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                >
                  <option value="score">Opportunity Score</option>
                  <option value="name">Name</option>
                  <option value="activity">Last Activity</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto bg-white">
          {/* Grid View - Edge-to-edge, 4 columns wide, tight separators */}
          {viewMode === 'grid' && (
            <div className="px-0">
              {/* Full width grid with 1px separators */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#E5E7EB]">
                {sortedChannels.map((channel) => (
                  <ChannelCard key={channel.id} channel={channel} onClick={handleChannelClick} />
                ))}
              </div>
            </div>
          )}

          {/* List View - Flush top, no rounded corners */}
          {viewMode === 'list' && (
            <div className="px-0">
              <div className="bg-white border-t border-[#E5E7EB]">
                {sortedChannels.map((channel, index) => (
                  <ChannelListItem
                    key={channel.id}
                    channel={channel}
                    onClick={handleChannelClick}
                    isFirst={index === 0}
                    isLast={index === sortedChannels.length - 1}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-gray-800 bg-opacity-95 text-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-4">
            <span className="text-sm">{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="text-neutral hover:text-white text-lg leading-none ml-2"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
