'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Opportunity {
  id: number;
  title: string;
  score: number;
  icpFit: number;
  timeLeft: string;
  context: string;
  icpDetails: string;
  aiRecommendation: string;
}

const initialOpportunities: Opportunity[] = [
  {
    id: 1,
    title: 'r/MarketingAutomation: "Best alternatives to HubSpot for small teams?"',
    score: 8.7,
    icpFit: 76,
    timeLeft: '2 hours left',
    context: '"Our 8-person marketing team is drowning in HubSpot costs ($3,200/month). We only use 40% of features. Looking for lightweight alternatives that handle email automation + basic CRM without enterprise bloat. Budget: under $500/month."',
    icpDetails: '19 marketers in thread (76% match your ICP: B2B SaaS, 5-20 employees, frustrated with enterprise tools). Active discussion on Reddit r/MarketingAutomation with 52 upvotes and 28 comments. Thread momentum stable over last 3 hours.',
    aiRecommendation: 'Strong budget pain point + explicit competitor mention (HubSpot) + clear feature requirements = excellent positioning window. Suggested action: Share "How 3 teams cut marketing automation costs 60% without losing features" case study. Position your tool as the "right-sized" alternative. Mention specific HubSpot migration support.'
  },
  {
    id: 2,
    title: 'LinkedIn: SaaS founder asking about AI-powered lead scoring vs. manual research',
    score: 8.3,
    icpFit: 82,
    timeLeft: '5 hours left',
    context: '"We\'re spending 15 hours/week manually researching leads. Tried some AI tools but they give us garbage data with fake emails. How are other B2B teams balancing automation quality vs. speed without hiring more SDRs?"',
    icpDetails: '14 SaaS founders in discussion (82% match your ICP: B2B, growth stage, lean sales teams). LinkedIn post with 38 reactions and 22 thoughtful comments. High engagement from target personas.',
    aiRecommendation: 'Quality concerns + time waste + explicit AI tool frustration = perfect entry point. Suggested action: Share "AI lead scoring accuracy benchmarks" data. Position your tool\'s verification process as differentiator. Offer free data quality audit.'
  },
  {
    id: 3,
    title: 'r/GrowthHacking: Thread comparing Clay.com vs Instantly.ai for outbound campaigns',
    score: 7.9,
    icpFit: 71,
    timeLeft: '8 hours left',
    context: '"Setting up our first outbound campaign. Clay seems powerful but complex. Instantly is simpler but limited. Budget is $800/month total. Which would you choose for a 3-person growth team?"',
    icpDetails: '23 growth marketers discussing (71% match your ICP: early-stage startups, first outbound motion). Reddit r/GrowthHacking with 45 upvotes, active thread with recent replies.',
    aiRecommendation: 'Direct competitor comparison + budget clarity + team size mention = strong positioning opportunity. Suggested action: Post comparison table (Clay vs Instantly vs Your Tool) focused on "ease of use for small teams." Offer guided onboarding for first campaign.'
  },
  {
    id: 4,
    title: 'r/SaaS: Discussion on automating competitor tracking for product launches',
    score: 7.6,
    icpFit: 68,
    timeLeft: '12 hours left',
    context: '"Launching a new feature next month. Want to track how competitors react and what customers are saying across Reddit, Twitter, and product review sites. Any tools that automate this without requiring a data science team?"',
    icpDetails: '17 product managers in thread (68% match your ICP: B2B SaaS, product-led growth). Reddit r/SaaS with 31 upvotes, mix of PM and founder perspectives.',
    aiRecommendation: 'Feature launch timing + multi-channel tracking need + simplicity requirement = niche positioning angle. Suggested action: Share "Competitor launch monitoring checklist" resource. Demo your competitive intelligence module. Offer free trial for launch period.'
  },
  {
    id: 5,
    title: 'r/Entrepreneur: Best tools for tracking brand mentions across social media?',
    score: 7.2,
    icpFit: 64,
    timeLeft: '18 hours left',
    context: '"Running a B2B SaaS company and want to jump into conversations where people mention our category. Currently doing manual Reddit/Twitter searches daily. Takes too much time. What tools do you use?"',
    icpDetails: '25 entrepreneurs discussing (64% match your ICP: smaller companies, limited resources). Reddit r/Entrepreneur with 58 upvotes, broad interest but lower purchase intent.',
    aiRecommendation: 'Time waste pain + manual process + category monitoring = moderate opportunity. Suggested action: Share "Social listening setup guide" with tool comparison. Position as category monitoring specialist vs. generic social listening. Offer quick-start template.'
  }
];

