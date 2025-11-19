import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import OpportunityCard from '@/components/OpportunityCard';
import ActivityFeed from '@/components/ActivityFeed';
import OpportunityList from '@/components/OpportunityList';
import OpportunityTrendGraph from '@/components/OpportunityTrendGraph';
import OpportunityLineChart from '@/components/OpportunityLineChart';

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
          <div className="border-b border-gray-200">
            {/* Metric Cards Row - No gaps between cards */}
            <div className="flex border-b border-gray-200">
              <div className="flex-1 border-r border-gray-200">
                <MetricCard
                  label="Opportunities Found"
                  value={47}
                  trend={{ direction: 'up', value: '+15% (vs. last 7 days)' }}
                  href="/opportunities"
                />
              </div>
              <div className="flex-1 border-r border-gray-200">
                <MetricCard
                  label="Competitive Moves Tracked"
                  value={23}
                  trend={{ direction: 'up', value: '+5% (Last 7 days)' }}
                  href="/competitors"
                />
              </div>
              <div className="flex-1">
                <MetricCard
                  label="Active Campaigns"
                  value={8}
                  subtitle="Across 4 channels"
                  href="/campaigns"
                />
              </div>
            </div>

            {/* Charts Section - Side by Side */}
            <div className="flex border-b border-gray-200">
              {/* Left Chart - Line Chart */}
              <div className="flex-1 border-r border-gray-200">
                <OpportunityLineChart />
              </div>

              {/* Right Chart - Stacked Bar Chart */}
              <div className="flex-1">
                <OpportunityTrendGraph />
              </div>
            </div>

            {/* Two Column Layout - Unified flex container */}
            <div className="flex">
              {/* Left Column - Opportunity Section */}
              <div className="flex-1 border-r border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  {/* Header with badges */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800">Hot</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">87% ICP Fit</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-800">6 hours left</span>
                    <button className="ml-auto w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-lg">
                      🔔
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    r/SaaS: High-Intent Discussion About [User&apos;s Product Category]
                  </h3>

                  {/* Score */}
                  <div className="mb-3">
                    <div className="text-3xl font-bold text-gray-900 leading-none">9.2/10</div>
                    <div className="text-xs text-neutral mt-1">Opportunity Score</div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                    32 founders discussing [specific pain point]. 87% match your ICP. Thread momentum peaked 2 hours ago.
                  </p>

                  <p className="text-sm text-gray-700 mb-5 leading-relaxed">
                    Why this matters: High purchase intent + low competitor presence. Suggested action: Post value-add comment with case study link.
                  </p>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button className="font-bold rounded-md transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white h-7 px-3 text-xs">Generate Reply</button>
                    <button className="font-bold rounded-md transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-primary border border-primary h-7 px-3 text-xs">View Thread</button>
                    <button className="font-bold rounded-md transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-neutral h-7 px-3 text-xs">Dismiss</button>
                  </div>
                </div>

                {/* Opportunity List section */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-gray-900">Top Opportunities Found:</h2>
                    <span className="text-xs text-neutral">Last 24 hours</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <div className="text-sm text-gray-700">r/SaaS: Insights on Clay</div>
                      <button className="font-bold rounded-md transition-opacity hover:opacity-90 bg-transparent text-neutral h-7 px-3 text-xs">See More</button>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <div className="text-sm text-gray-700">r/GrowthHacking: Strategies for AI-Driven Marketing Automation</div>
                      <button className="font-bold rounded-md transition-opacity hover:opacity-90 bg-transparent text-neutral h-7 px-3 text-xs">See More</button>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="text-sm text-gray-700">r/Marketing: Leveraging AI for Personalized Customer Journeys</div>
                      <button className="font-bold rounded-md transition-opacity hover:opacity-90 bg-transparent text-neutral h-7 px-3 text-xs">See More</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Activity Feed */}
              <div className="w-[400px]">
                <ActivityFeed />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
