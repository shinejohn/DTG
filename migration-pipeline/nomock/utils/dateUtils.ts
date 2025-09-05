// Simple date formatter without dependencies
export function formatDate(date: Date | string, format: string = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  // Handle invalid dates
  if (isNaN(d.getTime())) return 'Invalid date';
  switch (format) {
    case 'short':
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    case 'long':
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case 'relative':
      return getRelativeTimeString(d);
    default:
      return d.toLocaleDateString();
  }
}
// Get relative time (e.g., "2 days ago")
function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  // For older dates, return the formatted date
  return formatDate(date, 'short');
}