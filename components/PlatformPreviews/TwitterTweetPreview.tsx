import { ChatCircle, Repeat, Heart, ChartBar, ShareFat } from '@phosphor-icons/react';

interface TwitterTweetPreviewProps {
  content: string;
  handle?: string;
  displayName?: string;
}

export function TwitterTweetPreview({
  content,
  handle = "YourCompany",
  displayName = "Your Company"
}: TwitterTweetPreviewProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4">
      {/* Twitter-style header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">
            {displayName.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-gray-900">{displayName}</span>
            <span className="text-blue-500">✓</span>
            <span className="text-gray-500">@{handle}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">1m</span>
          </div>

          {/* Tweet content */}
          <div className="text-gray-900 text-base leading-normal mt-2 whitespace-pre-wrap">
            {content}
          </div>

          {/* Twitter action buttons */}
          <div className="flex items-center justify-between mt-3 max-w-md text-gray-500">
            <button className="flex items-center gap-2 hover:text-blue-500 group">
              <div className="group-hover:bg-blue-50 rounded-full p-2">
                <ChatCircle size={18} />
              </div>
              <span className="text-sm">12</span>
            </button>
            <button className="flex items-center gap-2 hover:text-green-500 group">
              <div className="group-hover:bg-green-50 rounded-full p-2">
                <Repeat size={18} />
              </div>
              <span className="text-sm">3</span>
            </button>
            <button className="flex items-center gap-2 hover:text-pink-500 group">
              <div className="group-hover:bg-pink-50 rounded-full p-2">
                <Heart size={18} />
              </div>
              <span className="text-sm">45</span>
            </button>
            <button className="flex items-center gap-2 hover:text-blue-500 group">
              <div className="group-hover:bg-blue-50 rounded-full p-2">
                <ChartBar size={18} />
              </div>
              <span className="text-sm">1.2K</span>
            </button>
            <button className="flex items-center gap-2 hover:text-blue-500 group">
              <div className="group-hover:bg-blue-50 rounded-full p-2">
                <ShareFat size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
