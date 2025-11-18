'use client';

import React from 'react';
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
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: ChartLineUp, active: true },
  { label: 'Competitors', icon: Crosshair, active: false },
  { label: 'Channels', icon: Broadcast, active: false },
  { label: 'Content', icon: Article, active: false },
  { label: 'Agents', icon: Robot, active: false },
  { label: 'Team', icon: Users, active: false },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-surface-light border-r border-gray-200 h-screen p-3 flex flex-col">
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
          return (
            <button
              key={item.label}
              className={`
                w-full text-left px-3 py-2 text-sm rounded-md mb-0.5 transition-colors
                ${
                  item.active
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={18} weight={item.active ? 'fill' : 'regular'} />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="mt-auto pt-3 border-t border-gray-200">
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
