import { ThumbsUp, ChatCircle, Repeat, PaperPlaneTilt, DotsThree } from '@phosphor-icons/react';

interface LinkedInPostPreviewProps {
  content: string;
  companyName?: string;
}

export function LinkedInPostPreview({
  content,
  companyName = "Your Company"
}: LinkedInPostPreviewProps) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      {/* LinkedIn-style header */}
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {companyName.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{companyName}</div>
            <div className="text-xs text-gray-500">Company • 2,500 followers</div>
            <div className="text-xs text-gray-500">Just now • 🌐</div>
          </div>
          <button className="text-gray-500">
            <DotsThree size={24} />
          </button>
        </div>

        {/* Post content */}
        <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>

      {/* LinkedIn-style engagement bar */}
      <div className="border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>👍 12 • 3 comments</span>
        </div>
      </div>

      {/* LinkedIn action buttons */}
      <div className="border-t border-gray-200 px-4 py-2 flex items-center justify-around">
        <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded">
          <ThumbsUp size={20} />
          <span className="text-sm font-semibold">Like</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded">
          <ChatCircle size={20} />
          <span className="text-sm font-semibold">Comment</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded">
          <Repeat size={20} />
          <span className="text-sm font-semibold">Repost</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded">
          <PaperPlaneTilt size={20} />
          <span className="text-sm font-semibold">Send</span>
        </button>
      </div>
    </div>
  );
}
