'use client';

import { useState } from 'react';
import { X } from '@phosphor-icons/react';

interface AddCompetitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; website: string; keywords: string[] }) => void;
}

export default function AddCompetitorModal({ isOpen, onClose, onSubmit }: AddCompetitorModalProps) {
  const [competitorName, setCompetitorName] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');

  const suggestions = ['pricing', 'product', 'content', 'social'];

  const addKeyword = (keyword: string) => {
    if (!selectedKeywords.includes(keyword)) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const removeKeyword = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
  };

  const handleKeywordInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      addKeyword(keywordInput.trim());
      setKeywordInput('');
    }
  };

  const handleSubmit = () => {
    if (!competitorName || !websiteURL) {
      alert('Please fill all required fields');
      return;
    }

    onSubmit({
      name: competitorName,
      website: websiteURL,
      keywords: selectedKeywords
    });

    // Reset form
    setCompetitorName('');
    setWebsiteURL('');
    setSelectedKeywords([]);
    setKeywordInput('');
  };

  const handleCancel = () => {
    setCompetitorName('');
    setWebsiteURL('');
    setSelectedKeywords([]);
    setKeywordInput('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-[8px] p-32">
        {/* Header */}
        <div className="flex justify-between items-center mb-24">
          <h2 className="text-[20px] font-bold text-[#0F172A]">Add Competitor</h2>
          <button
            onClick={handleCancel}
            className="text-[#6B7280] hover:text-[#0F172A] transition-colors"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Competitor Name Input */}
        <div className="mb-24">
          <label className="block text-[14px] font-bold text-[#0F172A] mb-8">
            Competitor Name
          </label>
          <input
            type="text"
            placeholder="Enter Text"
            value={competitorName}
            onChange={(e) => setCompetitorName(e.target.value)}
            className="w-full h-40 px-12 border border-[#F2F2F2] rounded-[6px] text-[14px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B5066]"
          />
        </div>

        {/* Website URL Input */}
        <div className="mb-24">
          <label className="block text-[14px] font-bold text-[#0F172A] mb-8">
            Website URL
          </label>
          <input
            type="text"
            placeholder="Enter Text"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
            className="w-full h-40 px-12 border border-[#F2F2F2] rounded-[6px] text-[14px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B5066]"
          />
        </div>

        {/* Keywords Input with Tag Chips */}
        <div className="mb-16">
          <label className="block text-[14px] font-bold text-[#0F172A] mb-8">
            Keywords to Track
          </label>
          <div className="w-full min-h-40 px-12 py-8 border border-[#F2F2F2] rounded-[6px] flex flex-wrap gap-8 items-center">
            {selectedKeywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center gap-4 bg-[#F3F4F6] text-[#0F172A] text-[12px] font-bold px-8 py-4 rounded-[4px]"
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="hover:text-[#EF4444]"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Enter Text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordInputKeyDown}
              className="flex-1 min-w-120 h-24 text-[14px] outline-none"
            />
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="mb-24">
          <label className="block text-[14px] text-[#6B7280] mb-8">Suggestions</label>
          <div className="flex flex-wrap gap-8">
            {suggestions.map((keyword) => (
              <button
                key={keyword}
                onClick={() => addKeyword(keyword)}
                disabled={selectedKeywords.includes(keyword)}
                className="inline-flex items-center gap-4 bg-white border border-[#F2F2F2] text-[#0F172A] text-[12px] font-bold px-8 py-4 rounded-[4px] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {keyword} +
              </button>
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-12">
          <button
            onClick={handleCancel}
            className="px-16 py-8 text-[14px] font-bold text-[#6B7280] hover:text-[#0F172A] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-24 py-8 bg-[#1B5066] text-white text-[14px] font-bold rounded-[6px] hover:opacity-90 transition-opacity"
          >
            Start Tracking
          </button>
        </div>
      </div>
    </div>
  );
}
