import type { Route } from './+types/route';
import React, { createContext, useContext, useReducer } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
// Define your state shape
interface AppState {
  user: {
    id: string | null;
    name: string | null;
    isAuthenticated: boolean;
  };
  ui: {
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
  };
}
// Initial state
const initialState: AppState = {
  user: {
    id: null,
    name: null,
    isAuthenticated: false
  },
  ui: {
    theme: 'light',
    sidebarOpen: false
  }
};
// Action types
type Action = {
  type: 'LOGIN_SUCCESS';
  payload: {
    id: string;
    name: string;
  };
} | {
  type: 'LOGOUT';
} | {
  type: 'TOGGLE_THEME';
} | {
  type: 'TOGGLE_SIDEBAR';
};
// Reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          isAuthenticated: true
        }
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {
          id: null,
          name: null,
          isAuthenticated: false
        }
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        ui: {
          ...state.ui,
          theme: state.ui.theme === 'light' ? 'dark' : 'light'
        }
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarOpen: !state.ui.sidebarOpen
        }
      };
    default:
      return state;
  }
}
// Create context
const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});
// Provider component
export default function AppStateProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <AppStateContext.Provider value={{
    state,
    dispatch
  }}>
      {children}
    </AppStateContext.Provider>;
}
// Custom hook to use the app state
export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    const { data: items, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching data:', error);
    }

    return json({
      items: items || []
    }, { headers });
  } catch (error) {
    console.error('Loader error:', error);
    return json({
      items: []
    }, { headers });
  }
}
export function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600">{error.status}</h1>
          <h2 className="text-xl font-semibold mt-2">{error.statusText}</h2>
          <p className="text-gray-600 mt-4">{error.data}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600 mt-4">Something went wrong</p>
        <p className="text-sm text-gray-500 mt-2">{error?.message}</p>
      </div>
    </div>
  );
}