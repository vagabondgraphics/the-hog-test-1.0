'use client';

interface FallbackLogoProps {
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export function FallbackLogo({ label, size = 'md' }: FallbackLogoProps) {
  const letter = (label || '?').trim().charAt(0).toUpperCase();

  // Deterministic color by char code
  const hue = (letter.charCodeAt(0) * 17) % 360;
  const bg = `hsl(${hue} 60% 45%)`;

  // Size variants - sm is now 44px to match grid cards
  const sizeClasses = {
    sm: 'w-11 h-11 text-sm rounded-[8px]',  // 44px for grid cards
    md: 'w-12 h-12 text-base rounded-[8px]',
    lg: 'w-16 h-16 text-xl rounded-[10px]'
  };

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center text-white font-bold`}
      style={{ background: bg }}
      aria-hidden="true"
    >
      {letter}
    </div>
  );
}
