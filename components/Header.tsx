'use client';

import React from 'react';
import { Bell } from '@phosphor-icons/react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-page-title text-gray-900">Dashboard</h1>
      </div>

      {/* Right side - Search, Notifications, Menu */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-neutral hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Search (keyboard shortcut: /)"
        >
          <span>🔍</span>
          <span>/</span>
        </button>

        {/* Notifications */}
        <button
          className="relative w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} weight="regular" />
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full"></span>
        </button>

        {/* Menu */}
        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Menu options"
        >
          <span className="text-base">⋮</span>
        </button>
      </div>
    </header>
  );
}
