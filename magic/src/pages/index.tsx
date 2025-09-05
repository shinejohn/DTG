import React, { useEffect } from 'react';
import { Home } from '../pages-components/Home';
import { setupGlobalErrorHandlers } from '../utils/errorHandling';
export default function HomePage() {
  useEffect(() => {
    const cleanup = setupGlobalErrorHandlers();
    return cleanup;
  }, []);
  return <Home />;
}