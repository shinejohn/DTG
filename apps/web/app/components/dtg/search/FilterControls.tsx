import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { FilterIcon, XIcon, CheckIcon, ChevronDownIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
export interface FilterOption {
  id: string;
  label: string;
  type: 'checkbox' | 'radio' | 'select' | 'range' | 'toggle';
  options?: Array<{
    value: string;
    label: string;
  }>;
  min?: number;
  max?: number;
  step?: number;
}
export interface FilterControlsProps {
  filters: FilterOption[];
  activeFilters: Record<string, any>;
  onFilterChange: (filterId: string, value: any) => void;
  onClearFilter: (filterId: string) => void;
  onClearAll: () => void;
  onApplyFilters?: () => void;
  className?: string;
  isMobile?: boolean;
  onClose?: () => void;
}
export default function FilterControls({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilter,
  onClearAll,
  onApplyFilters,
  className = '',
  isMobile = false,
  onClose
}: FilterControlsProps) {
  // Count active filters
  const activeFilterCount = Object.keys(activeFilters).filter(key => activeFilters[key] !== undefined && activeFilters[key] !== '' && (!Array.isArray(activeFilters[key]) || activeFilters[key].length > 0)).length;
  // Render filter based on type
  const renderFilter = (filter: FilterOption) => {
    const value = activeFilters[filter.id];
    switch (filter.type) {
      case 'checkbox':
        return <div className="space-y-2">
            {filter.options?.map(option => <div key={option.value} className="flex items-center">
                <input type="checkbox" id={`${filter.id}-${option.value}`} checked={Array.isArray(value) ? value.includes(option.value) : false} onChange={e => {
              const isChecked = e.target.checked;
              const currentValues = Array.isArray(value) ? [...value] : [];
              if (isChecked) {
                onFilterChange(filter.id, [...currentValues, option.value]);
              } else {
                onFilterChange(filter.id, currentValues.filter(v => v !== option.value));
              }
            }} className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <label htmlFor={`${filter.id}-${option.value}`} className="ml-2 text-sm text-gray-700">
                  {option.label}
                </label>
              </div>)}
          </div>;
      case 'radio':
        return <div className="space-y-2">
            {filter.options?.map(option => <div key={option.value} className="flex items-center">
                <input type="radio" id={`${filter.id}-${option.value}`} name={filter.id} value={option.value} checked={value === option.value} onChange={() => onFilterChange(filter.id, option.value)} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label htmlFor={`${filter.id}-${option.value}`} className="ml-2 text-sm text-gray-700">
                  {option.label}
                </label>
              </div>)}
          </div>;
      case 'select':
        return <div className="relative">
            <select id={filter.id} value={value || ''} onChange={e => onFilterChange(filter.id, e.target.value)} className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500">
              <option value="">Select {filter.label}</option>
              {filter.options?.map(option => <option key={option.value} value={option.value}>
                  {option.label}
                </option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <ChevronDownIcon className="h-4 w-4" />
            </div>
          </div>;
      case 'range':
        return <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{filter.min || 0}</span>
              <span className="text-sm text-gray-500">{filter.max || 100}</span>
            </div>
            <input type="range" id={filter.id} min={filter.min || 0} max={filter.max || 100} step={filter.step || 1} value={value || filter.min || 0} onChange={e => onFilterChange(filter.id, parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            <div className="text-center mt-1 text-sm font-medium">
              {value || filter.min || 0}
            </div>
          </div>;
      case 'toggle':
        return <button onClick={() => onFilterChange(filter.id, !value)} className={`w-full py-2 px-3 border rounded-md flex items-center justify-between ${value ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
            <span>{filter.label}</span>
            {value && <CheckIcon className="w-4 h-4" />}
          </button>;
      default:
        return null;
    }
  };
  // Render active filter badges
  const renderActiveFilterBadges = () => {
    return Object.keys(activeFilters).map(filterId => {
      const value = activeFilters[filterId];
      if (value === undefined || value === '' || Array.isArray(value) && value.length === 0) {
        return null;
      }
      const filter = filters.find(f => f.id === filterId);
      if (!filter) return null;
      // For checkbox filters (multiple values)
      if (Array.isArray(value)) {
        return value.map(val => {
          const option = filter.options?.find(o => o.value === val);
          return <Badge key={`${filterId}-${val}`} variant="primary" rounded className="flex items-center">
                {option?.label || val}
                <button onClick={() => {
              const newValues = value.filter(v => v !== val);
              onFilterChange(filterId, newValues.length ? newValues : undefined);
            }} className="ml-1 text-blue-800 hover:text-blue-900">
                  <XIcon className="w-3 h-3" />
                </button>
              </Badge>;
        });
      }
      // For toggle filters
      if (filter.type === 'toggle' && value === true) {
        return <Badge key={filterId} variant="primary" rounded className="flex items-center">
              {filter.label}
              <button onClick={() => onClearFilter(filterId)} className="ml-1 text-blue-800 hover:text-blue-900">
                <XIcon className="w-3 h-3" />
              </button>
            </Badge>;
      }
      // For select and radio filters
      if (filter.type === 'select' || filter.type === 'radio') {
        const option = filter.options?.find(o => o.value === value);
        return <Badge key={filterId} variant="primary" rounded className="flex items-center">
              {option?.label || value}
              <button onClick={() => onClearFilter(filterId)} className="ml-1 text-blue-800 hover:text-blue-900">
                <XIcon className="w-3 h-3" />
              </button>
            </Badge>;
      }
      // For range filters
      if (filter.type === 'range') {
        return <Badge key={filterId} variant="primary" rounded className="flex items-center">
              {filter.label}: {value}
              <button onClick={() => onClearFilter(filterId)} className="ml-1 text-blue-800 hover:text-blue-900">
                <XIcon className="w-3 h-3" />
              </button>
            </Badge>;
      }
      return null;
    }).filter(Boolean);
  };
  // Mobile version
  if (isMobile) {
    return <div className={`bg-white h-full flex flex-col ${className}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-medium text-lg">Filters</h3>
          {onClose && <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon className="w-5 h-5" />
            </button>}
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {activeFilterCount > 0 && <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Active Filters
                </h4>
                <button onClick={onClearAll} className="text-sm text-blue-600 hover:text-blue-800">
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {renderActiveFilterBadges()}
              </div>
            </div>}
          <div className="space-y-6">
            {filters.map(filter => <div key={filter.id} className="pb-4 border-b border-gray-200 last:border-0">
                <h4 className="font-medium mb-3">{filter.label}</h4>
                {renderFilter(filter)}
              </div>)}
          </div>
        </div>
        {onApplyFilters && <div className="p-4 border-t">
            <Button variant="primary" fullWidth onClick={onApplyFilters}>
              Apply Filters
            </Button>
          </div>}
      </div>;
  }
  // Desktop version
  return <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium flex items-center">
          <FilterIcon className="w-4 h-4 mr-2" />
          Filters
        </h3>
        {activeFilterCount > 0 && <button onClick={onClearAll} className="text-sm text-blue-600 hover:text-blue-800">
            Clear All
          </button>}
      </div>
      {activeFilterCount > 0 && <div className="p-4 border-b">
          <div className="flex flex-wrap gap-2">
            {renderActiveFilterBadges()}
          </div>
        </div>}
      <div className="p-4 space-y-6">
        {filters.map(filter => <div key={filter.id} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
            <h4 className="font-medium mb-3">{filter.label}</h4>
            {renderFilter(filter)}
          </div>)}
      </div>
      {onApplyFilters && <div className="p-4 border-t">
          <Button variant="primary" fullWidth onClick={onApplyFilters}>
            Apply Filters
          </Button>
        </div>}
    </div>;
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