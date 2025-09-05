import { useEffect, RefObject } from 'react';
type Event = MouseEvent | TouchEvent;
/**
 * Hook for detecting clicks outside of a specified element
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: (event: Event) => void, excludeRefs: RefObject<HTMLElement>[] = []) {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      const target = event.target as Node;
      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(target)) {
        return;
      }
      // Do nothing if clicking any of the excluded elements
      for (const excludeRef of excludeRefs) {
        if (excludeRef.current && excludeRef.current.contains(target)) {
          return;
        }
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, excludeRefs]);
}