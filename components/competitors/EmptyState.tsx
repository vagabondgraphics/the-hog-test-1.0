interface EmptyStateProps {
  onAddCompetitor: () => void;
}

export default function EmptyState({ onAddCompetitor }: EmptyStateProps) {
  const steps = [
    { num: 1, text: "Pinpoint your Ideal Customer Profile (ICP) from your company's website." },
    { num: 2, text: "Explore over 50 channels to find where your ICP is most active." },
    { num: 3, text: "Create a preliminary ranking of channels based on ICP conc." },
    { num: 4, text: "Estimated time: Just 5 minutes to get started!" }
  ];

  return (
    <div className="min-h-screen bg-white p-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-[32px] font-bold text-[#0F172A] mb-4">
          Discover Your Competitors
        </h1>

        {/* Subheadline */}
        <p className="text-[16px] text-[#6B7280] mb-8">
          No competitor activities found
        </p>

        {/* CTA Button */}
        <button
          onClick={onAddCompetitor}
          className="bg-[#1B5066] text-white px-24 py-12 rounded-[6px] text-[14px] font-bold hover:opacity-90 transition-opacity mb-16"
        >
          Add Competitors
        </button>

        {/* Onboarding Steps */}
        <div className="grid grid-cols-4 gap-16 mb-24 text-left">
          {steps.map((step) => (
            <div key={step.num}>
              <div className="text-[14px] text-[#6B7280]">
                {step.num}. {step.text}
              </div>
            </div>
          ))}
        </div>

        {/* Skeleton Cards */}
        <div className="grid grid-cols-1 gap-16">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-[#F2F2F2] p-24 rounded-[8px]">
              {/* Skeleton content: gray rectangles for text lines */}
              <div className="h-20 bg-[#F3F4F6] mb-12 w-1/4 rounded"></div>
              <div className="h-16 bg-[#F3F4F6] mb-8 w-3/4 rounded"></div>
              <div className="h-16 bg-[#F3F4F6] w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
