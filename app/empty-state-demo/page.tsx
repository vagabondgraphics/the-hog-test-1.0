'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import EmptyStateCompetitors from '@/components/empty-states/EmptyStateCompetitors';

export default function EmptyStateDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCompetitor = () => {
    setIsModalOpen(true);
    // In a real implementation, this would open a modal
    console.log('Add Competitor clicked');
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto bg-white">
          <EmptyStateCompetitors onAddCompetitor={handleAddCompetitor} />
        </main>
      </div>
    </div>
  );
}
