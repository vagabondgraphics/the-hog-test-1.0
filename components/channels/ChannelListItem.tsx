'use client';

import { Channel } from '@/types/channel';
import { channelLogoSrc } from '@/lib/logo';
import { FallbackLogo } from './FallbackLogo';
import { useState } from 'react';

interface ChannelListItemProps {
  channel: Channel;
  onClick: (channel: Channel) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function ChannelListItem({ channel, onClick, isFirst, isLast }: ChannelListItemProps) {
  const logoSrc = channelLogoSrc(channel.name, channel.category);
  const [imageError, setImageError] = useState(false);

  const renderLogo = () => {
    if (!logoSrc || imageError) {
      return (
        <div
          className="w-10 h-10 rounded-[6px] flex items-center justify-center text-white font-bold text-sm"
          style={{ background: `hsl(${((channel.name.charAt(0).charCodeAt(0) * 17) % 360)} 60% 45%)` }}
          aria-hidden="true"
        >
          {channel.name.charAt(0).toUpperCase()}
        </div>
      );
    }

    return (
      <img
        src={logoSrc}
        alt={`${channel.name} logo`}
        className="w-10 h-10 rounded-[6px] object-contain bg-white flex-shrink-0"
        onError={() => setImageError(true)}
      />
    );
  };

  return (
    <div
      className="bg-white border-b border-[#E5E7EB] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
      onClick={() => onClick(channel)}
    >
      <div className="px-6 py-3 flex items-center gap-4">
        {/* Score with progress bar */}
        <div className="w-24 flex-shrink-0">
          <div className="flex items-baseline gap-1 mb-1.5">
            <span className="text-[16px] font-bold text-primary">{channel.opportunityScore}</span>
            <span className="text-[10px] text-neutral">/100</span>
          </div>
          <div className="h-1 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
            <div
              className="h-1 bg-primary"
              style={{ width: `${channel.opportunityScore}%` }}
            />
          </div>
        </div>

        {/* Logo + Channel Info - Flex-1 */}
        <div className="flex-1 min-w-0 flex items-center gap-2.5">
          {/* Logo with error handling */}
          {renderLogo()}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-[13px] font-bold text-[#0F172A]">
                {channel.name}
              </h3>
              {/* Monotone grey status tag */}
              <span className="px-2 py-0.5 rounded-[8px] text-[10px] font-bold uppercase bg-[#F3F4F6] text-[#374151]">
                {channel.status}
              </span>
              <span className="text-[10px] text-[#6B7280] uppercase tracking-wide">
                {channel.category}
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] truncate">{channel.description}</p>
          </div>
        </div>

        {/* Metrics - Aligned columns */}
        <div className="flex items-center gap-6">
          <div className="text-center w-14">
            <div className="text-[12px] font-bold text-[#0F172A]">{channel.activeOpportunities}</div>
            <div className="text-[10px] text-[#6B7280]">Active</div>
          </div>
          <div className="text-center w-14">
            <div className="text-[12px] font-bold text-[#0F172A]">{channel.estimatedValue}</div>
            <div className="text-[10px] text-[#6B7280]">Value</div>
          </div>
          <div className="text-right w-20">
            <div className="text-[10px] text-[#6B7280]">{channel.lastActivity}</div>
          </div>
        </div>

        {/* CTA button */}
        <button
          className="px-3 py-1.5 border border-[#E5E7EB] bg-white text-[12px] font-bold rounded-[6px] hover:border-primary hover:text-primary transition-colors flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onClick(channel);
          }}
        >
          Explore
        </button>
      </div>
    </div>
  );
}
