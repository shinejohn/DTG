import React, { useEffect } from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Home } from '../pages-components/Home';
import { setupGlobalErrorHandlers } from '../utils/errorHandling';
export default function HomePage() {
  useEffect(() => {
    const cleanup = setupGlobalErrorHandlers();
    return cleanup;
  }, []);
  return <Home />;
}
