'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useNavigationHistory } from '@/contexts/NavigationHistoryContext';
import Sidebar from '@/components/Sidebar';
import NavigationArrows from '@/components/NavigationArrows';
import ChannelBadge from '@/components/ChannelBadge';
import { PlatformPreview } from '@/components/PlatformPreview';
import {
  Bell,
  Copy,
  Check,
  PencilSimple,
  ArrowsClockwise,
  CalendarBlank,
  CaretDown,
  X,
  Info,
  Sparkle
} from '@phosphor-icons/react';

// Types
type ContentType = 'linkedin-post' | 'reddit-comment' | 'twitter-thread' | 'blog-post' | 'email' | 'ad-copy' | 'case-study' | 'video-script' | 'landing-page' | 'product-desc';
type Goal = 'engagement' | 'lead-gen' | 'brand-awareness' | 'education' | 'conversion' | 'community-building' | 'thought-leadership' | 'product-launch';
type Tone = 'professional' | 'casual' | 'friendly' | 'authoritative' | 'humorous';

interface Variant {
  id: number;
  content: string;
  isEditing: boolean;
  editedContent: string;
  showPreview: boolean;
}

interface Opportunity {
  id: string;
  title: string;
  channel: string;
  channelColor: string;
  urgency: 'high' | 'medium' | 'low';
  description: string;
}

const CONTENT_TYPES = [
  { value: 'linkedin-post', label: 'LinkedIn Post', icon: '💼' },
  { value: 'reddit-comment', label: 'Reddit Comment', icon: '💬' },
  { value: 'twitter-thread', label: 'Twitter Thread', icon: '🐦' },
  { value: 'blog-post', label: 'Blog Post', icon: '📝' },
  { value: 'email', label: 'Email', icon: '✉️' },
  { value: 'ad-copy', label: 'Ad Copy', icon: '📢' },
  { value: 'case-study', label: 'Case Study', icon: '📊' },
  { value: 'video-script', label: 'Video Script', icon: '🎬' },
  { value: 'landing-page', label: 'Landing Page', icon: '🌐' },
  { value: 'product-desc', label: 'Product Description', icon: '🏷️' },
];

const GOALS = [
  { value: 'engagement', label: 'Engagement' },
  { value: 'lead-gen', label: 'Lead Generation' },
  { value: 'brand-awareness', label: 'Brand Awareness' },
  { value: 'education', label: 'Education' },
  { value: 'conversion', label: 'Conversion' },
  { value: 'community-building', label: 'Community Building' },
  { value: 'thought-leadership', label: 'Thought Leadership' },
  { value: 'product-launch', label: 'Product Launch' },
];

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'humorous', label: 'Humorous' },
];

// Demo opportunities
const DEMO_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Discussion about AI automation tools in r/SaaS',
    channel: 'Reddit',
    channelColor: '#FF4500',
    urgency: 'high',
    description: 'User asking for recommendations on AI tools for marketing automation'
  },
  {
    id: '2',
    title: 'LinkedIn conversation about B2B lead generation',
    channel: 'LinkedIn',
    channelColor: '#0A66C2',
    urgency: 'medium',
    description: 'Discussion thread about effective B2B prospecting strategies'
  },
  {
    id: '3',
    title: 'Twitter thread on competitive intelligence',
    channel: 'Twitter',
    channelColor: '#1DA1F2',
    urgency: 'low',
    description: 'Influencer discussing challenges in tracking competitors'
  },
];

function ContentGeneratorPageContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { pushHistory } = useNavigationHistory();

  // State
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(DEMO_OPPORTUNITIES[0]);
  const [contentType, setContentType] = useState<ContentType>('reddit-comment');
  const [goal, setGoal] = useState<Goal>('engagement');
  const [tone, setTone] = useState<Tone>('friendly');
  const [additionalContext, setAdditionalContext] = useState('Highlight our AI-powered competitor tracking features and personalized content recommendations.');
  const [variants, setVariants] = useState<Variant[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showScheduleModal, setShowScheduleModal] = useState<number | null>(null);
  const [showOpportunityModal, setShowOpportunityModal] = useState(false);
  const [copiedVariant, setCopiedVariant] = useState<number | null>(null);
  const [regeneratingVariant, setRegeneratingVariant] = useState<number | null>(null);
  const [showDifferenceExplainer, setShowDifferenceExplainer] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Track page visits
  useEffect(() => {
    pushHistory(pathname);
  }, [pathname, pushHistory]);

  // Handle opportunity from URL params (if navigated from Channels/Dashboard)
  useEffect(() => {
    const oppId = searchParams.get('opportunityId');
    if (oppId) {
      const opp = DEMO_OPPORTUNITIES.find(o => o.id === oppId);
      if (opp) {
        setSelectedOpportunity(opp);
      }
    }
  }, [searchParams]);

  const generateContent = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setVariants([]);

    // Simulate progress
    const steps = [
      'Analyzing opportunity context...',
      'Understanding target audience...',
      'Generating creative variations...',
      'Refining tone and messaging...',
      'Finalizing content...',
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setGenerationProgress((i + 1) / steps.length * 100);
    }

    // Generate demo variants
    const demoVariants: Variant[] = [
      {
        id: 1,
        content: `Hey! I've been using The Hog for competitive intelligence and it's been a game-changer for our team. The AI-powered tracking automatically surfaces opportunities like this one, and the personalized content recommendations help us engage at exactly the right moment. Worth checking out if you're looking to automate your GTM research! 🚀`,
        isEditing: false,
        editedContent: '',
        showPreview: false,
      },
      {
        id: 2,
        content: `We had the same challenge until we started using The Hog. It's an AI-driven platform that monitors competitors across channels and generates personalized content suggestions. The competitor tracking feature alone has saved our team 15+ hours per week. Happy to share more about our experience if helpful!`,
        isEditing: false,
        editedContent: '',
        showPreview: false,
      },
      {
        id: 3,
        content: `I'd recommend checking out The Hog - it's built specifically for this use case. Their AI automatically tracks competitor activity, identifies opportunities, and even suggests content responses. The personalized recommendations are surprisingly good. They have a free trial if you want to test it out.`,
        isEditing: false,
        editedContent: '',
        showPreview: false,
      },
    ];

    setVariants(demoVariants);
    setIsGenerating(false);
    setGenerationProgress(0);
  };

  const handleCopy = (variantId: number) => {
    const variant = variants.find(v => v.id === variantId);
    if (variant) {
      navigator.clipboard.writeText(variant.content);
      setCopiedVariant(variantId);
      setTimeout(() => setCopiedVariant(null), 2000);
    }
  };

  const handleEdit = (variantId: number) => {
    setVariants(prev => prev.map(v =>
      v.id === variantId
        ? { ...v, isEditing: true, editedContent: v.content }
        : v
    ));
  };

  const handleSaveEdit = (variantId: number) => {
    setVariants(prev => prev.map(v =>
      v.id === variantId
        ? { ...v, isEditing: false, content: v.editedContent }
        : v
    ));
  };

  const handleCancelEdit = (variantId: number) => {
    setVariants(prev => prev.map(v =>
      v.id === variantId
        ? { ...v, isEditing: false, editedContent: '' }
        : v
    ));
  };

  const handleRegenerateVariant = async (variantId: number) => {
    setRegeneratingVariant(variantId);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newContents = [
      `Another perspective: The Hog has been instrumental in how we approach competitive intelligence. The platform's AI does the heavy lifting on research and content generation, letting our team focus on strategy and execution. Plus, their personalized recommendations are consistently relevant.`,
      `You might find The Hog useful here. We've been using it to automate competitor monitoring and content creation. The AI-generated suggestions are tailored to each opportunity, which makes engagement feel more authentic. It's been a solid addition to our GTM stack.`,
      `Consider trying The Hog - it's designed to solve exactly this problem. The platform combines competitor tracking with AI-powered content generation, and the results have been impressive for our team. They offer a demo that shows the full workflow.`,
    ];

    const randomContent = newContents[Math.floor(Math.random() * newContents.length)];

    setVariants(prev => prev.map(v =>
      v.id === variantId
        ? { ...v, content: randomContent }
        : v
    ));
    setRegeneratingVariant(null);
  };

  const handleChangeOpportunity = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setVariants([]);
    setShowOpportunityModal(false);
  };

  const handleTogglePreview = (variantId: number) => {
    setVariants(prev => prev.map(v =>
      v.id === variantId
        ? { ...v, showPreview: !v.showPreview }
        : v
    ));
  };

  const isFormValid = contentType && goal;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="flex-shrink-0">
          <div className="bg-white border-b border-[#F2F2F2] px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-base font-bold text-[#0F172A]">THE HOG</h1>
                <span className="text-[#6B7280]">•</span>
                <NavigationArrows />
                <h2 className="text-base font-bold text-[#0F172A]">Content Generator</h2>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                  <Bell size={20} weight="regular" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - 2 Column Layout */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="flex h-full">
            {/* LEFT PANEL - Context + Inputs (480px fixed) */}
            <div className="w-[480px] flex-shrink-0 border-r border-[#E5E7EB] p-6 overflow-y-auto">
              {/* Page Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Generate Content</h3>
                <p className="text-sm text-[#6B7280]">
                  Create AI-powered content tailored to your opportunities
                </p>
              </div>

              {/* Context Card - Only show if opportunity selected */}
              {selectedOpportunity && (
                <div className="mb-6 p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkle size={16} weight="fill" className="text-primary" />
                      <span className="text-xs font-bold text-text-primary">OPPORTUNITY CONTEXT</span>
                    </div>
                    <button
                      onClick={() => setShowOpportunityModal(true)}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-[#0F172A] mb-2">{selectedOpportunity.title}</h4>

                  <div className="flex items-center gap-2 mb-3">
                    <ChannelBadge channel={selectedOpportunity.channel as any} size="md" />
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        selectedOpportunity.urgency === 'high'
                          ? 'bg-[#FEE2E2] text-[#991B1B]'
                          : selectedOpportunity.urgency === 'medium'
                          ? 'bg-[#FEF3C7] text-[#92400E]'
                          : 'bg-[#DBEAFE] text-[#1E3A8A]'
                      }`}
                    >
                      {selectedOpportunity.urgency.toUpperCase()} URGENCY
                    </span>
                  </div>

                  <p className="text-sm text-[#6B7280]">{selectedOpportunity.description}</p>
                </div>
              )}

              {/* Input Form */}
              <div className="space-y-4">
                {/* Content Type Dropdown */}
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">
                    Content Type
                  </label>
                  <div className="relative">
                    <select
                      value={contentType}
                      onChange={(e) => setContentType(e.target.value as ContentType)}
                      className="w-full h-12 pl-10 pr-10 border border-[#E5E7EB] rounded-lg text-sm text-text-primary bg-white appearance-none cursor-pointer hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {CONTENT_TYPES.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">
                      {CONTENT_TYPES.find(t => t.value === contentType)?.icon}
                    </span>
                    <CaretDown
                      size={16}
                      weight="bold"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none"
                    />
                  </div>
                </div>

                {/* Goal Dropdown */}
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">
                    Goal
                  </label>
                  <div className="relative">
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value as Goal)}
                      className="w-full h-12 px-4 pr-10 border border-[#E5E7EB] rounded-lg text-sm text-text-primary bg-white appearance-none cursor-pointer hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {GOALS.map(g => (
                        <option key={g.value} value={g.value}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                    <CaretDown
                      size={16}
                      weight="bold"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none"
                    />
                  </div>
                </div>

                {/* Tone Segmented Controls */}
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">
                    Tone
                  </label>
                  <div className="flex gap-2">
                    {TONES.map(t => (
                      <button
                        key={t.value}
                        onClick={() => setTone(t.value as Tone)}
                        className={`flex-1 h-10 px-3 text-xs font-bold rounded-lg transition-all ${
                          tone === t.value
                            ? 'bg-primary text-white'
                            : 'bg-white border border-[#E5E7EB] text-neutral hover:border-primary'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Context */}
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">
                    Additional Context
                  </label>
                  <textarea
                    value={additionalContext}
                    onChange={(e) => setAdditionalContext(e.target.value)}
                    placeholder="Add any specific details, key points, or requirements..."
                    className="w-full h-[120px] px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-text-primary bg-white resize-none hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[#6B7280]">Optional but recommended for better results</span>
                    <span className="text-xs text-[#6B7280]">{additionalContext.length}/500</span>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateContent}
                  disabled={!isFormValid || isGenerating}
                  className="w-full h-12 bg-primary text-white text-sm font-bold rounded-lg shadow-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  {isGenerating ? 'Generating...' : 'Generate Content'}
                </button>
              </div>
            </div>

            {/* RIGHT PANEL - Output Variants */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Empty State */}
              {variants.length === 0 && !isGenerating && (
                <div className="h-full flex items-center justify-center bg-[#F8FAFC] rounded-lg">
                  <div className="text-center max-w-md px-6">
                    <div className="w-16 h-16 bg-[#E5E7EB] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkle size={32} weight="duotone" className="text-[#6B7280]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                      Ready to Generate Content
                    </h3>
                    <p className="text-sm text-[#6B7280]">
                      Configure your content settings on the left and click "Generate Content" to create AI-powered variants tailored to your opportunity.
                    </p>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {isGenerating && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center max-w-md px-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Sparkle size={32} weight="duotone" className="text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                      Generating {CONTENT_TYPES.find(t => t.value === contentType)?.label} variants...
                    </h3>
                    <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${generationProgress}%` }}
                      />
                    </div>
                    <div className="space-y-2">
                      {[
                        'Analyzing opportunity context...',
                        'Understanding target audience...',
                        'Generating creative variations...',
                        'Refining tone and messaging...',
                        'Finalizing content...',
                      ].map((step, idx) => (
                        <div
                          key={step}
                          className={`text-sm flex items-center gap-2 ${
                            generationProgress >= ((idx + 1) / 5 * 100)
                              ? 'text-primary font-bold'
                              : 'text-neutral'
                          }`}
                        >
                          {generationProgress >= ((idx + 1) / 5 * 100) && (
                            <Check size={16} weight="bold" />
                          )}
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Variants Display */}
              {variants.length > 0 && !isGenerating && (
                <div className="space-y-6">
                  {variants.map((variant, index) => (
                    <div
                      key={variant.id}
                      className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Variant Header */}
                      <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E7EB]">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-[#0F172A]">
                            Variant {index + 1}
                          </span>

                          {/* Preview/Content Toggle */}
                          <div className="flex items-center gap-1 bg-gray-100 rounded-md p-1">
                            <button
                              onClick={() => handleTogglePreview(variant.id)}
                              className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                                !variant.showPreview
                                  ? 'bg-white text-gray-900 shadow-sm'
                                  : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              Content
                            </button>
                            <button
                              onClick={() => handleTogglePreview(variant.id)}
                              className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                                variant.showPreview
                                  ? 'bg-white text-gray-900 shadow-sm'
                                  : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              Preview
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopy(variant.id)}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/5 rounded transition-colors"
                        >
                          {copiedVariant === variant.id ? (
                            <>
                              <Check size={16} weight="bold" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={16} weight="bold" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>

                      {/* Variant Content */}
                      <div className="p-5">
                        {variant.showPreview ? (
                          <PlatformPreview
                            contentType={contentType}
                            content={variant.editedContent || variant.content}
                          />
                        ) : variant.isEditing ? (
                          <textarea
                            value={variant.editedContent}
                            onChange={(e) => setVariants(prev => prev.map(v =>
                              v.id === variant.id
                                ? { ...v, editedContent: e.target.value }
                                : v
                            ))}
                            className="w-full h-[200px] px-4 py-3 border border-[#E5E7EB] rounded-lg text-base text-text-primary bg-white resize-none focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        ) : (
                          <div className="text-base text-[#0F172A] leading-relaxed max-h-[400px] overflow-y-auto">
                            {variant.content}
                          </div>
                        )}
                      </div>

                      {/* Variant Footer */}
                      <div className="flex items-center gap-3 px-5 py-3 border-t border-[#E5E7EB] bg-[#F8FAFC]">
                        {variant.isEditing ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(variant.id)}
                              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity"
                            >
                              <Check size={16} weight="bold" />
                              Save
                            </button>
                            <button
                              onClick={() => handleCancelEdit(variant.id)}
                              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral bg-white border border-[#E5E7EB] rounded-lg hover:border-primary transition-colors"
                            >
                              <X size={16} weight="bold" />
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(variant.id)}
                              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-primary bg-white border border-[#E5E7EB] rounded-lg hover:border-primary transition-colors"
                            >
                              <PencilSimple size={16} weight="bold" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleRegenerateVariant(variant.id)}
                              disabled={regeneratingVariant === variant.id}
                              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-primary bg-white border border-[#E5E7EB] rounded-lg hover:border-primary transition-colors disabled:opacity-50"
                            >
                              <ArrowsClockwise
                                size={16}
                                weight="bold"
                                className={regeneratingVariant === variant.id ? 'animate-spin' : ''}
                              />
                              Regenerate This
                            </button>
                            {['reddit-comment', 'twitter-thread', 'linkedin-post'].includes(contentType) && (
                              <button
                                onClick={() => setShowScheduleModal(variant.id)}
                                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-success rounded-lg hover:opacity-90 transition-opacity ml-auto"
                              >
                                <CalendarBlank size={16} weight="bold" />
                                Schedule Post
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* How These Variants Differ */}
                  <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setShowDifferenceExplainer(!showDifferenceExplainer)}
                      className="w-full flex items-center justify-between px-5 py-3 bg-[#F8FAFC] hover:bg-[#F3F4F6] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Info size={16} weight="bold" className="text-primary" />
                        <span className="text-sm font-bold text-text-primary">
                          How these variants differ
                        </span>
                      </div>
                      <CaretDown
                        size={16}
                        weight="bold"
                        className={`text-neutral transition-transform ${
                          showDifferenceExplainer ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {showDifferenceExplainer && (
                      <div className="px-5 py-4 bg-white border-t border-[#E5E7EB]">
                        <ul className="space-y-2 text-sm text-neutral">
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span><strong>Variant 1</strong> uses a personal testimonial approach with emoji, emphasizing team benefits and specific time savings</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span><strong>Variant 2</strong> focuses on problem-solution framing with quantifiable results (15+ hours saved)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span><strong>Variant 3</strong> takes a direct recommendation style with emphasis on AI capabilities and trial offer</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Schedule Post Modal */}
      {showScheduleModal !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
              <h3 className="text-lg font-bold text-text-primary">Schedule Post</h3>
              <button
                onClick={() => setShowScheduleModal(null)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-3xl transition-colors"
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2">
                  Platform
                </label>
                {selectedOpportunity?.channel ? (
                  <div className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg bg-white flex items-center">
                    <ChannelBadge channel={selectedOpportunity.channel as any} size="md" showLabel={true} />
                  </div>
                ) : (
                  <select className="w-full h-12 px-4 pr-10 border border-[#E5E7EB] rounded-lg text-sm text-[#0F172A] bg-white appearance-none cursor-pointer">
                    <option>Select platform</option>
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg text-sm text-[#0F172A] bg-white"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowScheduleModal(null)}
                  className="flex-1 h-12 px-4 text-sm font-bold text-neutral bg-white border border-[#E5E7EB] rounded-lg hover:border-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const platform = selectedOpportunity?.channel || 'Platform';
                    setShowScheduleModal(null);
                    setToastMessage(`Post scheduled for ${platform}!`);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 5000);
                  }}
                  className="flex-1 h-12 px-4 text-sm font-bold text-white bg-success rounded-lg hover:opacity-90 transition-opacity"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Opportunity Modal */}
      {showOpportunityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
              <h3 className="text-lg font-bold text-text-primary">Select Opportunity</h3>
              <button
                onClick={() => setShowOpportunityModal(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-3xl transition-colors"
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <div className="p-6 space-y-3 overflow-y-auto">
              {DEMO_OPPORTUNITIES.map(opp => (
                <button
                  key={opp.id}
                  onClick={() => handleChangeOpportunity(opp)}
                  className={`w-full text-left p-4 border rounded-xl transition-all ${
                    selectedOpportunity?.id === opp.id
                      ? 'border-primary bg-primary/5'
                      : 'border-[#E5E7EB] hover:border-primary'
                  }`}
                >
                  <h4 className="text-sm font-bold text-[#0F172A] mb-2">{opp.title}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <ChannelBadge channel={opp.channel as any} size="md" />
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        opp.urgency === 'high'
                          ? 'bg-[#FEE2E2] text-[#991B1B]'
                          : opp.urgency === 'medium'
                          ? 'bg-[#FEF3C7] text-[#92400E]'
                          : 'bg-[#DBEAFE] text-[#1E3A8A]'
                      }`}
                    >
                      {opp.urgency.toUpperCase()} URGENCY
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280]">{opp.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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

export default function ContentGeneratorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContentGeneratorPageContent />
    </Suspense>
  );
}
