'use client';

import { useState, useEffect } from 'react';
import { X, Plus } from '@phosphor-icons/react';

interface AddCompetitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; website: string; keywords: string[] }) => void;
}

export default function AddCompetitorModal({ isOpen, onClose, onSubmit }: AddCompetitorModalProps) {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isDemoFilled, setIsDemoFilled] = useState(false);

  const suggestedKeywords = ['pricing', 'product', 'content', 'social'];

  // Form validation: All 3 fields must be filled
  const isFormValid = name.trim() !== '' && website.trim() !== '' && selectedKeywords.length > 0;

  // Auto-fill demo data on first field focus
  const fillDemoData = () => {
    if (!isDemoFilled) {
      setName('HubSpot');
      setWebsite('https://hubspot.com');
      setSelectedKeywords(['marketing', 'crm', 'automation']);
      setIsDemoFilled(true);
    }
  };

  const handleAddKeyword = (keyword: string) => {
    if (!selectedKeywords.includes(keyword)) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
  };

  // NEW: Convert typed keyword to tag on Enter or Comma
  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const keyword = keywordInput.trim();

      if (keyword && !selectedKeywords.includes(keyword)) {
        setSelectedKeywords([...selectedKeywords, keyword]);
        setKeywordInput('');
      }
    }
  };

  const handleSubmit = () => {
    if (!isFormValid) return;

    onSubmit({
      name: name.trim(),
      website: website.trim(),
      keywords: selectedKeywords
    });

    // Reset form
    setName('');
    setWebsite('');
    setKeywordInput('');
    setSelectedKeywords([]);
    setIsDemoFilled(false);
  };

  const handleClose = () => {
    setName('');
    setWebsite('');
    setKeywordInput('');
    setSelectedKeywords([]);
    setIsDemoFilled(false);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - Black with 20% opacity */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={handleClose}
        onKeyDown={handleKeyDown}
        role="presentation"
        tabIndex={-1}
      />

      {/* Modal Container - RESPONSIVE */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-8">
        <div
          className="pointer-events-auto"
          style={{
            width: '685px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            padding: '2px',
            background: '#FFFFFF',
            boxShadow: '0px 0px 30px rgba(178, 178, 179, 0.75)',
            borderRadius: '16px',
          }}
        >
          {/* Card - NO FIXED HEIGHT, EXPANDS DYNAMICALLY */}
          <div
            className="bg-white border-2 border-[#F2F2F2] rounded-[14px] flex flex-col overflow-hidden"
            style={{ width: '681px', maxWidth: '100%' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-[10px] border-b border-[#F2F2F2] flex-shrink-0">
              <h2 className="text-[16px] font-bold text-[#0F172A]">Add Competitor</h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 bg-white rounded-[20px] flex items-center justify-center hover:bg-[#F3F4F6] transition-colors"
                aria-label="Close modal"
              >
                <X size={16} weight="bold" className="text-[#000000]" />
              </button>
            </div>

            {/* Body - EXPANDS BASED ON CONTENT */}
            <div className="px-6 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
              {/* Competitor Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#6B7280]">
                  Competitor Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={fillDemoData}
                  placeholder="Enter competitor name"
                  className="w-full h-9 px-3 py-[6px] bg-white border border-[#F2F2F2] rounded-[4px] text-[16px] text-[#464A53] placeholder:text-[#464A53] focus:outline-none focus:border-primary"
                />
              </div>

              {/* Website URL Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#6B7280]">
                  Website URL
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  onFocus={fillDemoData}
                  placeholder="Enter website URL"
                  className="w-full h-9 px-3 py-[6px] bg-white border border-[#F2F2F2] rounded-[4px] text-[16px] text-[#464A53] placeholder:text-[#464A53] focus:outline-none focus:border-primary"
                />
              </div>

              {/* Keywords to Track Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#6B7280]">
                  Keywords to Track
                </label>
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleKeywordKeyDown}
                  onFocus={fillDemoData}
                  placeholder="Type keyword and press Enter"
                  className="w-full h-9 px-3 py-[6px] bg-white border border-[#F2F2F2] rounded-[4px] text-[16px] text-[#464A53] placeholder:text-[#464A53] focus:outline-none focus:border-primary"
                />

                {/* Selected Keywords */}
                {selectedKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedKeywords.map((keyword) => (
                      <button
                        key={keyword}
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="px-2 py-1 bg-primary text-white text-[12px] rounded-[8px] flex items-center gap-1 hover:opacity-80 transition-opacity"
                      >
                        {keyword}
                        <X size={12} weight="bold" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-[12px] text-[#6B7280]">Suggestions</span>
                  {suggestedKeywords.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => handleAddKeyword(keyword)}
                      disabled={selectedKeywords.includes(keyword)}
                      className={`px-2 py-1 rounded-[8px] flex items-center gap-1 text-[12px] transition-all ${
                        selectedKeywords.includes(keyword)
                          ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                          : 'bg-[#F2F2F2] text-[#464A53] hover:bg-[#E5E7EB]'
                      }`}
                    >
                      {keyword}
                      <Plus size={12} weight="bold" className="text-[#464A53]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-[10px] px-4 py-[10px] bg-[#FAFAFA] border-t border-[#F2F2F2] flex-shrink-0">
              <button
                onClick={handleClose}
                className="px-4 py-1 h-8 bg-white border border-[#ACB0B9] rounded-[4px] text-[16px] text-[#1E293B] hover:bg-[#F3F4F6] transition-colors"
                style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`px-4 py-1 h-8 rounded-[4px] text-[16px] text-white transition-all ${
                  isFormValid
                    ? 'bg-primary hover:opacity-90 cursor-pointer'
                    : 'bg-[#C3E2EF] cursor-not-allowed'
                }`}
                style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
              >
                Start Tracking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
