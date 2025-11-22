import { RedditLogo, LinkedinLogo, TwitterLogo, SlackLogo, DiscordLogo } from '@phosphor-icons/react';

export const CHANNEL_ICONS = {
  'Reddit': RedditLogo,
  'LinkedIn': LinkedinLogo,
  'Twitter': TwitterLogo,
  'Slack': SlackLogo,
  'Discord': DiscordLogo,
} as const;

export const CHANNEL_COLORS = {
  'Reddit': '#FF4500',
  'LinkedIn': '#0A66C2',
  'Twitter': '#1DA1F2',
  'Slack': '#4A154B',
  'Discord': '#5865F2',
} as const;

export type ChannelName = keyof typeof CHANNEL_ICONS;
