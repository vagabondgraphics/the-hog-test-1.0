import { ArrowUp, ChatCircle, ShareFat } from '@phosphor-icons/react';

interface RedditCommentPreviewProps {
  content: string;
  username?: string;
  timestamp?: string;
}

export function RedditCommentPreview({
  content,
  username = "YourCompany",
  timestamp = "just now"
}: RedditCommentPreviewProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4">
      {/* Reddit-style header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">Y</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="font-semibold text-gray-900">u/{username}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">{timestamp}</span>
        </div>
      </div>

      {/* Comment content */}
      <div className="text-gray-800 text-sm leading-relaxed ml-10 whitespace-pre-wrap">
        {content}
      </div>

      {/* Reddit-style action buttons */}
      <div className="flex items-center gap-4 mt-3 ml-10 text-xs text-gray-500">
        <button className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded">
          <ArrowUp size={16} />
          <span>Vote</span>
        </button>
        <button className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded">
          <ChatCircle size={16} />
          <span>Reply</span>
        </button>
        <button className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded">
          <ShareFat size={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
