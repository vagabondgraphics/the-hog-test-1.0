'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartLineUp,
  Crosshair,
  Broadcast,
  Article,
  Robot,
  Users,
  Gear,
  MagnifyingGlass
} from '@phosphor-icons/react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: ChartLineUp, href: '/' },
  { label: 'Competitors', icon: Crosshair, href: '/competitors' },
  { label: 'Channels', icon: Broadcast, href: '/channels' },
  { label: 'Content', icon: Article, href: '/content' },
  { label: 'Agents', icon: Robot, href: '/agents' },
  { label: 'Team', icon: Users, href: '/team' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-surface-light border-r border-gray-100 h-screen p-3 flex flex-col">
      {/* Quick Actions */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-neutral font-bold">Quick actions</span>
          <span className="text-xs text-neutral">⌘K</span>
        </div>
        <button className="w-full flex items-center gap-2 px-2.5 py-1.5 text-sm text-neutral hover:bg-gray-100 rounded-md transition-colors">
          <MagnifyingGlass size={16} weight="regular" />
          <span>/</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                w-full text-left px-3 py-2 text-sm rounded-md mb-0.5 transition-colors flex
                ${
                  isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="mt-auto pt-3 border-t border-gray-100">
        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <div className="flex items-center gap-2.5">
            <Gear size={18} weight="regular" />
            <span>Settings</span>
          </div>
        </button>
      </div>
    </aside>
  );
}
