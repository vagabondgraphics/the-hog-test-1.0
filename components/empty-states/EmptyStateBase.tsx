interface EmptyStateProps {
  illustration: React.ReactNode;
  title: string;
  description: string;
  primaryCTA?: {
    label: string;
    onClick: () => void;
  };
  secondaryCTA?: {
    label: string;
    onClick: () => void;
  };
  steps?: string[];
}

export default function EmptyStateBase({
  illustration,
  title,
  description,
  primaryCTA,
  secondaryCTA,
  steps
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[600px] px-8 py-16">
      <div className="max-w-[800px] text-center">
        {/* Illustration */}
        <div className="mb-8">
          {illustration}
        </div>

        {/* Title */}
        <h2 className="text-[32px] font-bold text-[#0F172A] mb-3">
          {title}
        </h2>

        {/* Description */}
        <p className="text-[16px] text-[#6B7280] mb-8 max-w-[600px] mx-auto">
          {description}
        </p>

        {/* CTAs */}
        {primaryCTA && (
          <div className="flex items-center justify-center gap-3 mb-12">
            <button
              onClick={primaryCTA.onClick}
              className="px-6 py-3 bg-[#1B5066] text-white text-[14px] font-bold rounded-[6px] hover:opacity-90 transition-opacity"
            >
              {primaryCTA.label}
            </button>

            {secondaryCTA && (
              <button
                onClick={secondaryCTA.onClick}
                className="px-6 py-3 border border-[#1B5066] bg-white text-[#1B5066] text-[14px] font-bold rounded-[6px] hover:bg-[#F0F9FF] transition-colors"
              >
                {secondaryCTA.label}
              </button>
            )}
          </div>
        )}

        {/* Steps (Optional) */}
        {steps && steps.length > 0 && (
          <div className="grid grid-cols-4 gap-6 text-left">
            {steps.map((step, index) => (
              <div key={index} className="text-[14px] text-[#6B7280]">
                <span className="font-bold text-[#0F172A]">{index + 1}.</span> {step}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
