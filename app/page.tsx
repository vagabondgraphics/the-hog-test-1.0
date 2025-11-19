import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import OpportunityCard from '@/components/OpportunityCard';
import ActivityFeed from '@/components/ActivityFeed';
import OpportunityList from '@/components/OpportunityList';
import OpportunityTrendGraph from '@/components/OpportunityTrendGraph';
import OpportunityLineChart from '@/components/OpportunityLineChart';
import TopOpportunitiesSection from '@/components/TopOpportunitiesSection';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-surface-light">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          {/* Everything merged - no padding, no spacing */}
          <div className="border-b border-gray-100">
            {/* Metric Cards Row - No gaps between cards */}
            <div className="flex border-b border-gray-100">
              <div className="flex-1">
                <MetricCard
                  label="Opportunities Found"
                  value={47}
                  trend={{ direction: 'up', value: '+15% (vs. last 7 days)' }}
                  href="/opportunities"
                />
              </div>
              <div className="flex-1 border-l border-gray-100">
                <MetricCard
                  label="Competitive Moves Tracked"
                  value={23}
                  trend={{ direction: 'up', value: '+5% (Last 7 days)' }}
                  href="/competitors"
                />
              </div>
              <div className="flex-1 border-l border-gray-100">
                <MetricCard
                  label="Active Campaigns"
                  value={8}
                  subtitle="Across 4 channels"
                  href="/campaigns"
                />
              </div>
            </div>

            {/* Top Opportunities Section - Merged Box Design */}
            <TopOpportunitiesSection />

            {/* Charts Section - Side by Side */}
            <div className="flex border-b border-gray-100">
              {/* Left Chart - Line Chart */}
              <div className="flex-1">
                <OpportunityLineChart />
              </div>

              {/* Right Chart - Stacked Bar Chart */}
              <div className="flex-1 border-l border-gray-100">
                <OpportunityTrendGraph />
              </div>
            </div>

            {/* Activity Feed - Full Width */}
            <div className="border-b border-gray-100">
              <ActivityFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
