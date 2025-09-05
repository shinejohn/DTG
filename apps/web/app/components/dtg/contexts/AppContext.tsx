import type { Route } from './+types/route';
import React, { createContext, useContext, useReducer } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
// Define the state shape
interface AppState {
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
    isAuthenticated: boolean;
  };
  ui: {
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
    notifications: {
      id: string;
      type: 'info' | 'success' | 'warning' | 'error';
      message: string;
    }[];
  };
  preferences: {
    language: string;
    currency: string;
  };
}
// Initial state
const initialState: AppState = {
  user: {
    id: null,
    name: null,
    email: null,
    isAuthenticated: false
  },
  ui: {
    theme: 'light',
    sidebarOpen: false,
    notifications: []
  },
  preferences: {
    language: 'en',
    currency: 'USD'
  }
};
// Action types
type Action = {
  type: 'LOGIN_SUCCESS';
  payload: {
    id: string;
    name: string;
    email: string;
  };
} | {
  type: 'LOGOUT';
} | {
  type: 'TOGGLE_THEME';
} | {
  type: 'TOGGLE_SIDEBAR';
} | {
  type: 'ADD_NOTIFICATION';
  payload: {
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
  };
} | {
  type: 'REMOVE_NOTIFICATION';
  payload: {
    id: string;
  };
} | {
  type: 'SET_LANGUAGE';
  payload: string;
} | {
  type: 'SET_CURRENCY';
  payload: string;
};
// Reducer function
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          isAuthenticated: true
        }
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {
          id: null,
          name: null,
          email: null,
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
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: [...state.ui.notifications, {
            id: Date.now().toString(),
            type: action.payload.type,
            message: action.payload.message
          }]
        }
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(notification => notification.id !== action.payload.id)
        }
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          language: action.payload
        }
      };
    case 'SET_CURRENCY':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          currency: action.payload
        }
      };
    default:
      return state;
  }
}
// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});
// Provider component
export default function AppProvider({
  children
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <AppContext.Provider value={{
    state,
    dispatch
  }}>
      {children}
    </AppContext.Provider>;
}
// Custom hook to use the app context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
// Action creators
export const appActions = {
  login: (userData: {
    id: string;
    name: string;
    email: string;
  }) => ({
    type: 'LOGIN_SUCCESS' as const,
    payload: userData
  }),
  logout: () => ({
    type: 'LOGOUT' as const
  }),
  toggleTheme: () => ({
    type: 'TOGGLE_THEME' as const
  }),
  toggleSidebar: () => ({
    type: 'TOGGLE_SIDEBAR' as const
  }),
  addNotification: (notification: {
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
  }) => ({
    type: 'ADD_NOTIFICATION' as const,
    payload: notification
  }),
  removeNotification: (id: string) => ({
    type: 'REMOVE_NOTIFICATION' as const,
    payload: {
      id
    }
  }),
  setLanguage: (language: string) => ({
    type: 'SET_LANGUAGE' as const,
    payload: language
  }),
  setCurrency: (currency: string) => ({
    type: 'SET_CURRENCY' as const,
    payload: currency
  })
};
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