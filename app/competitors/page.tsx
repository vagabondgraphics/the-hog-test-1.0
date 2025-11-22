'use client';

import { useState, useMemo, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNavigationHistory } from '@/contexts/NavigationHistoryContext';
import Sidebar from '@/components/Sidebar';
import EmptyStateCompetitors from '@/components/empty-states/EmptyStateCompetitors';
import AddCompetitorModal from '@/components/competitors/AddCompetitorModal';
import ActivityCard from '@/components/competitors/ActivityCard';
import FilterBar from '@/components/competitors/FilterBar';
import NavigationArrows from '@/components/NavigationArrows';
import { Competitor, Activity } from '@/types/competitor';
import competitorsData from '@/data/competitors.json';
import { Bell } from '@phosphor-icons/react';

export default function CompetitorsPage() {
  const pathname = usePathname();
  const { pushHistory } = useNavigationHistory();

  const [competitors, setCompetitors] = useState<Competitor[]>(competitorsData as Competitor[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7days');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Track page visits for navigation history
  useEffect(() => {
    pushHistory(pathname);
  }, [pathname, pushHistory]);

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
    // Create initial activity for the new competitor
    const initialActivity: Activity = {
      id: `activity-${Date.now()}`,
      type: 'New Competitor',
      title: `Started tracking ${data.name}`,
      summary: `Now monitoring ${data.name} for activity on: ${data.keywords.join(', ')}`,
      timestamp: 'Just now',
      impact: 'High',
      tags: data.keywords,
      url: data.website
    };

    const newCompetitor: Competitor = {
      id: `comp-${Date.now()}`,
      name: data.name,
      logo: data.name.charAt(0).toUpperCase(),
      website: data.website,
      keywords: data.keywords,
      activities: [initialActivity]
    };

    setCompetitors([newCompetitor, ...competitors]);
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

  const handleClearFilters = () => {
    setSelectedCompetitor('all');
    setSelectedActivity('all');
    setSelectedTimeframe('7days');
  };

  // Show empty state if no competitors
  if (isEmpty) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <EmptyStateCompetitors onAddCompetitor={() => setIsModalOpen(true)} />
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
    <div className="flex h-screen bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header - Doesn't scroll */}
        <div className="flex-shrink-0">
          {/* Compact Combined Header */}
          <div className="bg-white border-b border-[#F2F2F2] px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Left: Logo + Nav Arrows + Title + Time Badge */}
              <div className="flex items-center gap-3">
                <h1 className="text-base font-bold text-[#0F172A]">THE HOG</h1>
                <span className="text-[#6B7280]">•</span>

                {/* Navigation Arrows (Back/Forward) */}
                <NavigationArrows />

                <h2 className="text-base font-bold text-[#0F172A]">Competitors</h2>

                <span className="px-2 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-full">
                  Last 24 hours
                </span>
              </div>

              {/* Right: Add Competitor Button + Bell Icon */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-md hover:opacity-90"
                >
                  Add Competitor
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                  <Bell size={20} weight="regular" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar - Fixed, doesn't scroll */}
          <FilterBar
            competitors={competitors}
            selectedCompetitor={selectedCompetitor}
            selectedActivity={selectedActivity}
            selectedTimeframe={selectedTimeframe}
            onCompetitorChange={setSelectedCompetitor}
            onActivityChange={setSelectedActivity}
            onTimeframeChange={setSelectedTimeframe}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto bg-white">
          {/* Activities Feed - No gap, no outer border */}
          <div className="bg-white">
            <div className="max-w-[1000px] mx-auto">
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
                    isFirst={index === 0}
                    isLast={index === filteredActivities.length - 1}
                  />
                ))
              )}
            </div>
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
