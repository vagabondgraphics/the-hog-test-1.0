import { CHANNEL_ICONS, CHANNEL_COLORS, ChannelName } from '@/utils/channelIcons';

interface ChannelBadgeProps {
  channel: ChannelName;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function ChannelBadge({
  channel,
  size = 'md',
  showLabel = true,
  className = ''
}: ChannelBadgeProps) {
  const Icon = CHANNEL_ICONS[channel];
  const color = CHANNEL_COLORS[channel];

  const sizeStyles = {
    sm: {
      container: 'h-5 px-1.5 gap-1',
      icon: 12,
      text: 'text-[10px]'
    },
    md: {
      container: 'h-6 px-2 gap-1.5',
      icon: 14,
      text: 'text-[12px]'
    },
    lg: {
      container: 'h-7 px-2.5 gap-2',
      icon: 16,
      text: 'text-[12px]'
    }
  };

  const styles = sizeStyles[size];

  return (
    <div
      className={`inline-flex items-center ${styles.container} bg-white border border-[#E5E7EB] rounded-md ${className}`}
    >
      <Icon size={styles.icon} weight="fill" style={{ color }} />
      {showLabel && (
        <span className={`${styles.text} font-bold text-text-primary`}>
          {channel}
        </span>
      )}
    </div>
  );
}
