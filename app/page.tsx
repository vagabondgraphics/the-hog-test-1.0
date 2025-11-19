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

            {/* HERO: Top Opportunity Card - Full Width */}
            <div className="border-b border-gray-200 p-6 bg-gradient-to-b from-gray-50 to-white">
              <div className="max-w-5xl mx-auto bg-white border-2 border-primary rounded-lg shadow-lg p-8">
                {/* Header with badges */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-red-100 text-red-800">Hot</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-green-100 text-green-800">89% ICP Fit</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-800">4 hours left</span>
                  <button className="ml-auto w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-lg">
                    🔔
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                  r/SaaS: High-Intent Discussion About AI-Powered GTM Tools for Lean Teams
                </h3>

                {/* Score */}
                <div className="mb-4">
                  <div className="text-4xl font-bold text-gray-900 leading-none">9.4/10</div>
                  <div className="text-sm text-neutral mt-1">Opportunity Score</div>
                </div>

                {/* Progress bar */}
                <div className="mb-5">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  <span className="font-bold">Thread Context:</span> &quot;We&apos;re a 6-person SaaS company doing $40K MRR. Our SDR just quit and we can&apos;t afford to replace them. Clay is too complex for our team, and Persana AI doesn&apos;t integrate with our CRM. How are other lean teams handling GTM automation without burning $2K/month on tools?&quot;
                </p>

                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  <span className="font-bold">ICP Match Details:</span> 27 founders in thread (89% match your ICP: B2B SaaS, 5-15 employees, $20K-$100K MRR). Active discussion on Reddit r/SaaS with 89 upvotes and 34 comments. Thread momentum peaked 90 minutes ago and declining fast.
                </p>

                <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                  <span className="font-bold">AI Recommendation:</span> High purchase intent + explicit competitor mentions (Clay, Persana AI) + budget concerns = perfect positioning opportunity. Suggested action: Post value-add comment sharing &quot;How we scaled GTM for 12 lean SaaS teams under $50K MRR&quot; case study. Link to your recent blog post. Mention your tool handles Clay + Persana use cases in one platform. No hard sell - just helpful positioning.
                </p>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button className="font-bold rounded-md transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white h-9 px-5 text-sm">Generate Reply</button>
                  <button className="font-bold rounded-md transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-primary border-2 border-primary h-9 px-5 text-sm">View Thread</button>
                  <button className="font-bold rounded-md transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-neutral h-9 px-5 text-sm">Dismiss</button>
                </div>
              </div>
            </div>

            {/* Top Opportunities Section - With Dismiss Interaction */}
            <TopOpportunitiesSection />

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

            {/* Activity Feed - Full Width */}
            <div className="border-b border-gray-200">
              <ActivityFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
