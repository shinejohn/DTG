import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  prevLabel?: string;
  nextLabel?: string;
}
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  size = 'md',
  className = '',
  prevLabel = 'Previous',
  nextLabel = 'Next'
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    // Always show first and last page
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;
    // Calculate the start and end of the middle range
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    // Determine if we need to show ellipses
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    // Calculate the final range of page numbers to display
    if (!shouldShowLeftDots && shouldShowRightDots) {
      // Show more pages at the beginning
      const leftRange = Array.from({
        length: rightSiblingIndex
      }, (_, i) => i + 1);
      return [...leftRange, 'ellipsis', totalPages];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      // Show more pages at the end
      const rightRange = Array.from({
        length: totalPages - leftSiblingIndex + 1
      }, (_, i) => leftSiblingIndex + i);
      return [1, 'ellipsis', ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      // Show dots on both sides
      const middleRange = Array.from({
        length: rightSiblingIndex - leftSiblingIndex + 1
      }, (_, i) => leftSiblingIndex + i);
      return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
    }
    // Show all pages without dots
    return Array.from({
      length: totalPages
    }, (_, i) => i + 1);
  };
  const pageNumbers = getPageNumbers();
  // Size classes
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  };
  const buttonSizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  return <nav className={`flex items-center justify-center ${className}`} aria-label="Pagination">
      {/* Previous button */}
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={`
          relative inline-flex items-center ${buttonSizeClasses[size]} rounded-md
          ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}
          mr-2
        `} aria-label="Previous page">
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">{prevLabel}</span>
      </button>
      {/* Page numbers */}
      <div className="flex items-center">
        {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === 'ellipsis') {
          return <span key={`ellipsis-${index}`} className="relative inline-flex items-center justify-center mx-1">
                <MoreHorizontalIcon className="w-5 h-5 text-gray-400" />
              </span>;
        }
        const isActive = pageNumber === currentPage;
        return <button key={pageNumber} onClick={() => onPageChange(pageNumber as number)} className={`
                relative inline-flex items-center justify-center mx-1
                ${sizeClasses[size]} rounded-md
                ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}
              `} aria-current={isActive ? 'page' : undefined} aria-label={`Page ${pageNumber}`}>
              {pageNumber}
            </button>;
      })}
      </div>
      {/* Next button */}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`
          relative inline-flex items-center ${buttonSizeClasses[size]} rounded-md
          ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}
          ml-2
        `} aria-label="Next page">
        <span className="hidden sm:inline">{nextLabel}</span>
        <ChevronRightIcon className="w-4 h-4 ml-1" />
      </button>
    </nav>;
}
// Simple pagination with just prev/next buttons
export function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
  size = 'md',
  className = '',
  prevLabel = 'Previous',
  nextLabel = 'Next'
}: Omit<PaginationProps, 'siblingCount' | 'showFirstLast'>) {
  // Size classes
  const buttonSizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  return <nav className={`flex items-center justify-between ${className}`} aria-label="Pagination">
      <div>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={`
            relative inline-flex items-center ${buttonSizeClasses[size]} rounded-md
            ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}
          `} aria-label="Previous page">
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          {prevLabel}
        </button>
      </div>
      <div className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </div>
      <div>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`
            relative inline-flex items-center ${buttonSizeClasses[size]} rounded-md
            ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}
          `} aria-label="Next page">
          {nextLabel}
          <ChevronRightIcon className="w-4 h-4 ml-1" />
        </button>
      </div>
    </nav>;
}
