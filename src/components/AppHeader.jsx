import React from 'react';
import { BookOpen, Home } from 'lucide-react';


/**
 * App header - Clean minimal design with rules button and home
 */
export function AppHeader({ 
  onShowRules,
  onGoHome,
  showStats = false,
  totalPoints = 0,
  roundsLogged = 0,
  userName = '',
  userInitials = ''
}) {
  return (
    <header className="flex-shrink-0 z-30 bg-white border-b border-gray-100 py-4 px-5">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {/* Rules button */}
        <button 
          onClick={onShowRules}
          className="flex items-center gap-1.5 px-3 py-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
          aria-label="Rules"
        >
          <BookOpen className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-semibold text-gray-700">Rules</span>
        </button>
        
        {/* Center - App title or user greeting */}
        <div className="flex-1 text-center">
          {showStats && userName ? (
            <>
              <h1 className="text-xl font-bold text-gray-900">{userName.split(' ')[0]}</h1>
              <p className="text-sm text-emerald-600 font-medium">Welcome Back!</p>
            </>
          ) : (
            <p className="text-sm font-bold text-gray-600 uppercase tracking-widest">Newcastle Eclectic</p>
          )}
        </div>
        
        {/* Right - Home button */}
        <button
          onClick={onGoHome}
          className="p-2 -mr-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="Go home"
        >
          <Home className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
}
