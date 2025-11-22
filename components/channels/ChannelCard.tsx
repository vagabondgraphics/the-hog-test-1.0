'use client';

import { Channel } from '@/types/channel';
import { channelLogoSrc } from '@/lib/logo';
import { FallbackLogo } from './FallbackLogo';
import { ArrowRight } from '@phosphor-icons/react';
import { useState } from 'react';

interface ChannelCardProps {
  channel: Channel;
  onClick: (channel: Channel) => void;
}

export default function ChannelCard({ channel, onClick }: ChannelCardProps) {
  const logoSrc = channelLogoSrc(channel.name, channel.category);
  const [imageError, setImageError] = useState(false);

  const renderLogo = () => {
    if (!logoSrc || imageError) {
      return (
        <div
          className="w-10 h-10 rounded-[8px] flex items-center justify-center text-white font-bold text-sm"
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
        className="w-10 h-10 rounded-[8px] object-contain bg-white flex-shrink-0"
        onError={() => setImageError(true)}
      />
    );
  };

  return (
    <div
      className="bg-white p-5 hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
      onClick={() => onClick(channel)}
    >
      {/* Header: Logo + Name + Status */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {/* Logo 40px */}
          {renderLogo()}
          <div>
            <h3 className="text-[14px] font-bold text-[#0F172A] leading-tight mb-0.5">
              {channel.name}
            </h3>
            <p className="text-[11px] text-[#6B7280] uppercase tracking-wide">
              {channel.category}
            </p>
          </div>
        </div>
        {/* Monotone grey status tag */}
        <span className="px-2 py-1 rounded-[8px] text-[10px] font-bold uppercase bg-[#F3F4F6] text-[#374151]">
          {channel.status}
        </span>
      </div>

      {/* Score - Hero with progress bar */}
      <div className="mb-3">
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-[28px] font-bold text-primary leading-none">
            {channel.opportunityScore}
          </span>
          <span className="text-[12px] text-neutral font-normal">/100</span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
          <div
            className="h-1.5 bg-primary"
            style={{ width: `${channel.opportunityScore}%` }}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-[12px] text-[#6B7280] mb-3 line-clamp-2 leading-relaxed">
        {channel.description}
      </p>

      {/* Impact row with light-grey chip background */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-[6px] bg-[#F8FAFC] text-[11px] text-[#374151]">
          <span className="font-medium">{channel.activeOpportunities}</span>
          <span className="text-[#9CA3AF]">Active</span>
          <span className="text-[#9CA3AF]">·</span>
          <span className="font-medium">{channel.estimatedValue}</span>
          <span className="text-[#9CA3AF]">Value</span>
          <span className="text-[#9CA3AF]">·</span>
          <span className="text-[#6B7280]">{channel.lastActivity}</span>
        </div>
      </div>

      {/* CTA - ALWAYS secondary white with arrow nudge */}
      <button className="w-full px-4 py-2.5 border border-[#E5E7EB] bg-white text-text-primary text-[13px] font-bold rounded-[6px] hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-center gap-2 group/btn">
        <span>Explore Channel</span>
        <ArrowRight
          size={16}
          className="translate-x-0 opacity-0 transition-all duration-200 ease-out group-hover/btn:translate-x-1.5 group-hover/btn:opacity-100"
        />
      </button>
    </div>
  );
}
