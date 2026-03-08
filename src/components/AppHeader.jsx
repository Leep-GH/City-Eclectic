import React from 'react';
import { Menu, Info } from 'lucide-react';
import { MAX_ROUNDS_PER_SEASON } from '../constants';

/**
 * App header - Clean minimal design with hamburger menu and avatar
 */
export function AppHeader({ 
  onShowRules, 
  showStats = false,
  totalPoints = 0,
  roundsLogged = 0,
  userName = '',
  userInitials = ''
}) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 py-4 px-5">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {/* Menu button */}
        <button 
          onClick={onShowRules}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        
        {/* Center - User greeting (when on My Card) */}
        {showStats && userName && (
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-gray-900">{userName.split(' ')[0]}</h1>
            <p className="text-sm text-emerald-600 font-medium">Welcome Back!</p>
          </div>
        )}
        
        {/* Right - Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
          {userInitials ? (
            <span className="text-sm font-bold text-emerald-800">{userInitials}</span>
          ) : (
            <span className="text-sm font-bold text-gray-400">?</span>
          )}
        </div>
      </div>
    </header>
  );
}
