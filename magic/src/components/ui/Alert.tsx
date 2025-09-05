import React, { useEffect } from 'react';
import { XIcon, AlertCircleIcon, CheckCircleIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  actions?: React.ReactNode;
}
export function Alert({
  variant = 'info',
  title,
  children,
  icon,
  onClose,
  className = '',
  actions
}: AlertProps) {
  // Variant classes
  const variantClasses = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200'
  };
  // Default icons based on variant
  const defaultIcons = {
    info: <InfoIcon className="w-5 h-5" />,
    success: <CheckCircleIcon className="w-5 h-5" />,
    warning: <AlertTriangleIcon className="w-5 h-5" />,
    error: <AlertCircleIcon className="w-5 h-5" />
  };
  // Combine classes
  const alertClasses = `
    flex rounded-md border p-4
    ${variantClasses[variant]}
    ${className}
  `.trim();
  return <div className={alertClasses} role="alert">
      {/* Icon */}
      {(icon || defaultIcons[variant]) && <div className="flex-shrink-0 mr-3">
          {icon || defaultIcons[variant]}
        </div>}
      {/* Content */}
      <div className="flex-1">
        {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
        {/* Actions */}
        {actions && <div className="mt-3">{actions}</div>}
      </div>
      {/* Close button */}
      {onClose && <div className="ml-auto pl-3">
          <button type="button" className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${variant === 'info' ? 'focus:ring-blue-500 hover:bg-blue-100' : ''}
              ${variant === 'success' ? 'focus:ring-green-500 hover:bg-green-100' : ''}
              ${variant === 'warning' ? 'focus:ring-yellow-500 hover:bg-yellow-100' : ''}
              ${variant === 'error' ? 'focus:ring-red-500 hover:bg-red-100' : ''}
            `} onClick={onClose} aria-label="Close">
            <XIcon className="w-4 h-4" />
          </button>
        </div>}
    </div>;
}
// Toast component for notifications
export interface ToastProps extends Omit<AlertProps, 'children'> {
  message: React.ReactNode;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  onClose: () => void;
}
export function Toast({
  message,
  duration = 5000,
  position = 'bottom-right',
  onClose,
  ...alertProps
}: ToastProps) {
  // Auto close after duration
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };
  return <div className={`fixed z-50 max-w-sm ${positionClasses[position]}`}>
      <Alert {...alertProps} onClose={onClose}>
        {message}
      </Alert>
    </div>;
}
// ToastContainer for managing multiple toasts
export function ToastContainer({
  toasts,
  position = 'bottom-right'
}: {
  toasts: ToastProps[];
  position?: ToastProps['position'];
}) {
  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };
  // Direction classes based on position
  const directionClasses = {
    'top-right': 'flex-col-reverse',
    'top-left': 'flex-col-reverse',
    'bottom-right': 'flex-col',
    'bottom-left': 'flex-col',
    'top-center': 'flex-col-reverse',
    'bottom-center': 'flex-col'
  };
  return <div className={`fixed z-50 ${positionClasses[position]} flex gap-3 ${directionClasses[position]}`}>
      {toasts.map(toast => <Toast key={toast.title} {...toast} position={position} />)}
    </div>;
}