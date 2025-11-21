'use client';

import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { useNavigationHistory } from '@/contexts/NavigationHistoryContext';

export default function NavigationArrows() {
  const { canGoBack, canGoForward, goBack, goForward } = useNavigationHistory();

  return (
    <div className="flex items-center gap-1">
      {/* Back Button */}
      <button
        onClick={goBack}
        disabled={!canGoBack}
        title="Back"
        className={`
          w-8 h-8 bg-white border border-[#E5E7EB] rounded flex items-center justify-center transition-all
          ${canGoBack
            ? 'hover:bg-[#F3F4F6] hover:border-[#1B5066] cursor-pointer'
            : 'opacity-40 cursor-not-allowed'
          }
        `}
        aria-label="Go back"
      >
        <ArrowLeft size={16} weight="bold" className="text-[#6B7280]" />
      </button>

      {/* Forward Button */}
      <button
        onClick={goForward}
        disabled={!canGoForward}
        title="Forward"
        className={`
          w-8 h-8 bg-white border border-[#E5E7EB] rounded flex items-center justify-center transition-all
          ${canGoForward
            ? 'hover:bg-[#F3F4F6] hover:border-[#1B5066] cursor-pointer'
            : 'opacity-40 cursor-not-allowed'
          }
        `}
        aria-label="Go forward"
      >
        <ArrowRight size={16} weight="bold" className="text-[#6B7280]" />
      </button>
    </div>
  );
}
