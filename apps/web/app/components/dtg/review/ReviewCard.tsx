import React from 'react';
import { StarIcon, ThumbsUpIcon, MessageSquareIcon } from 'lucide-react';
import { Button } from '../ui/Button';
export interface ReviewCardProps {
  review: {
    id: string;
    authorName: string;
    authorImage?: string;
    rating: number;
    date: string;
    content: string;
    helpful?: number;
    images?: string[];
    response?: {
      authorName: string;
      date: string;
      content: string;
    };
  };
  onMarkHelpful?: (id: string) => void;
  onReply?: (id: string) => void;
  isBusinessOwner?: boolean;
  className?: string;
}
export default function ReviewCard({
  review,
  onMarkHelpful,
  onReply,
  isBusinessOwner = false,
  className = ''
}: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const handleMarkHelpful = () => {
    if (onMarkHelpful) {
      onMarkHelpful(review.id);
    }
  };
  const handleReply = () => {
    if (onReply) {
      onReply(review.id);
    }
  };
  return <div className={`border-b border-gray-200 py-6 last:border-0 ${className}`}>
      <div className="flex items-start">
        <div className="mr-4">
          {review.authorImage ? <img src={review.authorImage} alt={review.authorName} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {review.authorName.charAt(0)}
              </span>
            </div>}
        </div>
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{review.authorName}</h4>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {Array.from({
                  length: 5
                }).map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {formatDate(review.date)}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 text-gray-700 whitespace-pre-line">
            {review.content}
          </div>
          {review.images && review.images.length > 0 && <div className="mt-3 flex flex-wrap gap-2">
              {review.images.map((image, index) => <img key={index} src={image} alt={`Review image ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />)}
            </div>}
          <div className="mt-4 flex items-center gap-4">
            {onMarkHelpful && <button onClick={handleMarkHelpful} className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                <ThumbsUpIcon className="w-4 h-4 mr-1" />
                <span>
                  Helpful {review.helpful ? `(${review.helpful})` : ''}
                </span>
              </button>}
            {isBusinessOwner && onReply && <button onClick={handleReply} className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                <MessageSquareIcon className="w-4 h-4 mr-1" />
                <span>Reply</span>
              </button>}
          </div>
          {review.response && <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <div className="flex items-center">
                <span className="font-medium text-gray-900">
                  {review.response.authorName}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-500">
                  {formatDate(review.response.date)}
                </span>
              </div>
              <div className="mt-2 text-gray-700">
                {review.response.content}
              </div>
            </div>}
        </div>
      </div>
    </div>;
}
