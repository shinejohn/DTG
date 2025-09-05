export function setupGlobalErrorHandlers() {
  if (typeof window !== 'undefined') {
    const handleError = (event: ErrorEvent) => {
      event.preventDefault();
      console.error('Global error:', event.error);
    };
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      console.error('Unhandled promise rejection:', event.reason);
    };
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }
  return () => {};
}