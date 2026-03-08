import React from 'react';
import { Trophy, LayoutGrid, Activity } from 'lucide-react';
import { TABS } from '../constants';

/**
 * Bottom navigation bar - Clean minimal design
 */
export function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: TABS.HOME, label: 'Leaderboard', icon: LayoutGrid },
    { id: TABS.CARD, label: 'My Card', icon: Trophy },
    { id: TABS.FEED, label: 'Feed', icon: Activity },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex justify-around max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center justify-center py-3 px-6 min-h-[60px] flex-1 transition-colors touch-target ${
                isActive 
                  ? 'text-emerald-700' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-[10px] font-semibold mt-1 ${
                isActive ? 'text-emerald-700' : 'text-gray-400'
              }`}>
                {label}
              </span>
              {/* Active indicator dot */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
