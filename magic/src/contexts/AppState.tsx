import React, { createContext, useContext, useReducer } from 'react';
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
export function AppStateProvider({
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