export default function TopOpportunitiesSection() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [isDismissing, setIsDismissing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [dismissedOpportunity, setDismissedOpportunity] = useState<Opportunity | null>(null);

  const mainOpportunity = opportunities[0];
  const compactOpportunities = opportunities.slice(1, 4);

  const handleDismiss = () => {
    if (opportunities.length === 0) return;

    // Store dismissed opportunity for undo
    setDismissedOpportunity(mainOpportunity);

    // Start dismiss animation
    setIsDismissing(true);

    // After fade-out animation (300ms), update state
    setTimeout(() => {
      setOpportunities(prev => prev.slice(1));
      setIsDismissing(false);
      setShowToast(true);

      // Auto-hide toast after 5 seconds
      setTimeout(() => {
        setShowToast(false);
        setDismissedOpportunity(null);
      }, 5000);
    }, 300);
  };

  const handleUndo = () => {
    if (dismissedOpportunity) {
      setOpportunities(prev => [dismissedOpportunity, ...prev]);
      setShowToast(false);
      setDismissedOpportunity(null);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
    setDismissedOpportunity(null);
  };

  if (opportunities.length === 0) {
    return (
      <div className="border-b border-gray-100 p-12 text-center">
        <div className="text-gray-500">
          <p className="text-lg font-bold mb-2">All caught up!</p>
          <p className="text-sm">No more opportunities to review at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Merged Box Container - No Border on Container */}
      <div className="bg-white">
        {/* Section Header - Has top and bottom borders */}
        <div className="border-t border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-gray-900">Top Opportunities Found:</h2>
          <span className="text-sm text-neutral">Last 24 hours</span>
        </div>

        {/* Two-Column Layout: Main (Left) + Compact List (Right) - NO GAPS */}
        <div className="flex border-l border-r border-b border-gray-100">
          {/* LEFT: Main Opportunity (60%) - Sharp Corners, White BG */}
          <div className="w-[60%]">
            <div
              className={`bg-white p-6 transition-all duration-300 ${
                isDismissing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              {/* Badges + Bell */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-800">
                  {mainOpportunity.icpFit}% ICP Fit
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-800">
                  {mainOpportunity.timeLeft}
                </span>
                <button className="ml-auto w-5 h-5 flex items-center justify-center text-neutral hover:text-primary transition-colors">
                  🔔
                </button>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight line-clamp-2">
                {mainOpportunity.title}
              </h3>

              {/* Score */}
              <div className="mb-4">
                <div className="text-[32px] font-bold text-primary leading-none">
                  {mainOpportunity.score}/10
                </div>
                <div className="text-xs text-neutral mt-1">Opportunity Score</div>
              </div>

              {/* Progress Bar */}
              <div className="mb-5">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-primary h-1 rounded-full"
                    style={{ width: `${mainOpportunity.icpFit}%` }}
                  ></div>
                </div>
              </div>

              {/* Context */}
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                <span className="font-bold text-gray-900">Thread Context:</span> {mainOpportunity.context}
              </p>

              {/* ICP Match Details */}
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                <span className="font-bold text-gray-900">ICP Match Details:</span> {mainOpportunity.icpDetails}
              </p>

              {/* AI Recommendation */}
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                <span className="font-bold text-primary">AI Recommendation:</span>{' '}
                {mainOpportunity.aiRecommendation}
              </p>

              {/* CTAs */}
              <div className="flex gap-3">
                <button
                  onClick={() => router.push(`/content?opportunityId=${mainOpportunity.id}`)}
                  className="font-bold rounded-lg transition-opacity hover:opacity-90 bg-primary text-white h-10 px-6 text-sm"
                >
                  Generate Reply
                </button>
                <button className="font-bold rounded-lg transition-opacity hover:opacity-90 bg-white text-primary border border-primary h-10 px-6 text-sm">
                  View Thread
                </button>
                <button
                  onClick={handleDismiss}
                  className="font-bold rounded-lg transition-colors bg-transparent text-neutral hover:text-danger h-10 px-6 text-sm"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Compact Opportunities List (40%, Vertical Stack) */}
          <div className="w-[40%] bg-white flex flex-col border-l border-gray-100">
            {compactOpportunities.map((opp, index) => (
              <div
                key={opp.id}
                className={`px-5 py-4 hover:bg-surface-light transition-colors cursor-pointer flex items-center justify-between ${
                  index < compactOpportunities.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {/* Title (Left) */}
                <h4 className="text-base font-bold text-gray-900 leading-tight flex-1 pr-4">
                  {opp.title}
                </h4>

                {/* See More Button (Right) */}
                <button
                  onClick={() => router.push(`/content?opportunityId=${opp.id}`)}
                  className="px-4 py-2 border border-primary text-primary text-sm font-bold rounded-md hover:bg-blue-50 transition-colors whitespace-nowrap"
                >
                  See More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-gray-800 bg-opacity-95 text-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-4">
            <span className="text-sm">Opportunity dismissed.</span>
            <button
              onClick={handleUndo}
              className="text-sm font-bold text-success hover:underline"
            >
              Undo
            </button>
            <button
              onClick={handleCloseToast}
              className="text-neutral hover:text-white text-lg leading-none ml-2"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
