'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import EmptyState from '@/components/competitors/EmptyState';
import AddCompetitorModal from '@/components/competitors/AddCompetitorModal';
import ActivityCard from '@/components/competitors/ActivityCard';
import FilterBar from '@/components/competitors/FilterBar';
import { Competitor, Activity } from '@/types/competitor';
import competitorsData from '@/data/competitors.json';
import { Bell } from '@phosphor-icons/react';

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>(competitorsData as Competitor[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7days');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Check if empty state should be shown (initially or when all competitors removed)
  const isEmpty = competitors.length === 0;

  // Flatten all activities from all competitors
  const allActivities = useMemo(() => {
    return competitors.flatMap(competitor =>
      competitor.activities.map(activity => ({
        ...activity,
        competitorId: competitor.id,
        competitorName: competitor.name,
        competitorLogo: competitor.logo
      }))
    );
  }, [competitors]);

  // Filter activities based on selected filters
  const filteredActivities = useMemo(() => {
    return allActivities.filter(activity => {
      if (selectedCompetitor !== 'all' && activity.competitorId !== selectedCompetitor) {
        return false;
      }
      if (selectedActivity !== 'all' && activity.type !== selectedActivity) {
        return false;
      }
      // TODO: Add timeframe filtering logic based on timestamp
      return true;
    });
  }, [allActivities, selectedCompetitor, selectedActivity, selectedTimeframe]);

  const handleAddCompetitor = (data: { name: string; website: string; keywords: string[] }) => {
    const newCompetitor: Competitor = {
      id: `comp-${Date.now()}`,
      name: data.name,
      logo: '🆕',
      website: data.website,
      keywords: data.keywords,
      activities: []
    };

    setCompetitors([...competitors, newCompetitor]);
    setIsModalOpen(false);

    // Show success toast
    setToastMessage(`${data.name} added! Tracking started.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleViewDetails = (activity: Activity) => {
    window.open(activity.url, '_blank');
  };

  const handleAddToReport = (activity: Activity) => {
    setToastMessage(`"${activity.title}" added to report!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDismiss = (activity: Activity) => {
    // Remove activity from the competitor's activities
    setCompetitors(competitors.map(competitor => {
      if (competitor.activities.some(a => a.id === activity.id)) {
        return {
          ...competitor,
          activities: competitor.activities.filter(a => a.id !== activity.id)
        };
      }
      return competitor;
    }));

    setToastMessage(`Activity dismissed.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Show empty state if no competitors
  if (isEmpty) {
    return (
      <div className="flex h-screen bg-surface-light">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <EmptyState onAddCompetitor={() => setIsModalOpen(true)} />
          </main>
        </div>
        <AddCompetitorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddCompetitor}
        />
      </div>
    );
  }

  // Show populated feed
  return (
    <div className="flex h-screen bg-surface-light">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto bg-white">
          {/* Merged Competitors Section - Full width, no gaps */}
          <div className="border-b border-gray-100">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">Competitors</h2>
                <span className="text-xs text-neutral">Last 24 hours</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="font-bold rounded-lg transition-opacity hover:opacity-90 bg-primary text-white h-10 px-6 text-sm"
                >
                  Add Competitor
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                  <Bell size={20} weight="regular" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                  <span className="text-lg">⋮</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="px-6 py-3 border-b border-gray-100">
              <FilterBar
                competitors={competitors}
                selectedCompetitor={selectedCompetitor}
                selectedActivity={selectedActivity}
                selectedTimeframe={selectedTimeframe}
                onCompetitorChange={setSelectedCompetitor}
                onActivityChange={setSelectedActivity}
                onTimeframeChange={setSelectedTimeframe}
              />
            </div>

            {/* Activities Feed - No gaps, border dividers */}
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12 px-6">
                <p className="text-sm text-neutral">No activities found matching your filters.</p>
              </div>
            ) : (
              filteredActivities.map((activity, index) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  competitorName={activity.competitorName}
                  competitorLogo={activity.competitorLogo}
                  onViewDetails={handleViewDetails}
                  onAddToReport={handleAddToReport}
                  onDismiss={handleDismiss}
                  isLast={index === filteredActivities.length - 1}
                />
              ))
            )}
          </div>
        </main>
      </div>

      {/* Add Competitor Modal */}
      <AddCompetitorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCompetitor}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-gray-800 bg-opacity-95 text-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-4">
            <span className="text-sm">{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="text-neutral hover:text-white text-lg leading-none ml-2"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
