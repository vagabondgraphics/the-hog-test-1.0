'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold">THE HOG</h1>
        <span className="text-sm text-neutral">Dashboard</span>
        <button className="ml-1 w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-neutral text-xs hover:bg-gray-100">
          ⓘ
        </button>
      </div>

      {/* Right side - Search, Notifications, Menu */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-neutral hover:bg-gray-100 rounded-md transition-colors">
          <span>🔍</span>
          <span>/</span>
        </button>

        {/* Notifications */}
        <button className="relative w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors">
          <span className="text-base">🔔</span>
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full"></span>
        </button>

        {/* Menu */}
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors">
          <span className="text-base">⋮</span>
        </button>
      </div>
    </header>
  );
}
