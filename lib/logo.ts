export function channelLogoSrc(name: string, category?: string): string {
  const n = (name || '').toLowerCase();
  const c = (category || '').toLowerCase();

  // Primary explicit mappings by name
  if (n.includes('linkedin')) return 'https://cdn.simpleicons.org/linkedin/0A66C2';
  if (n.includes('product hunt') || n.includes('producthunt')) return 'https://cdn.simpleicons.org/producthunt/DA552F';
  if (n.includes('twitter') || n === 'x' || n.includes('twitter/x')) return 'https://cdn.simpleicons.org/x/000000';
  if (n.includes('reddit') || n.startsWith('r/')) return 'https://cdn.simpleicons.org/reddit/FF4500';
  if (n.includes('youtube')) return 'https://cdn.simpleicons.org/youtube/FF0000';
  if (n.includes('email') || n.includes('newsletter')) return 'https://cdn.simpleicons.org/maildotru/005FF9';
  if (n.includes('seo') && n.includes('blog')) return 'https://cdn.simpleicons.org/googlesearchconsole/4285F4';
  if (n.includes('google ads') || n.includes('paid search')) return 'https://cdn.simpleicons.org/googleads/4285F4';
  if (n.includes('webinar')) return 'https://cdn.simpleicons.org/zoom/2D8CFF';
  if (n.includes('case studies')) return 'https://cdn.simpleicons.org/notion/000000';
  if (n.includes('partner') || n.includes('referral')) return 'https://cdn.simpleicons.org/handshake/1B5066';
  if (n.includes('hacker news')) return 'https://cdn.simpleicons.org/ycombinator/FF6600';
  if (n.includes('stack overflow')) return 'https://cdn.simpleicons.org/stackoverflow/F48024';
  if (n.includes('medium')) return 'https://cdn.simpleicons.org/medium/000000';
  if (n.includes('dribbble')) return 'https://cdn.simpleicons.org/dribbble/EA4C89';

  // Fallback by category keyword
  if (c.includes('social media')) {
    if (n.includes('linkedin')) return 'https://cdn.simpleicons.org/linkedin/0A66C2';
    if (n.includes('twitter') || n.includes('x')) return 'https://cdn.simpleicons.org/x/000000';
    return 'https://cdn.simpleicons.org/sharealt/6B7280';
  }
  if (c.includes('content')) return 'https://cdn.simpleicons.org/notion/000000';
  if (c.includes('email')) return 'https://cdn.simpleicons.org/maildotru/005FF9';
  if (c.includes('video')) return 'https://cdn.simpleicons.org/youtube/FF0000';
  if (c.includes('community')) return 'https://cdn.simpleicons.org/slack/4A154B';
  if (c.includes('events')) return 'https://cdn.simpleicons.org/zoom/2D8CFF';
  if (c.includes('partnerships')) return 'https://cdn.simpleicons.org/handshake/1B5066';
  if (c.includes('paid search')) return 'https://cdn.simpleicons.org/googleads/4285F4';

  // No known brand: return empty to trigger generated avatar
  return '';
}
