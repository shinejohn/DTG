import React from 'react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
export interface AchievementCardProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    icon?: string;
    iconColor?: string;
    points: number;
    progress?: number;
    maxProgress?: number;
    isCompleted?: boolean;
    completedDate?: string;
    category?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    isNew?: boolean;
    isExclusive?: boolean;
  };
  onClick?: (id: string) => void;
  variant?: 'default' | 'compact';
  className?: string;
}
export function AchievementCard({
  achievement,
  onClick,
  variant = 'default',
  className = ''
}: AchievementCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(achievement.id);
    }
  };
  // Calculate progress percentage
  const progressPercentage = achievement.progress && achievement.maxProgress ? Math.min(100, Math.round(achievement.progress / achievement.maxProgress * 100)) : achievement.isCompleted ? 100 : 0;
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  // Get difficulty color
  const getDifficultyColor = (difficulty?: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  if (variant === 'compact') {
    return <Card variant="bordered" padding="small" isHoverable={!!onClick} className={`${className}`} onClick={handleClick}>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${achievement.isCompleted ? 'bg-blue-100' : 'bg-gray-100'}`} style={{
          backgroundColor: achievement.isCompleted ? achievement.iconColor || '#dbeafe' : undefined
        }}>
            {achievement.icon ? <img src={achievement.icon} alt={achievement.title} className="w-6 h-6" /> : <div className={`text-lg font-bold ${achievement.isCompleted ? 'text-blue-600' : 'text-gray-400'}`} style={{
            color: achievement.isCompleted ? achievement.iconColor : undefined
          }}>
                {achievement.title.charAt(0)}
              </div>}
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-sm text-gray-900">
              {achievement.title}
            </h3>
            <div className="flex items-center text-xs text-gray-500">
              <span>{achievement.points} points</span>
              {achievement.isCompleted && <>
                  <span className="mx-1">•</span>
                  <span className="text-green-600">Completed</span>
                </>}
            </div>
          </div>
        </div>
      </Card>;
  }
  return <Card variant="bordered" padding="medium" isHoverable={!!onClick} className={`${className}`} onClick={handleClick}>
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.isCompleted ? 'bg-blue-100' : 'bg-gray-100'}`} style={{
          backgroundColor: achievement.isCompleted ? achievement.iconColor || '#dbeafe' : undefined
        }}>
            {achievement.icon ? <img src={achievement.icon} alt={achievement.title} className="w-7 h-7" /> : <div className={`text-xl font-bold ${achievement.isCompleted ? 'text-blue-600' : 'text-gray-400'}`} style={{
            color: achievement.isCompleted ? achievement.iconColor : undefined
          }}>
                {achievement.title.charAt(0)}
              </div>}
          </div>
          <div className="flex gap-1">
            {achievement.isNew && <Badge variant="primary" size="sm" rounded>
                New
              </Badge>}
            {achievement.isExclusive && <Badge variant="secondary" size="sm" rounded>
                Exclusive
              </Badge>}
            {achievement.difficulty && <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(achievement.difficulty)}`}>
                {achievement.difficulty.charAt(0).toUpperCase() + achievement.difficulty.slice(1)}
              </span>}
          </div>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">
          {achievement.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 flex-grow">
          {achievement.description}
        </p>
        <div className="mt-2">
          <div className="flex items-center justify-between text-sm mb-1">
            <div className="font-medium">{achievement.points} points</div>
            {achievement.progress !== undefined && achievement.maxProgress && <div className="text-gray-500">
                {achievement.progress}/{achievement.maxProgress}
              </div>}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`h-2 rounded-full ${achievement.isCompleted ? 'bg-green-500' : 'bg-blue-500'}`} style={{
            width: `${progressPercentage}%`
          }}></div>
          </div>
          {achievement.isCompleted && achievement.completedDate && <div className="mt-2 text-xs text-gray-500">
              Completed on {formatDate(achievement.completedDate)}
            </div>}
        </div>
      </div>
    </Card>;
}