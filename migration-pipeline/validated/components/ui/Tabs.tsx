import React, { useState } from 'react';
export interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}
export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'enclosed' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  alignment?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
}
export function Tabs({
  tabs,
  defaultTab,
  onChange,
  variant = 'default',
  size = 'md',
  alignment = 'left',
  className = '',
  tabsClassName = '',
  contentClassName = ''
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };
  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  // Padding classes based on size
  const paddingClasses = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5'
  };
  // Variant classes
  const getVariantClasses = (isActive: boolean, isDisabled: boolean) => {
    if (isDisabled) {
      return 'text-gray-400 cursor-not-allowed';
    }
    switch (variant) {
      case 'pills':
        return isActive ? 'bg-blue-600 text-white rounded-md' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md';
      case 'enclosed':
        return isActive ? 'bg-white text-blue-600 border-t border-l border-r border-gray-200 rounded-t-md' : 'text-gray-600 hover:text-gray-800 border border-transparent hover:border-gray-200 rounded-t-md';
      case 'underline':
        return isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300';
      case 'default':
      default:
        return isActive ? 'text-blue-600 font-medium border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300 border-b-2 border-transparent';
    }
  };
  // Alignment classes
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    justify: 'justify-between'
  };
  // Get the active tab content
  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;
  return <div className={className}>
      {/* Tab list */}
      <div className={`
        flex ${alignmentClasses[alignment]} 
        ${variant === 'enclosed' ? 'border-b border-gray-200' : ''}
        ${variant === 'underline' ? 'border-b border-gray-200' : ''}
        ${variant === 'default' ? 'border-b border-gray-200' : ''}
        ${tabsClassName}
      `}>
        {tabs.map(tab => <button key={tab.id} onClick={() => !tab.disabled && handleTabChange(tab.id)} className={`
              ${paddingClasses[size]} 
              ${sizeClasses[size]} 
              ${getVariantClasses(tab.id === activeTab, !!tab.disabled)}
              flex items-center whitespace-nowrap
            `} disabled={tab.disabled} aria-selected={tab.id === activeTab} role="tab">
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>)}
      </div>
      {/* Tab content */}
      <div className={`py-4 ${contentClassName}`} role="tabpanel">
        {activeTabContent}
      </div>
    </div>;
}