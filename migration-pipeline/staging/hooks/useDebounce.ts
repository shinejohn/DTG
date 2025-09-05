import { useState, useEffect } from 'react';
/**
 * Hook for debouncing a value change
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    // Set debouncedValue to value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // Cancel the timeout if value changes or unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}