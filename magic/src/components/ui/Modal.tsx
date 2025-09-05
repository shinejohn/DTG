import React, { useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // Restore scrolling when modal is closed
    };
  }, [isOpen, onClose, closeOnEsc]);
  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={handleOverlayClick} aria-modal="true" role="dialog">
      <div ref={modalRef} className={`w-full ${sizeClasses[size]} bg-white rounded-lg shadow-lg overflow-hidden`} onClick={e => e.stopPropagation()}>
        {title && <div className="flex items-center justify-between p-4 border-b">
            <div className="font-semibold">{title}</div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors" aria-label="Close">
              <XIcon className="w-5 h-5" />
            </button>
          </div>}
        <div className="p-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
          {children}
        </div>
        {footer && <div className="p-4 border-t">{footer}</div>}
      </div>
    </div>;
}