import { RedditCommentPreview } from './PlatformPreviews/RedditCommentPreview';
import { LinkedInPostPreview } from './PlatformPreviews/LinkedInPostPreview';
import { TwitterTweetPreview } from './PlatformPreviews/TwitterTweetPreview';

interface PlatformPreviewProps {
  contentType: string;
  content: string;
}

export function PlatformPreview({ contentType, content }: PlatformPreviewProps) {
  // Map content type to preview component
  const previewComponents: Record<string, React.ComponentType<{ content: string }>> = {
    'reddit-comment': RedditCommentPreview,
    'linkedin-post': LinkedInPostPreview,
    'twitter-thread': TwitterTweetPreview,
  };

  const PreviewComponent = previewComponents[contentType];

  if (!PreviewComponent) {
    return (
      <div className="p-8 text-center text-gray-500">
        Preview not available for this content type
      </div>
    );
  }

  return (
    <div className="bg-surface-light p-6 rounded-lg">
      <div className="mb-3 text-sm text-gray-600 font-medium">
        Platform Preview:
      </div>
      <PreviewComponent content={content} />
    </div>
  );
}
